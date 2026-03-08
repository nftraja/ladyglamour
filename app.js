const drawer = document.getElementById("drawer");
const overlay = document.getElementById("drawerOverlay");

function toggleDrawer(){

drawer.classList.toggle("active");
overlay.classList.toggle("active");

}

if(overlay){

overlay.addEventListener("click",toggleDrawer);

}



let storeData={};



async function loadStore(){

let res=await fetch("json/amazon.json");

storeData=await res.json();

loadSharedProduct();
loadSharedCollection();

}

loadStore();



function getImage(title){

let q=title.split(" ")[0];

return "https://source.unsplash.com/600x400/?"+q;

}



function renderProducts(cat){

let grid=document.getElementById("hotDeals");

if(!storeData[cat]){

grid.innerHTML="No products";

return;

}

let html="";

storeData[cat].forEach(p=>{

let img=getImage(p.title);

html+=`

<div class="glass-card">

<div class="product-image"
style="background-image:url('${img}')"></div>

<div class="card-title">${p.title}</div>

<div class="product-meta">

<div class="product-price">${p.price}</div>

<div class="product-discount">${p.discount}</div>

<div class="product-colors">Colors: ${p.colors}</div>

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



document.querySelectorAll("[data-cat]").forEach(btn=>{

btn.addEventListener("click",function(e){

e.preventDefault();

let cat=this.dataset.cat;

renderProducts(cat);

scrollToDeals();

});

});



function scrollToDeals(){

let target=document.getElementById("hotDeals");

window.scrollTo({

top:target.offsetTop-80,

behavior:"smooth"

});

}



function loadSharedProduct(){

let params=new URLSearchParams(window.location.search);

let pid=params.get("p");

if(!pid)return;

let found=null;

Object.values(storeData).forEach(cat=>{

cat.forEach(p=>{

if(p.id===pid){

found=p;

}

});

});

if(found){

renderProducts(found);

}

}



function loadSharedCollection(){

let params=new URLSearchParams(window.location.search);

let cat=params.get("cat");

if(!cat)return;

renderProducts(cat);

}