const drawer=document.getElementById("drawer");
const overlay=document.getElementById("drawerOverlay");

function toggleDrawer(){

drawer.classList.toggle("active");
overlay.classList.toggle("active");

}



/* IMAGE ENGINE */

function getImage(keyword){

return "https://source.unsplash.com/600x338/?"+encodeURIComponent(keyword);

}



/* LOAD AMAZON JSON */

let storeData={};

async function loadStore(){

let res=await fetch("json/amazon.json");

storeData=await res.json();

loadSharedProduct();
loadSharedCollection();

}

loadStore();



/* RENDER PRODUCTS */

function renderProducts(cat){

let grid=document.getElementById("hotDeals");

if(!storeData[cat]){

grid.innerHTML="<p>No products available</p>";

return;

}

let html="";

storeData[cat].forEach(p=>{

let img=getImage(p.keyword||p.title);

html+=`

<div class="glass-card">

<div class="product-image"
style="background-image:url('${img}')"></div>

<div class="card-title">${p.title}</div>

<div class="product-meta">

<div class="product-price">${p.price}</div>

<div class="product-discount">${p.discount}</div>

<div class="product-colors">

Colors Available: ${p.colors}

</div>

</div>

<div class="brand-wrap">

<a href="${p.link}"
target="_blank"
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



/* CATEGORY BUTTON */

document.querySelectorAll("[data-cat]").forEach(btn=>{

btn.addEventListener("click",function(e){

e.preventDefault();

renderProducts(this.dataset.cat);

scrollToDeals();

});

});



/* SCROLL */

function scrollToDeals(){

let target=document.getElementById("hotDeals");

window.scrollTo({

top:target.offsetTop-80,

behavior:"smooth"

});

}



/* SEARCH */

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



/* SEARCH RENDER */

function renderSearch(products){

let grid=document.getElementById("hotDeals");

let html="";

products.forEach(p=>{

let img=getImage(p.keyword||p.title);

html+=`

<div class="glass-card">

<div class="product-image"
style="background-image:url('${img}')"></div>

<div class="card-title">${p.title}</div>

<div class="product-meta">

<div class="product-price">${p.price}</div>

<div class="product-discount">${p.discount}</div>

</div>

<div class="brand-wrap">

<a href="${p.link}"
target="_blank"
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



/* SHARE PRODUCT */

function loadSharedProduct(){

let params=new URLSearchParams(window.location.search);

let pid=params.get("p");

if(!pid)return;

Object.values(storeData).forEach(cat=>{

cat.forEach(p=>{

if(p.id===pid){

renderSearch([p]);

}

});

});

}



/* SHARE COLLECTION */

function loadSharedCollection(){

let params=new URLSearchParams(window.location.search);

let cat=params.get("cat");

if(!cat)return;

renderProducts(cat);

}