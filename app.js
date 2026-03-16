/* ==============================
DRAWER SYSTEM
============================== */

const drawer = document.getElementById("drawer");
const overlay = document.getElementById("drawerOverlay");

function toggleDrawer(){

if(!drawer || !overlay) return;

drawer.classList.toggle("active");
overlay.classList.toggle("active");

document.body.style.overflow =
drawer.classList.contains("active") ? "hidden" : "";

}

if(overlay){
overlay.addEventListener("click",toggleDrawer);
}


/* ==============================
STORE DATA
============================== */

let storeData = {};
let myntraData = {};


/* ==============================
LOAD AMAZON JSON
============================== */

async function loadStore(){

try{

let res = await fetch("json/amazon.json");

if(!res.ok) return;

storeData = await res.json();

const firstCategory = Object.keys(storeData)[0];

if(firstCategory){
renderProducts(firstCategory);
}

}
catch(e){
console.log("Amazon JSON error",e);
}

}

loadStore();


/* ==============================
PRODUCT CARD
============================== */

function productCard(p){

return `

<div class="product-card">

<img src="${p.image}"
loading="lazy"
decoding="async"
class="product-img">

<div class="product-caption">

<div class="product-discount">${p.discount}</div>

<div class="product-price">${p.price}</div>

<a href="${p.link}" target="_blank" class="view-btn">
View Deal
</a>

</div>

</div>

`;

}


/* ==============================
RENDER AMAZON PRODUCTS
============================== */

function renderProducts(cat){

let grid = document.getElementById("hotDeals");

if(!grid) return;

if(!storeData[cat]) return;

let html="";

storeData[cat].forEach(p=>{
html+=productCard(p);
});

grid.innerHTML=html;

}


/* ==============================
COLLECTION LOADER
============================== */

async function loadCollection(cat){

try{

let res = await fetch("json/" + cat + ".json");

if(!res.ok) return;

let data = await res.json();

let grid = document.getElementById("hotDeals");

if(!grid) return;

let html="";

data.products.forEach(p=>{
html+=productCard(p);
});

grid.innerHTML=html;

toggleDrawer();

}
catch(e){
console.log("Collection load error",e);
}

}


/* ==============================
BRAND DIRECTORY
============================== */

async function loadBrands(){

try{

let res = await fetch("json/brands.json");

if(!res.ok) return;

let data = await res.json();

let grid = document.getElementById("brandGrid");

if(!grid) return;

let html="";

data.brands.forEach(b=>{

html += `

<div class="brand-store-card">

<div class="brand-thumb">

<img src="https://www.google.com/s2/favicons?sz=128&domain=${b.domain}"
alt="${b.name}">

</div>

<div class="brand-info">

<div class="brand-title">${b.name}</div>

<p class="brand-desc">${b.description}</p>

<a href="${b.link}" target="_blank" class="brand-open-btn">
${b.button} →
</a>

</div>

</div>

`;

});

grid.innerHTML = html;

}
catch(e){

console.log("Brand JSON error",e);

}

}

loadBrands();