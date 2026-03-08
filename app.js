const drawer = document.getElementById("drawer");
const overlay = document.getElementById("drawerOverlay");

function toggleDrawer(){
drawer.classList.toggle("active");
overlay.classList.toggle("active");
}

overlay.addEventListener("click",toggleDrawer);


let storeData={};

async function loadStore(){

let res=await fetch("json/amazon.json");
storeData=await res.json();

}

loadStore();


function getImage(keyword,index){

return `https://images.unsplash.com/photo-1503342217505-b0a15cf70489?auto=format&fit=crop&w=900&q=60&${keyword}&sig=${index}`;

}


function productCard(p,img){

return `
<div class="glass-card">

<div class="product-image"
style="background-image:url('${img}')">
</div>

<div class="card-title">${p.title}</div>

<div class="theme-divider-b"></div>

<div class="product-meta">
<div class="product-price">${p.price}</div>
<div class="product-discount">${p.discount}</div>
<div class="product-colors">Colors Available: ${p.colors}</div>
</div>

<div class="brand-wrap">
<a href="${p.link}" target="_blank"
class="brand"
style="--chip-color:#ff9900;">
View Deal
</a>
</div>

</div>
`;
}


function renderProducts(cat){

let grid=document.getElementById("hotDeals");

let html="";

storeData[cat].forEach((p,index)=>{

let img=getImage(p.keyword,index);

html+=productCard(p,img);

});

grid.innerHTML=html;

}


document.querySelectorAll("[data-cat]").forEach(btn=>{
btn.addEventListener("click",function(e){
e.preventDefault();
renderProducts(this.dataset.cat);
});
});