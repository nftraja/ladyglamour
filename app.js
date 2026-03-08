/* ==============================
DRAWER SYSTEM
============================== */

const drawer = document.getElementById("drawer");
const overlay = document.getElementById("drawerOverlay");

function toggleDrawer(){

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
let marketplaceData = {};


/* ==============================
LOAD AMAZON JSON
============================== */

async function loadStore(){

try{

let res = await fetch("json/amazon.json");

storeData = await res.json();

/* default load */

renderProducts("purse");

}
catch(e){

console.log("Amazon JSON error",e);

}

}

loadStore();


/* ==============================
LOAD MARKETPLACE JSON
============================== */

async function loadMarketplace(){

try{

let res = await fetch("json/marketplaces.json");

marketplaceData = await res.json();

/* first category auto load */

let firstCat = Object.keys(marketplaceData)[0];

renderMarketplace(firstCat);

activateChip(firstCat);

}
catch(e){

console.log("Marketplace JSON error",e);

}

}

loadMarketplace();


/* ==============================
PRODUCT CARD
============================== */

function productCard(p){

return `

<div class="glass-card">

<div class="product-image"
style="background-image:url('${p.image}')">
</div>

<div class="card-title">${p.title}</div>

<div class="theme-divider-b"></div>

<div class="product-meta">

<div class="product-price">${p.price}</div>

<div class="product-discount">${p.discount}</div>

<div class="product-colors">
Colors: ${p.colors}
</div>

</div>

<div class="brand-wrap">

<a href="${p.link}"
target="_blank"
class="brand"
style="--chip-color:#ff9900;">

<span>View Deal</span>

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

if(!storeData[cat]){

grid.innerHTML="<p>No products available</p>";
return;

}

let html="";

storeData[cat].forEach(p=>{

html+=productCard(p);

});

grid.innerHTML=html;

}


/* ==============================
RENDER MARKETPLACE PRODUCTS
============================== */

function renderMarketplace(cat){

let grid = document.getElementById("marketDeals");

if(!grid) return;

if(!marketplaceData[cat]){

grid.innerHTML="<p>No products available</p>";
return;

}

let html="";

marketplaceData[cat].forEach(p=>{

html+=productCard(p);

});

grid.innerHTML=html;

}


/* ==============================
AMAZON DROPDOWN
============================== */

const amazonDropdown = document.getElementById("amazonCategory");

if(amazonDropdown){

amazonDropdown.addEventListener("change",function(){

let cat = this.value;

if(!cat) return;

if(!storeData || Object.keys(storeData).length===0){
return;
}

renderProducts(cat);

scrollToDeals();

});

}


/* ==============================
MARKETPLACE CATEGORY CHIPS
============================== */

const chips = document.querySelectorAll(".cat-chip");

chips.forEach(chip=>{

chip.addEventListener("click",function(){

let cat = this.dataset.cat;

if(!cat) return;

if(!marketplaceData || Object.keys(marketplaceData).length===0){
return;
}

renderMarketplace(cat);

activateChip(cat);

scrollToMarketplace();

});

});


/* ==============================
CHIP ACTIVE STATE
============================== */

function activateChip(cat){

document.querySelectorAll(".cat-chip").forEach(chip=>{

chip.classList.remove("active");

if(chip.dataset.cat === cat){

chip.classList.add("active");

}

});

}


/* ==============================
SCROLL AMAZON
============================== */

function scrollToDeals(){

let target=document.getElementById("hotDeals");

if(!target) return;

window.scrollTo({

top:target.offsetTop-80,
behavior:"smooth"

});

}


/* ==============================
SCROLL MARKETPLACE
============================== */

function scrollToMarketplace(){

let target=document.getElementById("marketDeals");

if(!target) return;

window.scrollTo({

top:target.offsetTop-80,
behavior:"smooth"

});

}


/* ==============================
SEARCH
============================== */

const searchBox=document.getElementById("searchBox");

if(searchBox){

searchBox.addEventListener("keyup",function(e){

if(e.key==="Enter"){

searchProducts();

}

});

}


function searchProducts(){

let query=searchBox.value.toLowerCase();

let results=[];

Object.values(storeData).forEach(cat=>{

cat.forEach(p=>{

if(p.title.toLowerCase().includes(query)){

results.push(p);

}

});

});

renderSearch(results);

}


/* ==============================
RENDER SEARCH RESULTS
============================== */

function renderSearch(products){

let grid=document.getElementById("hotDeals");

if(!products.length){

grid.innerHTML="<p>No products found</p>";
return;

}

let html="";

products.forEach(p=>{

html+=productCard(p);

});

grid.innerHTML=html;

}