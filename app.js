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

/* AUTO LOAD FIRST CATEGORY */
const firstCategory = Object.keys(storeData)[0];

if(firstCategory){
renderProducts(firstCategory);
}

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

},4000);

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

if(!storeData[cat]) return;

let html="";

storeData[cat].forEach(p=>{
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
CLOSE DROPDOWN OUTSIDE CLICK
============================== */

document.addEventListener("click",function(e){

if(!e.target.closest(".custom-dropdown")){

if(amazonDropdown) amazonDropdown.classList.remove("active");
if(typeof marketDropdown !== "undefined" && marketDropdown)
marketDropdown.classList.remove("active");

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

/* ==============================
FORCE GRID REFLOW FIX
============================== */

function fixGridLayout(){

document.querySelectorAll(".product-grid").forEach(grid=>{

grid.style.display="none";

grid.offsetHeight; // force reflow

grid.style.display="grid";

});

}

window.addEventListener("load",fixGridLayout);
window.addEventListener("pageshow",fixGridLayout);

/* ==============================
FORCE SERVICE WORKER UPDATE
============================== */

if ('serviceWorker' in navigator) {

navigator.serviceWorker.getRegistrations().then(function(registrations) {

for (let registration of registrations) {

registration.update();

}

});

}