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
STORE DATA
============================== */

let amazonData = {};
let meeshoData = {};
let glowroadData = {};
let collectionsData = {};


/* ==============================
LOAD JSON DATA
============================== */

async function loadStore(){

try{

const amazon = await fetch("json/amazon.json");
amazonData = await amazon.json();

}catch(e){
console.log("Amazon JSON error",e);
}

try{

const meesho = await fetch("json/meesho.json");
meeshoData = await meesho.json();

}catch(e){
console.log("Meesho JSON error",e);
}

try{

const glow = await fetch("json/glowroad.json");
glowroadData = await glow.json();

}catch(e){
console.log("Glowroad JSON error",e);
}

try{

const col = await fetch("json/collections.json");
collectionsData = await col.json();

}catch(e){
console.log("Collections JSON error",e);
}

initButtons();

}

loadStore();



/* ==============================
IMAGE ENGINE
============================== */

function getImage(keyword,index){

let k = keyword.replace(/\s+/g,"-");

return `https://source.unsplash.com/900x506/?${k}&sig=${index}`;

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

<div class="product-discount">${p.discount || ""}</div>

<div class="product-colors">
Colors: ${p.colors || "-"}
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

function renderProducts(data,cat,gridId){

let grid = document.getElementById(gridId);

if(!data[cat]){

grid.innerHTML="<p>No products available</p>";
return;

}

let html="";

data[cat].forEach((p,index)=>{

let img = getImage(p.keyword || "fashion product",index);

html += productCard(p,img);

});

grid.innerHTML = html;

}



/* ==============================
CATEGORY BUTTONS
============================== */

function initButtons(){

/* AMAZON */

document.querySelectorAll("[data-cat]").forEach(btn=>{

btn.addEventListener("click",function(e){

e.preventDefault();

let cat = this.dataset.cat;

renderProducts(amazonData,cat,"hotDeals");

scrollTo("hotDeals");

});

});


/* LIVE DEALS */

document.querySelectorAll("[data-deal]").forEach(btn=>{

btn.addEventListener("click",function(e){

e.preventDefault();

let cat = this.dataset.deal;

renderProducts(amazonData,cat,"liveDeals");

scrollTo("liveDeals");

});

});


/* COLLECTIONS */

document.querySelectorAll("[data-nav]").forEach(btn=>{

btn.addEventListener("click",function(e){

e.preventDefault();

let type = this.dataset.nav;

renderCollections(type);

scrollTo("exploreDeals");

});

});

}



/* ==============================
RENDER COLLECTIONS
============================== */

function renderCollections(type){

let grid = document.getElementById("exploreDeals");

if(!collectionsData[type]){

grid.innerHTML="<p>No collections</p>";
return;

}

let html="";

collectionsData[type].forEach(item=>{

html += `
<div class="glass-card">

<div class="card-title">
${item.icon} ${item.title}
</div>

<div class="theme-divider-b"></div>

<p class="card-text">
${item.subtitle}
</p>

</div>
`;

});

grid.innerHTML = html;

}



/* ==============================
AI SEARCH
============================== */

const searchBox = document.getElementById("searchBox");

if(searchBox){

searchBox.addEventListener("keyup",function(e){

if(e.key === "Enter"){
searchProducts();
}

});

}


function searchProducts(){

let query = searchBox.value.toLowerCase();

let results = [];

Object.values(amazonData).forEach(cat=>{

cat.forEach(p=>{

if(p.title.toLowerCase().includes(query)){

results.push(p);

}

});

});

renderSearch(results);

scrollTo("hotDeals");

}



/* ==============================
RENDER SEARCH
============================== */

function renderSearch(products){

let grid = document.getElementById("hotDeals");

let html="";

products.forEach((p,index)=>{

let img = getImage(p.keyword || "product",index);

html += productCard(p,img);

});

grid.innerHTML = html;

}



/* ==============================
SCROLL
============================== */

function scrollTo(id){

let el = document.getElementById(id);

if(!el) return;

window.scrollTo({

top:el.offsetTop - 80,
behavior:"smooth"

});

}