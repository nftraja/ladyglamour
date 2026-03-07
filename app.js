/* ==============================
LadyGlamour Core Script
============================== */


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
JSON PRODUCT STORE
============================== */

let storeData = {};

async function loadStore(){

try{

let res = await fetch("json/products.json");
storeData = await res.json();

loadSharedProduct();
loadSharedCollection();

}
catch(e){

console.log("JSON load error",e);

}

}

loadStore();



/* ==============================
RENDER PRODUCT CARDS
============================== */

function renderProducts(cat){

let grid = document.getElementById("hotDeals");

if(!storeData[cat]){

grid.innerHTML="<p>No products available</p>";
return;

}

let html="";

storeData[cat].forEach(p=>{

html+=`

<div class="glass-card">

<div class="card-title">${p.title}</div>

<div class="theme-divider-b"></div>

<p class="card-text">
Price: ${p.price || "Check on marketplace"}
</p>

<div class="brand-wrap">

<a href="${p.link}" target="_blank"
class="brand"
style="--chip-color:#ff9900;">

<span>View Deal</span>

</a>

</div>

</div>

`;

});

grid.innerHTML=html;

}



/* ==============================
CATEGORY CLICK SYSTEM
============================== */

document.querySelectorAll("[data-cat]").forEach(btn=>{

btn.addEventListener("click",function(e){

e.preventDefault();

let cat=this.dataset.cat;

renderProducts(cat);

scrollToDeals();

});

});



/* ==============================
SCROLL TO DEALS
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
AI SEARCH (Local JSON)
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

scrollToDeals();

}



/* ==============================
RENDER SEARCH RESULTS
============================== */

function renderSearch(products){

let grid=document.getElementById("hotDeals");

let html="";

products.forEach(p=>{

html+=`

<div class="glass-card">

<div class="card-title">${p.title}</div>

<div class="theme-divider-b"></div>

<p class="card-text">
Price: ${p.price || "Check on marketplace"}
</p>

<div class="brand-wrap">

<a href="${p.link}" target="_blank"
class="brand"
style="--chip-color:#ff9900;">

<span>View Deal</span>

</a>

</div>

</div>

`;

});

grid.innerHTML=html;

}



/* ==============================
EXPLORE SYSTEM
============================== */

document.querySelectorAll("[data-nav]").forEach(btn=>{

btn.addEventListener("click",function(e){

e.preventDefault();

let type=this.dataset.nav;

loadExplore(type);

scrollToExplore();

});

});



/* ==============================
LOAD COLLECTIONS / CATEGORIES
============================== */

async function loadExplore(type){

try{

let res = await fetch("json/"+type+".json");

let data = await res.json();

renderExplore(data[type]);

}
catch(e){

console.log("Explore JSON error",e);

}

}



/* ==============================
RENDER EXPLORE CARDS
============================== */

function renderExplore(items){

let grid=document.getElementById("exploreDeals");

let html="";

items.forEach(item=>{

html+=`

<div class="glass-card">

<div class="card-title">${item.icon} ${item.title}</div>

<div class="theme-divider-b"></div>

<p class="card-text">${item.subtitle}</p>

</div>

`;

});

grid.innerHTML=html;

}



/* ==============================
SCROLL TO EXPLORE
============================== */

function scrollToExplore(){

let target=document.getElementById("exploreDeals");

if(!target) return;

window.scrollTo({

top:target.offsetTop-80,
behavior:"smooth"

});

}



/* ==============================
DIRECT PRODUCT SHARE LINK
============================== */

function loadSharedProduct(){

let params=new URLSearchParams(window.location.search);

let pid=params.get("p");

if(!pid) return;

let found=null;
let category=null;

Object.keys(storeData).forEach(cat=>{

storeData[cat].forEach(p=>{

if(p.id===pid){

found=p;
category=cat;

}

});

});

if(found){

renderSearch([found]);
scrollToDeals();

/* v2 conversion layout → related products */

renderRelatedProducts(category,found.id);

}

}



/* ==============================
RELATED PRODUCTS (v2 CONVERSION)
============================== */

function renderRelatedProducts(cat,excludeId){

let grid=document.getElementById("hotDeals");

if(!storeData[cat]) return;

let html="";

html+=`

<div style="width:100%;margin-top:20px">

<div class="card-title">More From This Collection</div>

<div class="theme-divider-b"></div>

</div>

`;

storeData[cat].forEach(p=>{

if(p.id===excludeId) return;

html+=`

<div class="glass-card">

<div class="card-title">${p.title}</div>

<div class="theme-divider-b"></div>

<p class="card-text">
Price: ${p.price}
</p>

<div class="brand-wrap">

<a href="?p=${p.id}"
class="brand"
style="--chip-color:#2962ff;">

<span>View</span>

</a>

</div>

</div>

`;

});

grid.innerHTML+=html;

}



/* ==============================
COLLECTION SHARE LINK SYSTEM
============================== */

function loadSharedCollection(){

let params=new URLSearchParams(window.location.search);

let cat=params.get("cat");

if(!cat) return;

if(storeData[cat]){

renderProducts(cat);

scrollToDeals();

}

}