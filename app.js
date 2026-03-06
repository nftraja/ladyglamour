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
LIVE DEALS API
============================== */

async function loadDeals(query="smartwatch"){

try{

let res = await fetch(
"https://dummyjson.com/products/search?q="+query
);

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

if(!grid) return;

let html = "";

products.slice(0,6).forEach(p => {

let q = p.title.replaceAll(" ","+");

/* marketplace links */

let amazon =
"https://www.amazon.in/s?k="+q;

let flipkart =
"https://www.flipkart.com/search?q="+q;

let ebay =
"https://www.ebay.com/sch/i.html?_nkw="+q;

let meesho =
"https://www.meesho.com/search?q="+q;


/* best deal demo */

let markets = [
{ name:"Amazon", color:"#ff9900" },
{ name:"Flipkart", color:"#2962ff" },
{ name:"eBay", color:"#e53238" },
{ name:"Meesho", color:"#ff3f6c" }
];

let best = markets[Math.floor(Math.random()*markets.length)];


html += `

<div class="glass-card">

<img src="${p.thumbnail}" 
style="width:100%;border-radius:12px">

<div class="card-title">${p.title}</div>

<div class="theme-divider-b"></div>

<p class="card-text">
Preview image. View full product details on the selected marketplace.
</p>

<div class="theme-divider-b"></div>

<div class="card-text">
🔥 Best Deal → ${best.name}
</div>

<div class="theme-divider-b"></div>

<div class="brand-wrap">

<a href="${amazon}" target="_blank"
class="brand"
style="--chip-color:#ff9900;">
<span>Amazon</span>
</a>

<a href="${flipkart}" target="_blank"
class="brand"
style="--chip-color:#2962ff;">
<span>Flipkart</span>
</a>

<a href="${ebay}" target="_blank"
class="brand"
style="--chip-color:#e53238;">
<span>eBay</span>
</a>

<a href="${meesho}" target="_blank"
class="brand"
style="--chip-color:#ff3f6c;">
<span>Meesho</span>
</a>

</div>

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

scrollToDeals();

}

catch(e){

console.log("Search Error",e);

}

}



/* ==============================
CATEGORY CLICK SYSTEM
============================== */

document.querySelectorAll("[data-cat]").forEach(btn=>{

btn.addEventListener("click",function(e){

e.preventDefault();

let query = this.dataset.cat;

loadDeals(query);

scrollToDeals();

});

});



/* ==============================
SCROLL TO DEALS
============================== */

function scrollToDeals(){

let target = document.getElementById("hotDeals");

if(!target) return;

window.scrollTo({

top:target.offsetTop - 80,

behavior:"smooth"

});

}



/* ==============================
INIT
============================== */

loadDeals();