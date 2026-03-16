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
let myntraData = {};


/* ==============================
LOAD AMAZON JSON
============================== */

async function loadStore(){

  try{

    const res = await fetch("json/amazon.json");

    if(!res.ok) throw new Error("Amazon JSON not found");

    storeData = await res.json();

    const firstCategory = Object.keys(storeData)[0];

    if(firstCategory){
      renderProducts(firstCategory);
    }

  }
  catch(e){

    console.error("Amazon JSON error:",e);

  }

}

loadStore();


/* ==============================
AMAZON DROPDOWN SYSTEM
============================== */

const amazonSelected = document.getElementById("amazonSelected");
const amazonDropdown = document.getElementById("amazonDropdown");
const dropdownWrap = document.querySelector(".custom-dropdown");

if(amazonSelected && amazonDropdown){

amazonSelected.addEventListener("click",function(e){

e.stopPropagation();

amazonDropdown.classList.toggle("active");
dropdownWrap.classList.toggle("open");

});

document.querySelectorAll(".dropdown-item").forEach(item=>{

item.addEventListener("click",function(){

const cat = this.dataset.cat;

amazonSelected.innerHTML =
this.innerText + '<span class="dropdown-arrow">⌄</span>';

amazonDropdown.classList.remove("active");
dropdownWrap.classList.remove("open");

renderProducts(cat);

});

});

}


/* ==============================
CLOSE DROPDOWN OUTSIDE CLICK
============================== */

document.addEventListener("click",function(e){

if(!e.target.closest(".custom-dropdown")){
amazonDropdown?.classList.remove("active");
dropdownWrap?.classList.remove("open");
}

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

<div class="card-title">${p.title || ""}</div>

<div class="theme-divider-b"></div>

<div class="product-meta">

<div class="product-price">${p.price}</div>
<div class="product-discount">${p.discount}</div>

</div>

<div class="brand-wrap">

<a href="${p.link}"
target="_blank"
class="view-btn">

View Deal

</a>

</div>

</div>

`;

}


/* ==============================
RENDER AMAZON PRODUCTS
============================== */

function renderProducts(cat){

  const grid = document.getElementById("hotDeals");

  if(!grid) return;

  if(!storeData[cat]) return;

  let html="";

  storeData[cat].forEach(p=>{
    html+=productCard(p);
  });

  grid.innerHTML = html;

}


/* ==============================
COLLECTION LOADER
============================== */

async function loadCollection(cat){

  try{

    const res = await fetch("json/" + cat + ".json");

    if(!res.ok) throw new Error("Collection JSON missing");

    const data = await res.json();

    const grid = document.getElementById("hotDeals");

    if(!grid) return;

    let html="";

    data.products.forEach(p=>{
      html+=productCard(p);
    });

    grid.innerHTML = html;

    toggleDrawer();

  }

  catch(e){

    console.error("Collection load error:",e);

  }

}


/* ==============================
BRAND DIRECTORY
============================== */

async function loadBrands(){

  try{

    const res = await fetch("json/brands.json");

    if(!res.ok) throw new Error("Brands JSON missing");

    const data = await res.json();

    const grid = document.getElementById("brandGrid");

    if(!grid) return;

    let html="";

    data.brands.forEach(b=>{

html += `

<div class="brand-store-card">

<div class="brand-thumb">

<img 
data-domain="${b.domain}"
loading="lazy"
alt="${b.name}"
class="brand-icon">

</div>

<div class="brand-content">

<div class="brand-title">${b.name}</div>

<p class="brand-desc">${b.description}</p>

<a href="${b.link}" target="_blank"
class="brand-open-btn"
style="--chip-color:linear-gradient(135deg,#ff512f,#dd2476);">

${b.button} →

</a>

</div>

</div>

`;

    });

    grid.innerHTML = html;

    loadBrandIcons();

  }

  catch(e){

    console.error("Brand JSON error:",e);

  }

}


/* ==============================
RUN BRAND LOADER ONLY IF PAGE HAS GRID
============================== */

if(document.getElementById("brandGrid")){
loadBrands();
}


/* ==============================
FAVICON LOADER
============================== */

function loadBrandIcons(){

  const icons = document.querySelectorAll(".brand-icon");

  icons.forEach(img=>{

    const domain = img.dataset.domain;

    const google =
    `https://www.google.com/s2/favicons?sz=128&domain=${domain}`;

    const duck =
    `https://icons.duckduckgo.com/ip3/${domain}.ico`;

    img.src = google;

    img.onerror = function(){

      this.onerror = function(){
        this.src="images/logo.png";
      };

      this.src = duck;

    };

  });

}


/* ==============================
AUTO SLIDE GUIDE CAROUSEL
============================== */

const guideCarousel = document.getElementById("guideCarousel");

if(guideCarousel){

let scrollAmount = 0;
let carouselInterval;

function startCarousel(){

carouselInterval = setInterval(()=>{

const card = guideCarousel.querySelector(".guide-card");
if(!card) return;

const cardWidth = card.offsetWidth + 8;

scrollAmount += cardWidth;

if(scrollAmount >= guideCarousel.scrollWidth - guideCarousel.clientWidth){
scrollAmount = 0;
}

guideCarousel.scrollTo({
left: scrollAmount,
behavior: "smooth"
});

},2800);

}

function stopCarousel(){
clearInterval(carouselInterval);
}

startCarousel();


document.addEventListener("visibilitychange",()=>{

if(document.hidden){
stopCarousel();
}else{
startCarousel();
}

});

}