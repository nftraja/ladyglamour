/* ==============================
LadyGlamour Core Script
============================== */


/* DRAWER SYSTEM */

const drawer = document.getElementById("drawer");
const overlay = document.getElementById("drawerOverlay");

function toggleDrawer(){

drawer.classList.toggle("active");

overlay.classList.toggle("active");

document.body.style.overflow =
drawer.classList.contains("active") ? "hidden" : "";

}

overlay.addEventListener("click",toggleDrawer);



/* ==============================
LIVE DEALS API
============================== */

async function loadDeals(){

try{

let res = await fetch("https://dummyjson.com/products?limit=6");

let data = await res.json();

renderDeals(data.products);

}

catch(e){

console.log("Deals API Error",e);

}

}



/* ==============================
RENDER DEAL CARDS
============================== */

function renderDeals(products){

let grid = document.getElementById("hotDeals");

let html = "";

products.forEach(p => {

html += `

<div class="glass-card">

<img src="${p.thumbnail}" 
style="width:100%;border-radius:12px">

<div class="card-title">${p.title}</div>

<div class="theme-divider-b"></div>

<p class="card-text">$${p.price}</p>

<div class="brand-wrap">

<a href="#" class="brand"
style="--chip-color:#2962ff;">
<span>Amazon</span>
</a>

<a href="#" class="brand"
style="--chip-color:#ff1744;">
<span>Flipkart</span>
</a>

<a href="#" class="brand"
style="--chip-color:#00c853;">
<span>AliExpress</span>
</a>

</div>

</div>

`;

});

grid.innerHTML = html;

}



/* ==============================
AI SEARCH DEMO
============================== */

const searchBox = document.getElementById("searchBox");

if(searchBox){

searchBox.addEventListener("keyup",function(e){

if(e.key === "Enter"){

searchProducts();

}

});

}



async function searchProducts(){

let query = searchBox.value.trim();

if(!query){

return;

}

try{

let res = await fetch(
"https://dummyjson.com/products/search?q="+query
);

let data = await res.json();

renderDeals(data.products);

window.scrollTo({
top:document.getElementById("hotDeals").offsetTop - 80,
behavior:"smooth"
});

}

catch(e){

console.log("Search Error",e);

}

}



/* ==============================
INIT
============================== */

loadDeals();