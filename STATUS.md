# JEG Trading: status

Last updated: 10 Nov 2026

## Where it stands
- Client: Giandric Tromp, JEG Trading (Curaçao + Aruba). Signed OYV-2026-020, $1,500/mo x 3. First invoice paid.
- The demo (website, customer portal, dashboard, kiosk) is live at https://jeg-demo.vercel.app with sample data only.
- 10 Nov: the QuickBooks Online connection is built (branch `claude/qbo-connect`). It is OFF until the keys below exist.

## How the QuickBooks link works
- One Intuit developer app serves both islands. Giandric presses Connect once per QuickBooks company (Curaçao first, then Aruba).
- `/api/qbo/connect?island=cw|aw&key=ADMIN_KEY` sends him to Intuit; `/api/qbo/callback` stores that company's key in JEG's own Supabase (`db/schema.sql`).
- `/api/qbo/status` shows which islands are connected. `/api/qbo/sync?island=cw` (header `x-admin-key`) READS items with stock, customers and open invoices. Nothing is written to QuickBooks yet.
- Server code lives in `api/` and is never copied into the public `dist/` folder.

## Needed before it can switch on
1. JEG's own Vercel and Supabase accounts (his card, Nevin invited). Run `db/schema.sql` in his Supabase.
2. A free Intuit developer account on his email, with one app. Redirect URI: `<APP_URL>/api/qbo/callback`.
3. Env vars in his Vercel: QBO_CLIENT_ID, QBO_CLIENT_SECRET, QBO_ENV, APP_URL, ADMIN_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY. Never sent by chat or email.
4. Giandric invites connect@optimizeyourvibe.com as accountant on the Curaçao QuickBooks company.

## Next
- Show live Curaçao stock, customers and open invoices in the dashboard and portal.
- Then Aruba (new QuickBooks company, AWG), then the kiosk before the first ship day.
- Writing invoices and kiosk sales back into QuickBooks comes after the read side is checked against his books.
