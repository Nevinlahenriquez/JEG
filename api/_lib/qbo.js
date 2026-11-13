// QuickBooks Online connection for JEG. Server only (Vercel functions).
// Everything stays OFF until the env vars below are set in JEG's own Vercel project:
//   QBO_CLIENT_ID, QBO_CLIENT_SECRET   one Intuit developer app, both islands
//   QBO_ENV                            'sandbox' (default) or 'production'
//   APP_URL                            e.g. https://jeg-demo.vercel.app (used for the redirect URI)
//   ADMIN_KEY                          16+ chars, needed to start a connection or run a sync
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY   JEG's own Supabase, tokens stored in qbo_connections
//   TOKEN_ENC_KEY                      32+ chars. Tokens are encrypted (AES-256-GCM) before they are stored.
//                                      Intuit's security requirements ask for tokens encrypted at rest.
import crypto from 'node:crypto';

export const ISLANDS = { cw: { name: 'Curaçao', currency: 'XCG' }, aw: { name: 'Aruba', currency: 'AWG' } };
const AUTH_URL = 'https://appcenter.intuit.com/connect/oauth2';
const TOKEN_URL = 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer';
const REVOKE_URL = 'https://developer.api.intuit.com/v2/oauth2/tokens/revoke';
const SCOPE = 'com.intuit.quickbooks.accounting';
export const apiBase = () => process.env.QBO_ENV === 'production'
  ? 'https://quickbooks.api.intuit.com' : 'https://sandbox-quickbooks.api.intuit.com';
export const redirectUri = () => `${(process.env.APP_URL || '').replace(/\/+$/, '')}/api/qbo/callback`;

export function missingConfig() {
  const need = ['QBO_CLIENT_ID', 'QBO_CLIENT_SECRET', 'APP_URL', 'ADMIN_KEY', 'SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY'];
  const miss = need.filter(k => !process.env[k]);
  if (process.env.ADMIN_KEY && process.env.ADMIN_KEY.length < 16) miss.push('ADMIN_KEY (16+ chars)');
  return miss;
}

export function adminOk(given) {
  const want = process.env.ADMIN_KEY || '';
  if (want.length < 16 || typeof given !== 'string') return false;
  const a = Buffer.from(given), b = Buffer.from(want);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

// state = island.nonce.hmac, so the callback can prove WE started this connection.
const sign = v => crypto.createHmac('sha256', process.env.ADMIN_KEY || '').update(v).digest('base64url');
export function makeState(island) { const v = `${island}.${crypto.randomBytes(16).toString('base64url')}`; return `${v}.${sign(v)}`; }
export function readState(state) {
  const parts = String(state || '').split('.'); if (parts.length !== 3) return null;
  const v = `${parts[0]}.${parts[1]}`, s = Buffer.from(parts[2]), w = Buffer.from(sign(v));
  if (s.length !== w.length || !crypto.timingSafeEqual(s, w)) return null;
  return ISLANDS[parts[0]] ? parts[0] : null;
}

// --- tokens encrypted at rest (AES-256-GCM). Rows saved before the key existed are still readable. ---
const encKey = () => { const k = process.env.TOKEN_ENC_KEY || ''; return k.length >= 32 ? crypto.createHash('sha256').update(k).digest() : null; };
export const encryptionOn = () => !!encKey();
function seal(plain) {
  const key = encKey(); if (!key) return plain;
  const iv = crypto.randomBytes(12), c = crypto.createCipheriv('aes-256-gcm', key, iv);
  const body = Buffer.concat([c.update(String(plain), 'utf8'), c.final()]);
  return `enc:v1:${iv.toString('base64url')}.${c.getAuthTag().toString('base64url')}.${body.toString('base64url')}`;
}
function open(stored) {
  if (!String(stored).startsWith('enc:v1:')) return stored; // older plaintext row
  const key = encKey(); if (!key) throw new Error('TOKEN_ENC_KEY is missing, the stored QuickBooks key cannot be read');
  const [iv, tag, body] = String(stored).slice(7).split('.').map(x => Buffer.from(x, 'base64url'));
  const d = crypto.createDecipheriv('aes-256-gcm', key, iv); d.setAuthTag(tag);
  return Buffer.concat([d.update(body), d.final()]).toString('utf8');
}

export const authorizeUrl = state => `${AUTH_URL}?${new URLSearchParams({
  client_id: process.env.QBO_CLIENT_ID, response_type: 'code', scope: SCOPE, redirect_uri: redirectUri(), state })}`;

async function tokenCall(body) {
  const basic = Buffer.from(`${process.env.QBO_CLIENT_ID}:${process.env.QBO_CLIENT_SECRET}`).toString('base64');
  const r = await fetch(TOKEN_URL, { method: 'POST', headers: { Authorization: `Basic ${basic}`,
    'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' }, body: new URLSearchParams(body) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(`Intuit token error ${r.status}: ${j.error || 'unknown'}`);
  return j; // access_token, refresh_token, expires_in, x_refresh_token_expires_in
}
export const exchangeCode = code => tokenCall({ grant_type: 'authorization_code', code, redirect_uri: redirectUri() });
export const refreshTokens = rt => tokenCall({ grant_type: 'refresh_token', refresh_token: rt });
// Tell Intuit to cancel a token (used on disconnect), so the key stops working on their side too.
export async function revokeToken(token) {
  const basic = Buffer.from(`${process.env.QBO_CLIENT_ID}:${process.env.QBO_CLIENT_SECRET}`).toString('base64');
  const r = await fetch(REVOKE_URL, { method: 'POST', headers: { Authorization: `Basic ${basic}`,
    'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ token }) });
  if (!r.ok && r.status !== 400) throw new Error(`Intuit revoke error ${r.status}`); // 400 = already invalid
}

// --- token storage in JEG's Supabase (service key, table locked by RLS) ---
const sb = (path, init = {}) => fetch(`${process.env.SUPABASE_URL}/rest/v1/${path}`, { ...init, headers: {
  apikey: process.env.SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
  'Content-Type': 'application/json', ...(init.headers || {}) } });

export async function saveConnection(island, realmId, t) {
  const now = Date.now();
  const row = { island, realm_id: realmId, access_token: seal(t.access_token), refresh_token: seal(t.refresh_token),
    access_expires_at: new Date(now + t.expires_in * 1000).toISOString(),
    refresh_expires_at: new Date(now + (t.x_refresh_token_expires_in || 8640000) * 1000).toISOString(),
    updated_at: new Date(now).toISOString() };
  const r = await sb('qbo_connections?on_conflict=island', { method: 'POST',
    headers: { Prefer: 'resolution=merge-duplicates,return=minimal' }, body: JSON.stringify(row) });
  if (!r.ok) throw new Error(`Could not save the connection (${r.status}): ${await r.text()}`);
}
export async function listConnections() {
  const r = await sb('qbo_connections?select=island,realm_id,refresh_expires_at,updated_at,last_sync_at');
  if (!r.ok) throw new Error(`Could not read connections (${r.status})`);
  return r.json();
}
async function getConnection(island) {
  const r = await sb(`qbo_connections?island=eq.${island}&select=*`);
  if (!r.ok) throw new Error(`Could not read connection (${r.status})`);
  const c = (await r.json())[0] || null;
  return c && { ...c, access_token: open(c.access_token), refresh_token: open(c.refresh_token) };
}
export async function deleteConnection(island) {
  const r = await sb(`qbo_connections?island=eq.${island}`, { method: 'DELETE', headers: { Prefer: 'return=minimal' } });
  if (!r.ok) throw new Error(`Could not remove the connection (${r.status})`);
}
export { getConnection };

// A valid access token for an island, refreshed (and the new refresh token stored) when needed.
export async function accessFor(island) {
  const c = await getConnection(island);
  if (!c) return null;
  // An old plaintext row is stored encrypted again at its next refresh (within the hour).
  const fresh = new Date(c.access_expires_at).getTime() - Date.now() > 120000;
  if (fresh) return c;
  const t = await refreshTokens(c.refresh_token);
  await saveConnection(island, c.realm_id, t);
  return { ...c, access_token: t.access_token };
}

// Reads only. Waits and retries when Intuit says "too many requests" (429) or has a brief outage.
// Intuit's intuit_tid is logged on errors so support can trace a call.
export async function qboQuery(conn, sql) {
  const url = `${apiBase()}/v3/company/${conn.realm_id}/query?${new URLSearchParams({ query: sql, minorversion: '75' })}`;
  for (let attempt = 0; ; attempt++) {
    const r = await fetch(url, { headers: { Authorization: `Bearer ${conn.access_token}`, Accept: 'application/json' } });
    const tid = r.headers.get('intuit_tid') || '';
    if ((r.status === 429 || r.status >= 500) && attempt < 3) {
      const wait = Number(r.headers.get('retry-after')) * 1000 || 1000 * 2 ** attempt;
      console.warn('qbo retry', r.status, 'intuit_tid', tid); await new Promise(ok => setTimeout(ok, Math.min(wait, 8000))); continue;
    }
    const j = await r.json().catch(() => ({}));
    if (!r.ok) { console.error('qbo query failed', r.status, 'intuit_tid', tid);
      throw new Error(`QuickBooks query failed (${r.status}): ${j?.Fault?.Error?.[0]?.Message || 'unknown'}${tid ? ` [intuit_tid ${tid}]` : ''}`); }
    return j.QueryResponse || {};
  }
}
export async function markSynced(island) {
  await sb(`qbo_connections?island=eq.${island}`, { method: 'PATCH', headers: { Prefer: 'return=minimal' },
    body: JSON.stringify({ last_sync_at: new Date().toISOString() }) });
}
