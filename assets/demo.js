/* JEG Trading demo: shared sample data for the website, portal, dashboard and kiosk POS.
   Everything here is invented sample data. Nothing connects to QuickBooks, email or a database. */
(function(){
const W=window.JEG={};
let s=17;const rnd=()=>(s=(s*9301+49297)%233280)/233280;W.reseed=n=>{s=n};W.rnd=rnd;

W.OWNER={first:'Giandric',full:'Giandric Tromp',initials:'GT',company:'JEG Trading'};
W.TODAY=new Date(2026,9,22);
W.TODAY_LABEL='Thursday 22 October 2026';
W.ISLANDS={aw:{name:'Aruba',company:'JEG Trading Aruba',cur:'Afl.',code:'AWG',center:[12.515,-69.975],zoom:12,reps:['Ricardo','Shanella','Jurgen']},
           cw:{name:'Curaçao',company:'JEG Trading Curaçao',cur:'Cg',code:'XCG',center:[12.17,-68.98],zoom:11,reps:['Dayenne','Ruthsel']}};
W.fmt=(n,cur='Afl.',d=2)=>cur+' '+Number(n).toLocaleString('en-US',{minimumFractionDigits:d,maximumFractionDigits:d});
W.TYPES={pharmacy:['Pharmacy','Pharmacies','#1d5b2c'],super:['Supermarket','Supermarkets','#1f5f9e'],hotel:['Hotel shop','Hotel & resort shops','#b4630a'],mini:['Mini market','Mini markets & snacks','#6b4fa3'],jeg:['JEG','JEG warehouse & kiosk','#b3261e']};

// Area anchors sit inland so every point lands on the island, not in the sea.
const A={'Oranjestad':[12.5245,-70.0265],'Noord':[12.5835,-70.0330],'Palm Beach':[12.5735,-70.0425],'Eagle Beach':[12.5560,-70.0495],'Druif':[12.5395,-70.0425],'Malmok':[12.5930,-70.0445],'Santa Cruz':[12.5075,-69.9850],'Paradera':[12.5340,-70.0095],'San Nicolas':[12.4400,-69.9100],'Savaneta':[12.4560,-69.9470],'Tanki Leendert':[12.5585,-70.0200],'Pos Chiquito':[12.4750,-69.9570],'Bubali':[12.5530,-70.0360],'Piedra Plat':[12.5240,-69.9950],'Seroe Blanco':[12.5260,-70.0170],
 'Punda':[12.1100,-68.9270],'Otrobanda':[12.1130,-68.9400],'Saliña':[12.1120,-68.9130],'Brievengat':[12.1430,-68.9050],'Santa Rosa':[12.1270,-68.8660],'Mahaai':[12.1240,-68.9220],'Jan Thiel':[12.0910,-68.8720],'Westpunt':[12.3520,-69.1420],'Barber':[12.3000,-69.0880],'Mambo Beach':[12.0945,-68.8975],'Pietermaai':[12.1090,-68.9200],'Piscadera':[12.1300,-68.9650],'Santa Maria':[12.1310,-68.9600]};
const AW=[
 ['Botica Sol','pharmacy','Oranjestad'],['Botica Kunuku','pharmacy','Noord'],['Botica Brisa','pharmacy','Santa Cruz'],['Botica Cas Grandi','pharmacy','Paradera'],['Botica Esperansa','pharmacy','San Nicolas'],['Botica Palma','pharmacy','Palm Beach'],['Botica Mondi','pharmacy','Savaneta'],['Botica Coral','pharmacy','Eagle Beach'],['Botica Bon Bida','pharmacy','Oranjestad'],['Botica Shimaruku','pharmacy','Tanki Leendert'],['Botica Dushi','pharmacy','Bubali'],['Botica Watapana','pharmacy','Piedra Plat'],['Botica Kibrahacha','pharmacy','Pos Chiquito'],['Botica Solo di Pueblo','pharmacy','San Nicolas'],['Botica Wayaca','pharmacy','Seroe Blanco'],['Botica Hooiberg','pharmacy','Santa Cruz'],['Botica Rancho','pharmacy','Oranjestad'],['Botica Cura Bon','pharmacy','Noord'],['Botica Bientu','pharmacy','Druif'],
 ['Supermercado Bon Prijs','super','Oranjestad'],['Kunuku Fresh Market','super','Noord'],['Isla Supermarket','super','Santa Cruz'],['Super Esperansa','super','San Nicolas'],['Mercado Palma','super','Palm Beach'],['Bon Bini Supermarket','super','Bubali'],['Super Trupial','super','Paradera'],['Coral Food Market','super','Eagle Beach'],['Super Brisa','super','Savaneta'],['Mercado Central Noord','super','Noord'],['Super Hooiberg','super','Piedra Plat'],
 ['Palm Beach Resort Shop','hotel','Palm Beach'],['Eagle Beach Gift Shop','hotel','Eagle Beach'],['Druif Bay Boutique','hotel','Druif'],['Malmok Beach Shop','hotel','Malmok'],['Seaside Resort Market','hotel','Palm Beach'],['Sunset Tower Gift Shop','hotel','Eagle Beach'],['Ocean Breeze Hotel Shop','hotel','Palm Beach'],['Turquoise Bay Shop','hotel','Savaneta'],['Coral Reef Resort Market','hotel','Druif'],['Arashi Sundries','hotel','Malmok'],
 ['Toko Shimaruku','mini','Tanki Leendert'],['Snack Bon Gusto','mini','Oranjestad'],['Mini Market Trupial','mini','Santa Cruz'],['Toko Kunuku','mini','Paradera'],['Snack Pica Pica','mini','San Nicolas'],['Mini Market Brisa','mini','Noord'],['Toko Cas di Cunucu','mini','Piedra Plat'],['Snack Dushi Bocado','mini','Bubali'],['Mini Market Solo','mini','Savaneta'],['Toko Bon Bini','mini','Seroe Blanco'],['Snack Watapana','mini','Pos Chiquito'],['Mini Market Cayena','mini','Noord']];
// Curaçao pharmacies: same pharmacy names as Aruba, as on the call.
const CW=[
 ['Botica Sol','pharmacy','Punda'],['Botica Kunuku','pharmacy','Otrobanda'],['Botica Brisa','pharmacy','Saliña'],['Botica Cas Grandi','pharmacy','Brievengat'],['Botica Esperansa','pharmacy','Santa Rosa'],['Botica Palma','pharmacy','Mahaai'],['Botica Mondi','pharmacy','Jan Thiel'],['Botica Coral','pharmacy','Westpunt'],['Botica Bon Bida','pharmacy','Barber'],['Botica Shimaruku','pharmacy','Pietermaai'],['Botica Dushi','pharmacy','Santa Maria'],['Botica Watapana','pharmacy','Piscadera'],['Botica Kibrahacha','pharmacy','Punda'],['Botica Solo di Pueblo','pharmacy','Saliña'],['Botica Wayaca','pharmacy','Brievengat'],['Botica Hooiberg','pharmacy','Otrobanda'],['Botica Rancho','pharmacy','Santa Rosa'],['Botica Cura Bon','pharmacy','Jan Thiel'],['Botica Bientu','pharmacy','Mahaai'],
 ['Supermercado Saliña','super','Saliña'],['Mercado Santa Maria','super','Santa Maria'],['Super Brievengat','super','Brievengat'],['Fresh Market Jan Thiel','super','Jan Thiel'],['Super Banda Bou','super','Barber'],['Mercado Otrobanda','super','Otrobanda'],
 ['Mambo Beach Shop','hotel','Mambo Beach'],['Jan Thiel Resort Shop','hotel','Jan Thiel'],['Westpunt Beach Shop','hotel','Westpunt'],['Pietermaai Hotel Boutique','hotel','Pietermaai'],['Piscadera Resort Market','hotel','Piscadera'],
 ['Toko Punda','mini','Punda'],['Snack Kas Kora','mini','Santa Rosa'],['Mini Market Barber','mini','Barber'],['Toko Santa Rosa','mini','Santa Rosa'],['Snack Brievengat','mini','Brievengat'],['Mini Market Santa Maria','mini','Santa Maria']];
const VIA=['Portal','Merchandiser','Portal','WhatsApp','Phone','Email','Merchandiser'];
const CONTACTS=['Maria','José','Anouk','Ramon','Shirley','Edwin','Natasha','Kevin','Luisa','Marlon','Gisela','Ryan','Yolanda','Frank'];
function mk(list,island){W.reseed(island==='aw'?41:73);return list.map((r,i)=>{const [name,t,area]=r,c=A[area],big=t==='super'?1:t==='hotel'?.7:t==='pharmacy'?.5:.32;
 const rev30=Math.round((1800+rnd()*6800)*big*(island==='aw'?1:.8));const active=rnd()>.16;
 return {id:island+'-'+(i+1),name,t,area,island,lat:c[0]+(rnd()-.5)*.006,lng:c[1]+(rnd()-.5)*.006,
  tier:t==='super'?'A':t==='hotel'?(rnd()>.5?'A':'B'):t==='pharmacy'?(rnd()>.4?'B':'A'):'C',
  rev30:active?rev30:0,ytd:Math.round(rev30*(8.5+rnd()*2)),last:active?1+Math.floor(rnd()*26):34+Math.floor(rnd()*30),
  via:VIA[Math.floor(rnd()*VIA.length)],rep:W.ISLANDS[island].reps[i%W.ISLANDS[island].reps.length],
  bal:rnd()>.72?Math.round(300+rnd()*3400):0,overdue:0,active,contact:CONTACTS[i%CONTACTS.length],
  terms:t==='mini'?'Cash on delivery':'Net 30'}})}
W.CUSTOMERS=[...mk(AW,'aw'),...mk(CW,'cw')];
W.CUSTOMERS.forEach((c,i)=>{if(c.bal&&i%3===0)c.overdue=Math.round(c.bal*.6)});
W.SITES=[{id:'wh-aw',t:'jeg',name:'JEG Warehouse Aruba',area:'Oranjestad',lat:12.5290,lng:-70.0115,island:'aw',active:1},
 {id:'kiosk',t:'jeg',name:'JEG Kiosk · Cruise port',area:'Oranjestad',lat:12.5190,lng:-70.0375,island:'aw',active:1},
 {id:'wh-cw',t:'jeg',name:'JEG Warehouse Curaçao',area:'Saliña',lat:12.1180,lng:-68.9050,island:'cw',active:1}];
W.TIER={A:.94,B:.97,C:1};

W.SUPPLIERS=[
 {name:'SunGuard Labs',from:'Miami, USA',cats:'Sun care',lead:'14 days',terms:'Net 45',ship:'40ft container, monthly'},
 {name:'Caribe Care',from:'Miami, USA',cats:'Sun care, essentials',lead:'12 days',terms:'Net 30',ship:'Shared container'},
 {name:'Fresh Co.',from:'Rotterdam, NL',cats:'Chewing gum',lead:'28 days',terms:'Prepay 30%',ship:'20ft container'},
 {name:'Candy Island',from:'Cartagena, CO',cats:'Candy',lead:'10 days',terms:'Net 30',ship:'Pallets by sea'},
 {name:'Clean Isle',from:'Panama City, PA',cats:'Wipes, hygiene',lead:'9 days',terms:'Net 30',ship:'Pallets by sea'},
 {name:'Caribe Health',from:'Miami, USA',cats:'Pharmacy OTC',lead:'12 days',terms:'Net 30',ship:'Shared container'},
 {name:'Aqua Aruba',from:'Aruba, local',cats:'Water',lead:'2 days',terms:'Net 15',ship:'Local truck'},
 {name:'Volt Beverages',from:'Miami, USA',cats:'Drinks',lead:'14 days',terms:'Net 30',ship:'Shared container'},
 {name:'Isla Snacks',from:'Cartagena, CO',cats:'Snacks',lead:'10 days',terms:'Net 30',ship:'Pallets by sea'}];

// [name, brand, cat, shape, color, perCase, unitWholesale, srp, stockCases, minCases, supplier, kioskUSD]
const P=[
['Sunscreen Lotion SPF 50, 8 oz','SunGuard','sun','bottle','#f2a623',24,14.50,29.00,38,12,'SunGuard Labs',18],
['Sunscreen Spray SPF 30, 6 oz','SunGuard','sun','spray','#f07c2a',24,16.75,33.00,4,10,'SunGuard Labs',20],
['Kids Sunscreen Stick SPF 50','SunGuard Kids','sun','stick','#3aa0d8',24,9.80,19.00,3,8,'SunGuard Labs',12],
['Sport Sunscreen SPF 70','SunGuard Sport','sun','bottle','#e0473a',24,17.20,34.00,14,8,'SunGuard Labs',21],
['After-Sun Aloe Gel, 16 oz','Caribe Care','sun','tube','#4f9a62',12,11.90,23.00,22,8,'Caribe Care',14],
['Tanning Oil SPF 15','Caribe Care','sun','bottle','#b4630a',24,12.40,25.00,0,6,'Caribe Care',15],
['Lip Balm SPF 15','Caribe Care','sun','stick','#d6488b',48,2.10,5.00,30,10,'Caribe Care',4],
['Face Sunscreen SPF 50 Mineral','SunGuard','sun','tube','#f2d06b',12,19.50,38.00,9,6,'SunGuard Labs',24],
['Mint Chewing Gum, 12 pieces','Fresh Co.','gum','gum','#2fa59a',96,1.10,2.75,61,20,'Fresh Co.',2],
['Fruit Gum 5-pack','Fresh Co.','gum','gum','#e8505b',48,2.40,5.50,9,12,'Fresh Co.',4],
['Sugar-Free Gum Bottle','Fresh Co.','gum','jar','#4a7fd4',24,5.60,11.00,18,8,'Fresh Co.',7],
['Bubble Gum Tub','Candy Island','gum','jar','#f07fb0',12,8.90,17.00,12,6,'Candy Island',10],
['Hard Candy Bag','Candy Island','gum','bag','#f2a623',24,3.20,6.50,26,10,'Candy Island',4],
['Sour Gummies Bag','Candy Island','gum','bag','#7cc242',24,2.90,6.00,0,10,'Candy Island',4],
['Insect Repellent Spray','Caribe Care','ess','spray','#5c7a3a',24,7.40,15.00,5,8,'Caribe Care',9],
['Hand Sanitizer Gel, 2 oz','Clean Isle','ess','tube','#5fb8d6',48,1.90,4.00,40,10,'Clean Isle',3],
['Wet Wipes Travel Pack','Clean Isle','ess','bag','#8fc6e8',48,1.60,3.50,33,10,'Clean Isle',3],
['Pain Relief Tablets, 24 ct','Caribe Health','ess','box','#c43c3c',24,4.80,9.50,15,6,'Caribe Health',7],
['Antacid Chewables, 30 ct','Caribe Health','ess','box','#7a5bc4',24,4.20,8.50,11,6,'Caribe Health',6],
['Bottled Water 500 ml','Aqua Aruba','snk','water','#3aa0d8',24,0.55,1.50,90,30,'Aqua Aruba',2],
['Energy Drink 250 ml','Volt','snk','can','#1d1d1d',24,1.70,3.75,28,10,'Volt Beverages',4],
['Plantain Chips','Isla Snacks','snk','bag','#e8b923',36,1.30,3.00,20,10,'Isla Snacks',3],
['Peanut Bar','Isla Snacks','snk','box','#b4630a',48,0.90,2.25,0,8,'Isla Snacks',2],
['Coconut Water 330 ml','Aqua Aruba','snk','can','#6ab04c',24,1.45,3.25,17,8,'Aqua Aruba',4]];
W.CATS={sun:'Sun care',gum:'Gum & candy',ess:'Everyday essentials',snk:'Snacks & drinks'};
W.PRODUCTS=P.map((p,i)=>({i,name:p[0],brand:p[1],cat:p[2],shape:p[3],color:p[4],perCase:p[5],unit:p[6],srp:p[7],stock:p[8],min:p[9],supplier:p[10],usd:p[11],
 upc:'0 '+(41100+i*731)+' '+(10000+i*2371)+' '+(i%10),sku:'JEG-'+String(1001+i*7)}));
W.PROMO=new Set([0,8,19]);
// Curaçao carries a smaller stock; same rule the dashboard uses.
W.stockFor=(p,isl)=>isl==='cw'?Math.max(0,Math.round(p.stock*.55+(p.i%3))*(p.stock?1:0)):p.stock;
W.minFor=(p,isl)=>isl==='cw'?Math.max(4,Math.round(p.min*.6)):p.min;
W.USD=1.79; // Afl. per US dollar
W.stockState=p=>p.stock===0?['out','Out of stock']:p.stock<p.min?['low','Low · '+p.stock+' cases']:['in','In stock · '+p.stock+' cases'];

W.shape=function(t,c){const m={
bottle:`<rect x="38" y="8" width="24" height="14" rx="3" fill="#333"/><rect x="28" y="20" width="44" height="78" rx="14" fill="${c}"/><rect x="34" y="44" width="32" height="30" rx="4" fill="#fff" opacity=".9"/><text x="50" y="63" text-anchor="middle" font-size="11" font-weight="800" fill="${c}" font-family="Montserrat,sans-serif">SPF</text>`,
spray:`<rect x="40" y="4" width="20" height="16" rx="3" fill="#333"/><rect x="46" y="0" width="14" height="6" fill="#555"/><rect x="30" y="18" width="40" height="82" rx="10" fill="${c}"/><rect x="36" y="42" width="28" height="34" rx="4" fill="#fff" opacity=".9"/>`,
stick:`<rect x="40" y="10" width="20" height="22" rx="4" fill="#333"/><rect x="38" y="30" width="24" height="70" rx="6" fill="${c}"/><rect x="42" y="50" width="16" height="30" rx="3" fill="#fff" opacity=".85"/>`,
tube:`<path d="M30 14h40l-4 76H34z" fill="${c}"/><rect x="40" y="88" width="20" height="12" rx="2" fill="#333"/><rect x="38" y="34" width="24" height="30" rx="3" fill="#fff" opacity=".9"/>`,
gum:`<rect x="16" y="34" width="68" height="36" rx="8" fill="${c}"/><rect x="16" y="34" width="68" height="10" rx="5" fill="#fff" opacity=".35"/><text x="50" y="62" text-anchor="middle" font-size="12" font-weight="800" fill="#fff" font-family="Montserrat,sans-serif">GUM</text>`,
jar:`<rect x="30" y="16" width="40" height="14" rx="4" fill="#333"/><rect x="26" y="28" width="48" height="70" rx="12" fill="${c}"/><circle cx="50" cy="62" r="14" fill="#fff" opacity=".85"/>`,
bag:`<path d="M24 20h52l6 78H18z" fill="${c}"/><path d="M24 20h52v8H24z" fill="#000" opacity=".15"/><ellipse cx="50" cy="60" rx="18" ry="14" fill="#fff" opacity=".85"/>`,
box:`<rect x="22" y="26" width="56" height="64" rx="6" fill="${c}"/><rect x="22" y="26" width="56" height="14" rx="6" fill="#fff" opacity=".3"/><rect x="32" y="52" width="36" height="20" rx="3" fill="#fff" opacity=".9"/>`,
water:`<rect x="42" y="4" width="16" height="10" rx="2" fill="#2a6fb0"/><path d="M40 14h20l6 14v66a6 6 0 0 1-6 6H40a6 6 0 0 1-6-6V28z" fill="${c}" opacity=".55"/><rect x="34" y="48" width="32" height="20" fill="#fff" opacity=".9"/>`,
can:`<rect x="32" y="12" width="36" height="86" rx="8" fill="${c}"/><rect x="34" y="12" width="32" height="6" rx="3" fill="#ccc"/><rect x="36" y="46" width="28" height="24" rx="3" fill="#fff" opacity=".85"/>`}[t];
return `<svg viewBox="0 0 100 104" aria-hidden="true">${m}</svg>`};

// Demo bar shown on every page, links the four parts together.
W.demoBar=function(cur){const L=[['/','Website'],['/portal/','Wholesale portal'],['/dashboard/','Business dashboard'],['/pos/','Kiosk POS']];
 const d=document.createElement('div');d.className='jeg-demobar';
 d.innerHTML=`<span class="jd-tag">DEMO</span><span class="jd-txt">Preview built for ${W.OWNER.full}, JEG Trading · sample data · the final system is tailor-made to your business</span><nav>${L.map(([h,n])=>`<a href="${h}"${h===cur?' aria-current="page"':''}>${n}</a>`).join('')}</nav>`;
 document.body.prepend(d)};
const css=document.createElement('style');css.textContent=`.jeg-demobar{background:#0e2c16;color:#cfe0cf;font:500 12.5px Inter,system-ui,sans-serif;display:flex;align-items:center;gap:12px;padding:7px max(14px,env(safe-area-inset-left,0px));flex-wrap:wrap;position:relative;z-index:60}
.jeg-demobar .jd-tag{background:#e9f27a;color:#123d1d;font-weight:800;font-size:11px;letter-spacing:.08em;border-radius:6px;padding:2px 7px}
.jeg-demobar nav{display:flex;gap:4px;margin-left:auto;overflow-x:auto;max-width:100%;scrollbar-width:none}
.jeg-demobar nav::-webkit-scrollbar{display:none}
.jeg-demobar a{color:#cfe0cf;text-decoration:none;padding:4px 10px;border-radius:999px;white-space:nowrap;font-weight:600}
.jeg-demobar a:hover{background:#1b4d27;color:#fff}.jeg-demobar a[aria-current]{background:#2f7a42;color:#fff}
@media (max-width:820px){.jeg-demobar .jd-txt{display:none}.jeg-demobar nav{margin-left:0;flex:1}}`;
document.head.appendChild(css);

/* Preview guard: a deterrent against casual copying, not a lock. */
(function(){const ok=t=>t&&t.closest&&t.closest('input,textarea,select,[contenteditable]');
 ['contextmenu','copy','cut','dragstart','selectstart'].forEach(ev=>document.addEventListener(ev,e=>{if(!ok(e.target))e.preventDefault()},true));
 document.addEventListener('keydown',e=>{const k=(e.key||'').toLowerCase(),m=e.ctrlKey||e.metaKey;
  if(k==='f12'||(m&&e.shiftKey&&['i','j','c'].includes(k))||(m&&e.altKey&&['i','j','c','u'].includes(k))||(m&&['u','s','p'].includes(k))||(m&&k==='a'&&!ok(e.target))||(m&&k==='c'&&!ok(e.target))){e.preventDefault();e.stopPropagation()}},true);
 const g=document.createElement('style');g.textContent=`body{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}input,textarea,select,[contenteditable]{-webkit-user-select:text;user-select:text}img,svg{-webkit-user-drag:none;user-drag:none}
.jeg-wm{position:fixed;inset:0;pointer-events:none;z-index:2147483000;background-image:url("data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="420" height="260"><text x="20" y="150" transform="rotate(-24 210 130)" font-family="Inter,Arial" font-size="15" font-weight="600" fill="#123d1d" fill-opacity=".045">PREVIEW · JEG Trading · Optimize Your Vibe</text></svg>')}")}
@media print{body>*{display:none!important}body:after{content:"This preview cannot be printed. Ask Optimize Your Vibe for a copy.";display:block;padding:40px;font:600 16px Inter,Arial}}`;
 document.head.appendChild(g);
 const add=()=>{if(!document.querySelector('.jeg-wm')){const w=document.createElement('div');w.className='jeg-wm';w.setAttribute('aria-hidden','true');document.body.appendChild(w)}};
 document.body?add():document.addEventListener('DOMContentLoaded',add);
})();
})();
