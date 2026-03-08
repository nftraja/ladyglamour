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
LOAD JSON
============================== */

let storeData = {};

async function loadStore(){

try{

let res = await fetch("json/amazon.json");

storeData = await res.json();

}
catch(e){

console.log("JSON load error",e);

}

}

loadStore();


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
RENDER PRODUCTS
============================== */

function renderProducts(cat){

let grid = document.getElementById("hotDeals");

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
CATEGORY CLICK
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
SCROLL
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

function renderSearch(products){

let grid=document.getElementById("hotDeals");

let html="";

products.forEach(p=>{

html+=productCard(p);

});

grid.innerHTML=html;

}