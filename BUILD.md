# JEG Trading demo: build brief

A **demo** for Giandric Tromp (JEG Trading Aruba) and his business partner, so they
can see what their custom system will look like before signing proposal
OYV-2026-020 ($1,500/mo x 3, plus about $100/mo running cost after go-live).

**Rules**
- It is a DEMO. Static HTML/JS only, sample data only. No Supabase, no database,
  no logins, no real QuickBooks or email calls. Every page says "Demo".
- Every page and tab is OPEN: no login screen, every tab clickable and filled
  with believable data, so he can click through everything himself.
- Fully custom to JEG: their logo, their greens, their products (sun care,
  chewing gum and candy, everyday essentials, kiosk snacks), their customers
  (pharmacies, supermarkets, hotel shops, mini markets across Aruba), Aruba and
  Curaçao as two companies. Currency "Afl." for Aruba, "Cg" (XCG) for Curaçao.
- Do not send anything to Giandric. Nevin sends the link himself.
- Copy rules: no em dashes, plain words, no "agency".

## About JEG (from the discovery call)
- Wholesale distributor in Aruba: 645 items, 9 suppliers, about 60 wholesale
  customers, invoices in AWG and USD.
- Kiosk opening in Aruba: 2 cash registers, tourist price and local price.
- Curaçao is a separate company, own warehouse, own books, XCG, no stock moves
  between the islands.
- Orders arrive today by email, WhatsApp, phone and merchandiser purchase orders.
- Must run on QuickBooks Online (moving from QuickBooks Premier Retail 2015).
- Top priority: a portal connected to QuickBooks showing live inventory, so
  customers AND merchandisers (on a tablet at the customer) can see stock and order.
- Contact: +297 586 8181, jegtradingaruba@gmail.com

## Confirmed by Giandric in writing (22 Oct 2026)
- 645 active items from 9 suppliers (the "about 900" was the earlier estimate).
- Aruba: one wholesale warehouse plus a retail kiosk (2 cash registers).
  Curaçao: one wholesale warehouse, wholesale only. Separate entity, no stock moves.
- Currencies: Aruba AWG and USD. Curaçao XCG only.
- Sells cases and single units, but registers stock in UNITS: a case and a unit
  each have their own UPC. Expiry/batch tracking not asked for.
- About 60 customers, all on the SAME wholesale price (no price lists). Kiosk
  adds a local retail price and a tourist retail price.
- Orders today: email, WhatsApp, phone, and merchandiser purchase orders.
- Documents: quotes, sales orders, delivery notes, invoices, purchase orders,
  and sales receipts at the kiosk. Only the SIGNED INVOICE is emailed.
- Stations: 2 to 3 invoicing stations at the warehouse, 2 kiosk registers.
- QuickBooks Online is a must (today: QuickBooks Premier Retail 2015).
- Users and roles are defined in QuickBooks and the POS.
- Priority: the portal connected to QuickBooks, also used by merchandisers at
  the customer to show live inventory.

## Brand
- Dark green `#1d5b2c` (from the logo), deeper sidebar green `#123d1d`,
  mid green `#2f7a42`, `#4f9a62`, sage `#a8c3a8`, sage soft `#eef4ee`.
- Cream page background `#f7f5ef`, accent lime-yellow `#e9f27a` for highlights.
- Montserrat (headings) + Inter (body). Logo: `logo.jpg` (white background,
  sits on a white rounded card on dark surfaces).

## The three parts (all on one Vercel link)

### 1. `/` Website
Simple public site: hero "Your shelves, always stocked.", stats (645 active items,
9 suppliers, 60 wholesale customers, 2 islands), product categories, "Order online" in
3 steps, Aruba and Curaçao, contact. "Customer login" opens `/portal/`.

### 2. `/portal/` Wholesale portal (employees open it WITH the client)
- Header: "Showing to: [customer dropdown]" + "Merchandiser: Ricardo · tablet".
- Customer card: type, area, price list tier (A/B/C), last order, year to date,
  open balance.
- "Ordered before by this customer": one tap adds a case.
- Catalog: search (name, brand, UPC), category chips, "in stock only",
  product cards with drawn product image, stock badge (in stock / low / out),
  case price + unit price for THAT customer's tier, suggested shelf price,
  promo badges, case stepper, "Add cases".
- Order panel: lines, total, delivery route choice, customer PO, "Place order"
  shows a confirmation explaining it lands on the warehouse screen and goes to
  QuickBooks on delivery.

### 3. `/dashboard/` Business dashboard (styled like Aruba Heat's dashboard)
Sidebar sections OVERVIEW / SALES / OPERATIONS / BOOKS, Aruba/Curaçao switch.
Header chips: "Saved to cloud", "QuickBooks data · 2 min ago", "Sync now",
"Check vs QuickBooks", "Live from cloud", button "View distribution points".
Tabs (all open):
- **Dashboard**: Overview/Products/Customers tabs, period dropdown (7/30/90
  days), Filters bar, big dark green hero card (total sales, delta, split by
  QuickBooks invoices / portal / kiosk, weekly bars with striped "so far"),
  3 icon KPI cards (orders, average order, sales points buying x/52),
  week-by-week table, sales-by-category donut, minimap, "needs your
  attention", best sellers, top customers.
- **Warehouse orders**: kanban New / Picking / Packed / Ready / Delivered,
  each card shows source (Portal, Merchandiser, WhatsApp, Phone).
- **Distribution map**: Leaflet + OpenStreetMap tiles (NO CARTO, it needs a
  key now). ~52 Aruba points (pharmacies, supermarkets, hotel shops, mini
  markets) + warehouse + kiosk, Curaçao points, type filters, today's delivery
  route, popups with last order and balance, side list.
- **Inventory**: stock per item, cases/units, UPC, stock bar, wholesale and
  local/tourist price, "Reorder" drafts a PO.
- **Customers**: accounts with type, area, how they order, merchandiser,
  last order, 30-day revenue, open balance.
- **Kiosk POS**: two registers, local/tourist price toggle, tap-to-add, card/cash.
- **QuickBooks**: flow diagram system <-> QuickBooks Online (Aruba AWG and
  Curaçao XCG as separate books), what syncs, sync log, "Sync now".

## Next improvements (for the build session)
1. Polish the dashboard to match the Aruba Heat screenshot pixel-close.
2. Add an **Invoices** tab (wholesale invoices, status, signed delivery note,
   "sent to QuickBooks") and a **Purchase orders** tab (9 suppliers, containers).
3. Portal: a customer-facing mode (customer logs in themselves) beside the
   merchandiser mode, and an order history screen.
4. Mobile/tablet check at 390 and 820 px; no sideways scroll, inputs 16px.

## Deploy
Static files, no build step. Vercel project with framework "Other",
output = repo root. Libraries from cdnjs only (Leaflet 1.9.4, Chart.js 4.4.1).
All pages `noindex`.
