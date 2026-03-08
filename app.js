/* ==============================
LadyGlamour Core Script
============================== */


/* ==============================
DRAWER SYSTEM
============================== */

const drawer=document.getElementById("drawer");
const overlay=document.getElementById("drawerOverlay");

function toggleDrawer(){

drawer.classList.toggle("active");
overlay.classList.toggle("active");

document.body.style.overflow=
drawer.classList.contains("active")?"hidden":"";

}

if(overlay){
overlay.addEventListener("click",toggleDrawer);
}


/* ==============================
STORE DATA
============================== */

let storeData={};


/* ==============================
LOAD AMAZON JSON
============================== */

async function loadStore(){

try{

let res=await fetch("json/amazon.json");

storeData=await res.json();

console.log("Store Loaded",storeData);

loadSharedProduct();
loadSharedCollection();

}

catch(e){

console.log("JSON Load Error",e);

}

}

loadStore();



/* ==============================
UNSPLASH IMAGE ENGINE
============================== */

function getImage(keyword){

return "https://source.unsplash.com/600x338/?"+encodeURIComponent(keyword);

}



/* ==============================
RENDER PRODUCTS
============================== */

function renderProducts(cat){

let grid=document.getElementById("hotDeals");

if(!storeData[cat]){

grid.innerHTML="<p>No products available</p>";
return;

}

let html="";

storeData[cat].forEach(p=>{

let img=getImage(p.title);

html+=`

<div class="glass-card">

<div class="product-image"
style="background-image:url('${img}')">
</div>

<div class="card-title">${p.title}</div>

<div class="theme-divider-b"></div>

<div class="product-meta">

<div class="product-price">
${p.price||""}
</div>

<div class="product-discount">
${p.discount||""}
</div>

<div class="product-colors">
Colors: ${p.colors||"-"}
</div>

</div>

<div class="brand-wrap">

<a href="${p.link}" target="_blank"
class="brand"
style="--chip-color:#ff9900">

<span>View Deal</span>

</a>

</div>

</div>

`;

});

grid.innerHTML=html;

}



/* ==============================
CATEGORY BUTTONS
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

if(!target)return;

window.scrollTo({

top:target.offsetTop-80,
behavior:"smooth"

});

}



/* ==============================
SEARCH SYSTEM
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
RENDER SEARCH
============================== */

function renderSearch(products){

let grid=document.getElementById("hotDeals");

let html="";

products.forEach(p=>{

let img=getImage(p.title);

html+=`

<div class="glass-card">

<div class="product-image"
style="background-image:url('${img}')">
</div>

<div class="card-title">${p.title}</div>

<div class="theme-divider-b"></div>

<div class="product-meta">

<div class="product-price">
${p.price||""}
</div>

<div class="product-discount">
${p.discount||""}
</div>

<div class="product-colors">
Colors: ${p.colors||"-"}
</div>

</div>

<div class="brand-wrap">

<a href="${p.link}" target="_blank"
class="brand"
style="--chip-color:#ff9900">

<span>View Deal</span>

</a>

</div>

</div>

`;

});

grid.innerHTML=html;

}



/* ==============================
PRODUCT SHARE LINK
============================== */

function loadSharedProduct(){

let params=new URLSearchParams(window.location.search);

let pid=params.get("p");

if(!pid)return;

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

renderRelatedProducts(category,found.id);

}

}



/* ==============================
RELATED PRODUCTS
============================== */

function renderRelatedProducts(cat,excludeId){

let grid=document.getElementById("hotDeals");

if(!storeData[cat])return;

let html="";

html+=`

<div style="width:100%;margin-top:20px">

<div class="card-title">
More From This Collection
</div>

<div class="theme-divider-b"></div>

</div>

`;

storeData[cat].forEach(p=>{

if(p.id===excludeId)return;

let img=getImage(p.title);

html+=`

<div class="glass-card">

<div class="product-image"
style="background-image:url('${img}')">
</div>

<div class="card-title">${p.title}</div>

<div class="theme-divider-b"></div>

<div class="product-meta">

<div class="product-price">${p.price}</div>

</div>

<div class="brand-wrap">

<a href="?p=${p.id}"
class="brand"
style="--chip-color:#2962ff">

<span>View</span>

</a>

</div>

</div>

`;

});

grid.innerHTML+=html;

}



/* ==============================
COLLECTION SHARE
============================== */

function loadSharedCollection(){

let params=new URLSearchParams(window.location.search);

let cat=params.get("cat");

if(!cat)return;

if(storeData[cat]){

renderProducts(cat);

scrollToDeals();

}

}