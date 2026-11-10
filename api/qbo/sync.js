// GET /api/qbo/sync?island=cw|aw  (header x-admin-key: ADMIN_KEY)
// READ ONLY for now: pulls items with stock, customers and open invoices. Writes nothing to QuickBooks.
import { ISLANDS, missingConfig, adminOk, accessFor, qboQuery, markSynced } from '../_lib/qbo.js';
async function all(conn, entity, where = '') {
  const out = [];
  for (let start = 1; ; start += 1000) {
    const page = (await qboQuery(conn, `select * from ${entity} ${where} startposition ${start} maxresults 1000`))[entity] || [];
    out.push(...page); if (page.length < 1000) return out;
  }
}
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const miss = missingConfig();
  if (miss.length) return res.status(503).json({ ok: false, error: 'QuickBooks is not set up yet', missing: miss });
  if (!adminOk(req.headers['x-admin-key'])) return res.status(401).json({ ok: false, error: 'Not allowed' });
  const island = String(req.query.island || '');
  if (!ISLANDS[island]) return res.status(400).json({ ok: false, error: 'island must be cw or aw' });
  try {
    const conn = await accessFor(island);
    if (!conn) return res.status(409).json({ ok: false, error: `${ISLANDS[island].name} is not connected yet` });
    const [items, customers, invoices] = await Promise.all([
      all(conn, 'Item', "where Active = true"), all(conn, 'Customer', "where Active = true"), all(conn, 'Invoice', "where Balance > '0'")]);
    await markSynced(island);
    res.status(200).json({ ok: true, island, counts: { items: items.length, customers: customers.length, openInvoices: invoices.length },
      items: items.map(i => ({ id: i.Id, name: i.Name, sku: i.Sku || null, type: i.Type, qtyOnHand: i.QtyOnHand ?? null, price: i.UnitPrice ?? null })),
      customers: customers.map(c => ({ id: c.Id, name: c.DisplayName, email: c.PrimaryEmailAddr?.Address || null, balance: c.Balance ?? 0 })),
      openInvoices: invoices.map(v => ({ id: v.Id, number: v.DocNumber, customer: v.CustomerRef?.name, total: v.TotalAmt, balance: v.Balance, due: v.DueDate })) });
  } catch (e) { console.error('qbo sync', e); res.status(502).json({ ok: false, error: e.message }); }
}
