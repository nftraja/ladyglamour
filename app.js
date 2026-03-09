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

/* DEFAULT AMAZON CATEGORY */

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

/* DEFAULT CATEGORY */

renderMarketplace("fashion");

/* dropdown label update */

const marketSelected = document.getElementById("marketSelected");

if(marketSelected){
marketSelected.innerHTML =
'Fashion <span class="dropdown-arrow">⌄</span>';
}

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
AMAZON CUSTOM DROPDOWN
============================== */

const amazonSelected = document.getElementById("amazonSelected");
const amazonDropdown = document.getElementById("amazonDropdown");

if(amazonSelected){

amazonSelected.addEventListener("click",function(){

amazonDropdown.classList.toggle("active");

});

}

document.querySelectorAll("#amazonDropdown .dropdown-item")
.forEach(item=>{

item.addEventListener("click",function(){

let cat = this.dataset.cat;

renderProducts(cat);

amazonSelected.innerHTML =
this.textContent +
' <span class="dropdown-arrow">⌄</span>';

amazonDropdown.classList.remove("active");

scrollToDeals();

});

});


/* ==============================
MARKETPLACE CUSTOM DROPDOWN
============================== */

const marketSelected = document.getElementById("marketSelected");
const marketDropdown = document.getElementById("marketDropdown");

if(marketSelected){

marketSelected.addEventListener("click",function(){

marketDropdown.classList.toggle("active");

});

}

document.querySelectorAll("#marketDropdown .dropdown-item")
.forEach(item=>{

item.addEventListener("click",function(){

let cat = this.dataset.cat;

renderMarketplace(cat);

marketSelected.innerHTML =
this.textContent +
' <span class="dropdown-arrow">⌄</span>';

marketDropdown.classList.remove("active");

scrollToMarketplace();

});

});


/* ==============================
CLOSE DROPDOWN OUTSIDE CLICK
============================== */

document.addEventListener("click",function(e){

if(!e.target.closest(".custom-dropdown")){

if(amazonDropdown) amazonDropdown.classList.remove("active");
if(marketDropdown) marketDropdown.classList.remove("active");

}

});


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