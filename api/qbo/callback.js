// GET /api/qbo/callback  <- Intuit sends the owner back here after Allow.
import { ISLANDS, readState, exchangeCode, saveConnection } from '../_lib/qbo.js';
const page = (title, body) => `<!doctype html><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1"><title>${title}</title><body style="font:16px system-ui;max-width:520px;margin:15vh auto;padding:0 20px;color:#123d1d"><h1 style="font-size:22px">${title}</h1><p>${body}</p><p><a href="/dashboard/" style="color:#2f7a42">Back to the dashboard</a></p>`;
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store'); res.setHeader('Content-Type', 'text/html; charset=utf-8');
  const island = readState(req.query.state);
  if (!island) return res.status(400).send(page('Connection not started here', 'Please start again from the dashboard.'));
  if (req.query.error) return res.status(400).send(page('QuickBooks was not connected', 'Allow was not pressed. Nothing changed.'));
  if (!req.query.code || !req.query.realmId) return res.status(400).send(page('Something is missing', 'QuickBooks did not send the company details. Please try again.'));
  try {
    await saveConnection(island, String(req.query.realmId), await exchangeCode(String(req.query.code)));
    return res.status(200).send(page(`${ISLANDS[island].name} is connected`, 'QuickBooks is now linked to the dashboard. You can close this page.'));
  } catch (e) {
    console.error('qbo callback', e);
    return res.status(500).send(page('Connection failed', 'QuickBooks answered, but the link could not be saved. Nothing was changed in your books.'));
  }
}
