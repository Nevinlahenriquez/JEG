// GET /api/qbo/connect?island=cw|aw&key=ADMIN_KEY  -> sends the owner to Intuit to press Allow.
import { ISLANDS, missingConfig, adminOk, makeState, authorizeUrl } from '../_lib/qbo.js';
export default function handler(req, res) {
  const miss = missingConfig();
  if (miss.length) return res.status(503).json({ ok: false, error: 'QuickBooks is not set up yet', missing: miss });
  if (!adminOk(req.query.key)) return res.status(401).json({ ok: false, error: 'Not allowed' });
  const island = String(req.query.island || '');
  if (!ISLANDS[island]) return res.status(400).json({ ok: false, error: 'island must be cw (Curaçao) or aw (Aruba)' });
  res.setHeader('Cache-Control', 'no-store');
  res.redirect(302, authorizeUrl(makeState(island)));
}
