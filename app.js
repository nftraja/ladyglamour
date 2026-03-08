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

let res = await fetch("json/amazon.json");
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
SMART IMAGE SYSTEM
============================== */

function getImage(cat){

if(cat==="purse")
return "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=60";

if(cat==="wallet")
return "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=800&q=60";

return "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=60";

}



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

let img = getImage(cat);

html+=`

<div class="glass-card">

<div class="product-image"
style="background-image:url('${img}')"></div>

<div class="card-title">${p.title}</div>

<div class="theme-divider-b"></div>

<div class="product-meta">

<div class="product-price">${p.price}</div>

<div class="product-discount">${p.discount}</div>

<div class="product-colors">
Colors Available: ${p.colors}
</div>

</div>

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

<div class="product-image"
style="background-image:url('https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=60')"></div>

<div class="card-title">${p.title}</div>

<div class="theme-divider-b"></div>

<div class="product-meta">

<div class="product-price">${p.price}</div>

<div class="product-discount">${p.discount}</div>

<div class="product-colors">
Colors Available: ${p.colors}
</div>

</div>

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
DIRECT PRODUCT SHARE LINK
============================== */

function loadSharedProduct(){

let params=new URLSearchParams(window.location.search);

let pid=params.get("p");

if(!pid) return;

let found=null;

Object.values(storeData).forEach(cat=>{

cat.forEach(p=>{

if(p.id===pid){

found=p;

}

});

});

if(found){

renderSearch([found]);
scrollToDeals();

}

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