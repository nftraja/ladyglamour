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

let res = await fetch("products.json");

storeData = await res.json();

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

<img src="${p.image}" style="width:100%;border-radius:12px">

<div class="card-title">${p.title}</div>

<div class="theme-divider-b"></div>

<p class="card-text">
Preview image. View original product on Amazon marketplace.
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

function renderSearch(products){

let grid=document.getElementById("hotDeals");

let html="";

products.forEach(p=>{

html+=`

<div class="glass-card">

<img src="${p.image}" style="width:100%;border-radius:12px">

<div class="card-title">${p.title}</div>

<div class="theme-divider-b"></div>

<p class="card-text">
Preview image. View original product on Amazon marketplace.
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