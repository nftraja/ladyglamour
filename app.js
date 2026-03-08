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
SMART IMAGE ENGINE
(Pinterest + HD Images)
============================== */

function getImage(title,cat,index){

let keyword="fashion product";

if(cat==="purse")
keyword="women purse handbag";

if(cat==="wallet")
keyword="leather wallet";

if(cat==="handbag")
keyword="women handbag";

if(cat==="watch")
keyword="luxury wristwatch";

if(cat==="perfume")
keyword="luxury perfume bottle";

if(cat==="jewellery")
keyword="fashion jewellery necklace";


let productKeyword = title
.toLowerCase()
.split(" ")
.slice(0,3)
.join(",");


/* FIXED TEMPLATE STRING */

return `https://source.unsplash.com/900x1200/?${keyword},${productKeyword}&sig=${index}`;

}


/* ==============================
PRODUCT CARD TEMPLATE
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
RENDER PRODUCT CARDS
============================== */

function renderProducts(cat){

let grid = document.getElementById("hotDeals");

if(!storeData[cat]){

grid.innerHTML="<p>No products available</p>";
return;

}

let html="";

storeData[cat].forEach((p,index)=>{

let img = getImage(p.title,cat,index);

html+=productCard(p,img);

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

Object.keys(storeData).forEach(cat=>{

storeData[cat].forEach(p=>{

if(p.title.toLowerCase().includes(query)){

p.cat=cat;
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

products.forEach((p,index)=>{

let img=getImage(p.title,p.cat || "fashion",index);

html+=productCard(p,img);

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
let catName=null;

Object.keys(storeData).forEach(cat=>{

storeData[cat].forEach(p=>{

if(p.id===pid){

found=p;
catName=cat;

}

});

});

if(found){

renderSearch([{...found,cat:catName}]);
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