// GET /api/qbo/status  -> which islands are connected (no tokens, ever).
import { ISLANDS, missingConfig, listConnections, encryptionOn } from '../_lib/qbo.js';
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const miss = missingConfig();
  if (miss.length) return res.status(200).json({ ok: true, configured: false, missing: miss, islands: {} });
  try {
    const rows = await listConnections(); const islands = {};
    for (const k of Object.keys(ISLANDS)) {
      const r = rows.find(x => x.island === k);
      islands[k] = { name: ISLANDS[k].name, connected: !!r, lastSync: r?.last_sync_at || null, renewBy: r?.refresh_expires_at || null };
    }
    res.status(200).json({ ok: true, configured: true, tokensEncrypted: encryptionOn(), islands });
  } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
}
