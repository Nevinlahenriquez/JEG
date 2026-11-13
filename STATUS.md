# JEG Trading: status

Last updated: 13 Nov 2026

## Where it stands
- Client: Giandric Tromp, JEG Trading (Curaçao + Aruba). Signed OYV-2026-020, $1,500/mo x 3. First invoice paid.
- The demo (website, customer portal, dashboard, kiosk) is live at https://jeg-demo.vercel.app with sample data only.
- 10 Nov: the QuickBooks Online connection is built (branch `claude/qbo-connect`). It is OFF until the keys below exist.

## How the QuickBooks link works
- One Intuit developer app serves both islands. Giandric presses Connect once per QuickBooks company (Curaçao first, then Aruba).
- `/api/qbo/connect?island=cw|aw&key=ADMIN_KEY` sends him to Intuit; `/api/qbo/callback` stores that company's key in JEG's own Supabase (`db/schema.sql`).
- `/api/qbo/status` shows which islands are connected. `/api/qbo/sync?island=cw` (header `x-admin-key`) READS items with stock, customers and open invoices. Nothing is written to QuickBooks yet.
- Server code lives in `api/` and is never copied into the public `dist/` folder.

## Intuit rules (Developer Terms update, in force 12 Dec 2026), checked 13 Nov
- No credential sharing: we connect only through JEG's own Intuit app with OAuth. We never ask for a QuickBooks login, password, API key or token. OK.
- No AI training: nothing in this build sends QuickBooks data to any AI model, and nothing trains one. Written into the privacy policy and terms. If the "SI" assistant is ever wired to live QuickBooks data, it may only answer questions (no training, no fine tuning) and must be listed as a processor in the privacy policy.
- Data handling (if Intuit asks, ToS 8 and 9): fields read = Item (id, name, SKU, type, qty on hand, price), Customer (id, name, email, balance), Invoice (id, number, customer, total, balance, due). Read only, nothing written to QuickBooks, QuickBooks records are not copied into a database. Third parties: Vercel (hosting), Supabase (encrypted key store), Optimize Your Vibe (builds it under contract).
- 13 Nov fixes: tokens encrypted at rest (AES-256-GCM, env TOKEN_ENC_KEY, old rows still readable), POST /api/qbo/disconnect cancels the key at Intuit and deletes it, retry with backoff on 429 / 5xx, intuit_tid logged on errors.
- App listing URLs for the Intuit app settings: privacy `<APP_URL>/legal/privacy.html`, EULA `<APP_URL>/legal/terms.html`, disconnect `<APP_URL>/legal/disconnected.html`, launch `<APP_URL>/dashboard/`.

## Needed before it can switch on
1. JEG's own Vercel and Supabase accounts (his card, Nevin invited). Run `db/schema.sql` in his Supabase.
2. A free Intuit developer account on his email, with one app. Redirect URI: `<APP_URL>/api/qbo/callback`.
3. Env vars in his Vercel: QBO_CLIENT_ID, QBO_CLIENT_SECRET, QBO_ENV, APP_URL, ADMIN_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, TOKEN_ENC_KEY (32+ random characters). Never sent by chat or email.
4. Giandric invites connect@optimizeyourvibe.com as accountant on the Curaçao QuickBooks company.

## Next
- Show live Curaçao stock, customers and open invoices in the dashboard and portal.
- Then Aruba (new QuickBooks company, AWG), then the kiosk before the first ship day.
- Writing invoices and kiosk sales back into QuickBooks comes after the read side is checked against his books.
