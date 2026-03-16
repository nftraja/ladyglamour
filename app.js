/* ==============================
GLOBAL
============================== */

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
}

html{
scroll-behavior:smooth;
touch-action:manipulation;
}

body{
background:linear-gradient(135deg,#0b0b0b,#151515);
color:#00ff88;
overflow-x:hidden;
}


/* ==============================
HEADER
============================== */

.app-header{
position:fixed;
top:0;
left:0;
right:0;
height:60px;
display:flex;
align-items:center;
justify-content:space-between;
padding:0 18px;
border-bottom:1px solid rgba(0,255,136,0.28);
z-index:200;
backdrop-filter:blur(12px);
}

.menu-btn{
background:transparent;
border:none;
color:gold;
font-size:25px;
padding:7px;
cursor:pointer;
}

.logo{
font-size:13px;
color:gold;
font-weight:700;
letter-spacing:.5px;
}

.header-icons img{
width:38px;
height:38px;
object-fit:contain;
border-radius:8px;
}


/* ==============================
DRAWER
============================== */

.drawer{
position:fixed;
top:0;
left:-280px;
width:200px;
height:100%;
background:rgba(10,12,20,.95);
z-index:300;
overflow-y:auto;
border-right:1px solid rgba(0,255,136,0.28);
transition:left .3s ease;
padding-top:15px;
}

.drawer.active{
left:0;
}

.drawer a{
display:block;
padding:7px 14px;
color:#00ff88;
text-decoration:none;
font-size:13px;
border-bottom:1px solid rgba(255,255,255,.05);
}


/* ==============================
DRAWER OVERLAY
============================== */

.drawer-overlay{
position:fixed;
top:0;
left:0;
right:0;
bottom:0;
background:rgba(0,0,0,.65);
z-index:250;
display:none;
}

.drawer-overlay.active{
display:block;
}


/* ==============================
MAIN
============================== */

.main-content{
padding:65px 8px 65px;
max-width:1200px;
margin:auto;
}


/* ==============================
GLASS CARD (3D)
============================== */

.glass-card{
border-radius:18px;
padding:15px;
margin-bottom:10px;
background:rgba(255,255,255,0.04);
border:1.5px solid rgba(0,255,136,0.28);
backdrop-filter:blur(10px);

box-shadow:
0 10px 28px rgba(0,0,0,.9),
inset 0 1px 1px rgba(255,255,255,.05);
}


/* ==============================
TEXT
============================== */

.card-title{
font-size:13px;
font-weight:800;
text-align:center;
color:#ffffff;
}

.card-text{
font-size:12.5px;
line-height:1.6;
color:#ffffff;
text-align:center;
}


/* ==============================
DIVIDER
============================== */

.theme-divider-b{
height:1px;
margin:4px 0 6px;
background:linear-gradient(90deg,transparent,rgba(255,255,255,0.65),transparent);
}


/* ==============================
CATEGORY GRID
============================== */

.category-grid{
display:grid;
grid-template-columns:repeat(4,1fr);
gap:8px;
margin-top:12px;
margin-bottom:12px;
justify-items:center;
align-items:start;
}


/* ==============================
CATEGORY ICON
============================== */

.category-icon{
display:flex;
flex-direction:column;
align-items:center;
text-align:center;
text-decoration:none;
color:#ffffff;
width:100%;
transition:transform .25s ease;
}

.category-icon img{
width:75px;
height:75px;
border-radius:50%;
object-fit:cover;
border:1px solid rgba(255,255,255,0.15);
background:#222;
transition:.35s;
}

.category-icon span{
font-size:11px;
margin-top:6px;
}

@media (hover:hover){

.category-icon:hover img{
transform:translateY(-4px) scale(1.08);
border:2px solid #00ff88;

box-shadow:
0 0 12px rgba(0,255,136,.35),
0 6px 14px rgba(0,0,0,.6);
}

}


/* ==============================
GUIDE CARD
============================== */

.guide-card{
position:relative;
border-radius:18px;
padding:8px;
color:#fff;
display:flex;
flex-direction:column;
justify-content:flex-end;
overflow:hidden;
text-decoration:none;
background-size:cover;
background-position:center;
border:1px solid rgba(255,255,255,0.18);

box-shadow:
0 14px 36px rgba(0,0,0,.9),
0 6px 14px rgba(0,0,0,.6);

transition:.25s;
}

@media (hover:hover){

.guide-card:hover{
transform:translateY(-6px) scale(1.03);
box-shadow:
0 0 14px rgba(0,255,136,.35),
0 18px 38px rgba(0,0,0,.95);
}

}

.guide-card::before{
content:"";
position:absolute;
inset:0;
background:var(--card-color);
opacity:.25;
}

.guide-title{
font-size:14px;
font-weight:700;
margin:10px;
}


/* ==============================
BRAND WRAP
============================== */

.brand-wrap{
display:flex;
flex-wrap:wrap;
gap:8px;
justify-content:center;
}


/* ==============================
BRAND CHIP BUTTON
============================== */

.brand{

display:inline-flex;
align-items:center;
justify-content:center;

padding:8px 16px;

border-radius:999px;

font-size:12px;
font-weight:700;

color:#ffffff;
text-decoration:none;

background:var(--chip-color);

box-shadow:
0 6px 16px rgba(0,0,0,.65),
inset 0 2px 4px rgba(255,255,255,.45),
inset 0 -4px 8px rgba(0,0,0,.6);

border:1px solid rgba(255,255,255,.35);

transition:transform .2s ease, box-shadow .2s ease;

}

.brand:active{
transform:scale(.95);
}

@media (hover:hover){

.brand:hover{

transform:scale(1.05);

box-shadow:
0 0 14px rgba(0,255,136,.35),
0 6px 16px rgba(0,0,0,.65);

}

}


/* ==============================
CUSTOM DROPDOWN
============================== */

.custom-dropdown{
position:relative;
width:100%;
}

.dropdown-selected{
width:100%;
padding:8px;
border-radius:12px;
border:1px solid rgba(0,255,136,0.28);
background:rgba(255,255,255,0.06);
color:#ffffff;
font-size:14px;
display:flex;
justify-content:space-between;
align-items:center;
cursor:pointer;
}

.dropdown-list{

position:absolute;
top:110%;
left:0;
right:0;

background:#0f0f0f;

border-radius:12px;

border:1px solid rgba(0,255,136,0.28);

display:none;

max-height:260px;

overflow-y:auto;

z-index:999;

box-shadow:0 12px 28px rgba(0,0,0,.85);

}

.dropdown-list.active{
display:block;
}

.dropdown-item{
padding:8px 12px;
cursor:pointer;
color:#00ff88;
}

.dropdown-item:hover{
background:rgba(0,255,136,.12);
}


/* ==============================
PRODUCT GRID
============================== */

.grid{
display:grid;
grid-template-columns:repeat(2,1fr);
gap:6px;
}


/* ==============================
PRODUCT IMAGE
============================== */

.product-image{
width:100%;
aspect-ratio:1/1;
border-radius:12px;
margin-bottom:6px;
padding:6px;
background:#fff;
background-size:contain;
background-position:center;
background-repeat:no-repeat;
}


/* ==============================
PRODUCT META
============================== */

.product-meta{
text-align:center;
}

.product-price{
font-weight:700;
color:#00ff88;
}

.product-discount{
font-size:11px;
color:#ff4b2b;
font-weight:700;
}


/* ==============================
VIEW DEAL BUTTON
============================== */

.view-btn{
display:inline-block;
padding:8px 16px;
border-radius:999px;
font-size:12px;
font-weight:700;
color:#ffffff;
text-decoration:none;

background:linear-gradient(135deg,#ffb347,#ff8c00);

box-shadow:
0 6px 16px rgba(0,0,0,.65),
inset 0 2px 4px rgba(255,255,255,.45),
inset 0 -4px 8px rgba(0,0,0,.6);

border:1px solid rgba(255,255,255,.35);

transition:transform .2s ease;
}

.view-btn:active{
transform:scale(.95);
}

@media (hover:hover){

.view-btn:hover{

transform:scale(1.05);

box-shadow:
0 0 14px rgba(255,170,0,.35),
0 6px 16px rgba(0,0,0,.65);

}

}


/* ==============================
BOTTOM NAV
============================== */

.bottom-nav{
position:fixed;
bottom:0;
left:0;
right:0;
height:65px;
backdrop-filter:blur(12px);
display:flex;
justify-content:space-around;
align-items:center;
border-top:1px solid rgba(0,255,136,0.28);
z-index:200;
}

.bottom-nav a{
color:#00ff88;
text-decoration:none;
}

.nav-item{
text-align:center;
font-size:14px;
}

.nav-item span{
display:block;
}


/* ==============================
RESPONSIVE
============================== */

@media(max-width:600px){

.grid{
grid-template-columns:repeat(2,1fr);
}

}

@media(min-width:768px){

.grid{
grid-template-columns:repeat(4,1fr);
}

}