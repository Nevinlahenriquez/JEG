// POST /api/qbo/disconnect?island=cw|aw   (header x-admin-key)
// Cancels the QuickBooks key at Intuit and deletes it from JEG's database. Nothing in the books changes.
import { ISLANDS, missingConfig, adminOk, getConnection, revokeToken, deleteConnection } from '../_lib/qbo.js';
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Use POST' });
  const miss = missingConfig();
  if (miss.length) return res.status(503).json({ ok: false, error: 'QuickBooks is not set up yet', missing: miss });
  if (!adminOk(req.headers['x-admin-key'])) return res.status(401).json({ ok: false, error: 'Not allowed' });
  const island = String(req.query.island || '');
  if (!ISLANDS[island]) return res.status(400).json({ ok: false, error: 'island must be cw (Curaçao) or aw (Aruba)' });
  try {
    const c = await getConnection(island);
    if (!c) return res.status(200).json({ ok: true, island, disconnected: true, note: 'Was not connected' });
    await revokeToken(c.refresh_token);
    await deleteConnection(island);
    res.status(200).json({ ok: true, island, disconnected: true });
  } catch (e) { console.error('qbo disconnect', e); res.status(500).json({ ok: false, error: e.message }); }
}
