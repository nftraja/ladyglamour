/* ==============================
DRAWER SYSTEM
============================== */

const drawer = document.getElementById("drawer");
const overlay = document.getElementById("drawerOverlay");

function toggleDrawer(){

if(!drawer || !overlay) return;

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
let myntraData = {};   // UPDATED


/* ==============================
LOAD AMAZON JSON
============================== */

async function loadStore(){

try{

let res = await fetch("json/amazon.json");
storeData = await res.json();

/* DEFAULT CATEGORY */
renderProducts("purse");

}
catch(e){
console.log("Amazon JSON error",e);
}

}

loadStore();


/* ==============================
CAROUSEL SYSTEM
============================== */

document.addEventListener("DOMContentLoaded",()=>{

const carousel = document.getElementById("guideCarousel");

if(!carousel) return;

let autoSlide;

function startAuto(){

autoSlide = setInterval(()=>{

const cardWidth = carousel.querySelector(".guide-card").offsetWidth + 10;

carousel.scrollBy({
left:cardWidth,
behavior:"smooth"
});

if(carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth-5){

carousel.scrollTo({
left:0,
behavior:"smooth"
});

}

},3000);

}

function stopAuto(){
clearInterval(autoSlide);
}

startAuto();


let isDown=false;
let startX;
let scrollLeft;

carousel.addEventListener("mousedown",(e)=>{

isDown=true;
startX=e.pageX-carousel.offsetLeft;
scrollLeft=carousel.scrollLeft;
stopAuto();

});

carousel.addEventListener("mouseleave",()=>{
isDown=false;
startAuto();
});

carousel.addEventListener("mouseup",()=>{
isDown=false;
startAuto();
});

carousel.addEventListener("mousemove",(e)=>{

if(!isDown) return;

e.preventDefault();

const x=e.pageX-carousel.offsetLeft;
const walk=(x-startX)*1.5;

carousel.scrollLeft=scrollLeft-walk;

});


let touchStartX=0;

carousel.addEventListener("touchstart",(e)=>{

touchStartX=e.touches[0].clientX;
stopAuto();

});

carousel.addEventListener("touchmove",(e)=>{

let touchEndX=e.touches[0].clientX;

carousel.scrollLeft += touchStartX-touchEndX;

touchStartX = touchEndX;

});

carousel.addEventListener("touchend",()=>{
startAuto();
});

});


/* ==============================
LOAD MYNTRA JSON
============================== */

async function loadMarketplace(){

try{

let res = await fetch("json/myntra.json");   // UPDATED

myntraData = await res.json();

/* DEFAULT CATEGORY */

renderMarketplace("fashion");

/* dropdown label update */

const marketSelected = document.getElementById("myntraSelected"); // UPDATED

if(marketSelected){
marketSelected.innerHTML =
'Fashion <span class="dropdown-arrow">⌄</span>';
}

}
catch(e){
console.log("Myntra JSON error",e);
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
RENDER MYNTRA PRODUCTS
============================== */

function renderMarketplace(cat){

let grid = document.getElementById("myntraDeals");  // UPDATED

if(!grid) return;

if(!myntraData[cat]){

grid.innerHTML="<p>No products available</p>";
return;

}

let html="";

myntraData[cat].forEach(p=>{
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
MYNTRA CUSTOM DROPDOWN
============================== */

const marketSelected = document.getElementById("myntraSelected"); // UPDATED
const marketDropdown = document.getElementById("myntraDropdown"); // UPDATED

if(marketSelected){

marketSelected.addEventListener("click",function(){

marketDropdown.classList.toggle("active");

});

}

document.querySelectorAll("#myntraDropdown .dropdown-item") // UPDATED
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
SCROLL MYNTRA
============================== */

function scrollToMarketplace(){

let target=document.getElementById("myntraDeals"); // UPDATED

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

/* ==============================
COLLECTION LOADER (DRAWER MENU)
============================== */

async function loadCollection(cat){

let res = await fetch("json/" + cat + ".json");

let data = await res.json();

let grid = document.getElementById("hotDeals");

let html="";

data.products.forEach(p=>{
html+=productCard(p);
});

grid.innerHTML=html;

toggleDrawer();

}

/* ==============================
FLIPKART SYSTEM
============================== */

/* FLIPKART DATA */

let flipkartData = {};


/* ==============================
LOAD FLIPKART JSON
============================== */

async function loadFlipkart(){

try{

let res = await fetch("json/flipkart.json");

flipkartData = await res.json();

/* DEFAULT CATEGORY */

renderFlipkart("electronics");

/* dropdown label update */

const flipSelected = document.getElementById("flipkartSelected");

if(flipSelected){
flipSelected.innerHTML =
'Electronics <span class="dropdown-arrow">⌄</span>';
}

}
catch(e){
console.log("Flipkart JSON error",e);
}

}

loadFlipkart();


/* ==============================
RENDER FLIPKART PRODUCTS
============================== */

function renderFlipkart(cat){

let grid = document.getElementById("flipkartDeals");

if(!grid) return;

if(!flipkartData[cat]){

grid.innerHTML="<p>No products available</p>";
return;

}

let html="";

flipkartData[cat].forEach(p=>{
html+=productCard(p);
});

grid.innerHTML=html;

}


/* ==============================
FLIPKART CUSTOM DROPDOWN
============================== */

const flipSelected = document.getElementById("flipkartSelected");
const flipDropdown = document.getElementById("flipkartDropdown");

if(flipSelected){

flipSelected.addEventListener("click",function(){

flipDropdown.classList.toggle("active");

});

}

document.querySelectorAll("#flipkartDropdown .dropdown-item")
.forEach(item=>{

item.addEventListener("click",function(){

let cat = this.dataset.cat;

renderFlipkart(cat);

flipSelected.innerHTML =
this.textContent +
' <span class="dropdown-arrow">⌄</span>';

flipDropdown.classList.remove("active");

scrollToFlipkart();

});

});


/* ==============================
SCROLL FLIPKART
============================== */

function scrollToFlipkart(){

let target=document.getElementById("flipkartDeals");

if(!target) return;

window.scrollTo({
top:target.offsetTop-80,
behavior:"smooth"
});

}

/* ==============================
BRAND DIRECTORY SYSTEM
AUTO BRAND LOGO + JSON LOAD
============================== */

async function loadBrands(){

try{

let res = await fetch("json/brands.json");
let data = await res.json();

let grid = document.getElementById("brandGrid");

if(!grid) return;

let html="";

data.brands.forEach(b=>{

html += `

<div class="brand-store-card">

<div class="brand-thumb">

<img src="https://www.google.com/s2/favicons?sz=128&domain=${b.domain}"
alt="${b.name}">

</div>

<div class="brand-info">

<div class="brand-title">${b.name}</div>

<p class="brand-desc">${b.description}</p>

<a href="${b.link}"
target="_blank"
class="brand-open-btn">

${b.button} →

</a>

</div>

</div>

`;

});

grid.innerHTML = html;

}
catch(e){

console.log("Brand JSON error",e);

}

}

loadBrands();