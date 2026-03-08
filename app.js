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

}
catch(e){

console.log("JSON load error",e);

}

}

loadStore();


/* ==============================
IMAGE ENGINE (Stable CDN)
============================== */

function getImage(keyword,index){

let seed = keyword.replace(/\s+/g,"") + index;

return `https://picsum.photos/seed/${seed}/900/506`;

}


/* ==============================
PRODUCT CARD
============================== */

function productCard(p,img){

return `

<div class="glass-card">

<div class="product-image"
style="background-image:url('${img}')"
role="img"
aria-label="${p.title}">
</div>

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

storeData[cat].forEach((p,index)=>{

let img = getImage(p.keyword,index);

html+=productCard(p,img);

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

});

});