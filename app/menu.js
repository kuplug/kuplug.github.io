
var menu = {
state:{ parentId:1, query:"", caret:0 }, // default ke Masters

model:{
table:{id:'menu',data:[
{id:1,induk:0,nama:"Masters",isi:1,icon:"setting",url:"menu.controller.menu(1)"},
{id:2,induk:0,nama:"LMS",isi:1,icon:"edu",url:"menu.controller.menu(2)"},
{id:3,induk:0,nama:"Learn",isi:1,icon:"code",url:"menu.controller.menu(3)"},
{id:5,induk:0,nama:"PMB",isi:1,icon:"code",url:"menu.controller.menu(5)"},


{id:6,induk:1,nama:"Dashboards",isi:1,icon:"house",url:"d.url('dashboards')"},
{id:7,induk:1,nama:"Menu",isi:2,icon:"menu",url:"d.url('menus')"},
{id:8,induk:1,nama:"Users",isi:3,icon:"person",url:"d.url('users')"},
{id:9,induk:1,nama:"Akses",isi:4,icon:"lock",url:"d.url('akses')"},
{id:10,induk:1,nama:"Setting",isi:5,icon:"setting",url:"d.url('setting')"},
{id:11,induk:1,nama:"Param",isi:6,icon:"setting",url:"d.url('params')"},
{id:12,induk:1,nama:"Pesan",isi:7,icon:"envelope",url:"d.url('pesan')"},

{id:13,induk:2,nama:"Kursus",isi:2,icon:"edu",url:"d.url('kursus')"},
{id:14,induk:2,nama:"Materi",isi:2,icon:"edu",url:"d.url('materi')"}, // id unik
{id:15,induk:2,nama:"Peserta",isi:1,icon:"person",url:"d.url('peserta')"},
{id:15,induk:2,nama:"Presensi",isi:1,icon:"person",url:"d.url('presensi')"},
{id:4,induk:2,nama:"Jadwal",isi:1,icon:"edu",url:"menu.controller.menu(4)"},

// {id:14,induk:13,nama:"Learn",isi:1,icon:"code",url:"kursus.controller.video('WpW36ldAqnM')"},
{id:16,induk:3,nama:"Kursus",isi:1,icon:"code",url:"kursus.controller.menu(13)"},
{id:17,induk:3,nama:"Presensi",isi:1,icon:"code",url:"kursus.controller.presensi(0)"},
{id:18,induk:3,nama:"Ujian",isi:1,icon:"code",url:"kursus.controller.ujian(0)"},
{id:19,induk:3,nama:"Sertifikat",isi:1,icon:"code",url:"kursus.controller.sertifikat(0)"},



]},
},

view:{
toolbar:function(breadcrumbHtml, q){
return `
<div class="toolbar">
<div class="search" style="position:relative;flex:1">
<input id="menuSearch" type="search" placeholder="Cari menu / submenu…"
value="${q||""}"
oninput="menu.controller.search(event)"
onkeydown="menu.controller.keynav(event)" />
<button type="button" aria-label="Bersihkan" title="Bersihkan"
onclick="menu.controller.clearSearch()"
style="position:absolute;right:8px;top:50%;transform:translateY(-50%);
border:0;background:transparent;cursor:pointer;font-size:18px;line-height:1">×</button>
</div>
<div class="breadcrumb" id="breadcrumb">${breadcrumbHtml}</div>
</div>`;
},

menu:function(arr){
return `
<div class="row shadow">
<div class="col-1-1">
${arr.toolbar}
<div id="card">${d.view.card(arr)}</div>
</div>
</div>`;
},
},

controller:{

view:function(i){
    data=d.getls('data');
    if(data) { this.menu(i);  }
    else { login.controller.signform(1); }
},



// breadcrumb builder
buildBreadcrumbw:function(currentId){
const data = menu.model.table.data;
const chain = [];
let cur = data.find(x=>x.id==currentId);
while(cur){
chain.unshift(cur);
if(cur.induk===0) break;
cur = data.find(x=>x.id==cur.induk);
}
return chain.map((node, idx)=>{
const last = idx===chain.length-1;
return last
? `<span>${node.nama}</span>`
: `<a onclick="menu.controller.menu(${node.id})">${node.nama}</a> <span>›</span> `;
}).join("");
},


buildBreadcrumb:function(currentId){
const data = menu.model.table.data;
const chain = [];

let cur = data.find(x=>x.id==currentId);
while(cur){
chain.unshift(cur);
if(cur.induk===0) break;
cur = data.find(x=>x.id==cur.induk);
}

// Tambahkan root breadcrumb (id:0)
chain.unshift({id:0,nama:"Menu"});

// Render HTML breadcrumb clickable
return chain.map((node, idx)=>{
const last = idx===chain.length-1;
if(last){
return `<span>${node.nama}</span>`;
}
return `<a onclick="menu.controller.menu(${node.id})">${node.nama}</a> <span>›</span> `;
}).join("");
},



// BFS: ambil semua turunan dari parent
getDescendants:function(parentId){
const data = menu.model.table.data;
const out=[]; const q=[parentId];
while(q.length){
const pid=q.shift();
const childs=data.filter(e=>e.induk==pid);
if(childs.length){
out.push(...childs);
q.push(...childs.map(c=>c.id));
}
}
return out;
},

// render utama
menu:function(parentId, opts={}){
const data = menu.model.table.data;
if(typeof parentId==="number") menu.state.parentId = parentId;

const q = (menu.state.query||"").trim().toLowerCase();
let list = q
? menu.controller.getDescendants(menu.state.parentId)
: data.filter(e=>e.induk==menu.state.parentId);

if(q) list = list.filter(it => (it.nama||"").toLowerCase().includes(q));

const arr={ data:list };
const bcHtml = menu.controller.buildBreadcrumb(menu.state.parentId);
arr.toolbar = menu.view.toolbar(bcHtml, menu.state.query);
if(!list.length && q){
arr.toolbar += `<div class="muted" style="margin:6px 0 10px">
Tidak ada hasil untuk "<b>${menu.state.query}</b>".</div>`;
}

d.gebi('content').innerHTML = menu.view.menu(arr);

// kembalikan fokus & caret
if(opts.restoreFocus){
requestAnimationFrame(()=>{
const el = document.getElementById('menuSearch');
if(el){
el.focus();
const pos = (typeof menu.state.caret==="number") ? menu.state.caret : el.value.length;
try{ el.setSelectionRange(pos,pos); }catch(_){}
}
});
}
},

search:function(ev){
const val = (ev?.target?.value ?? "").toString();
const caret = ev?.target?.selectionStart ?? val.length;
menu.state.query = val;
menu.state.caret = caret;
menu.controller.menu(menu.state.parentId, { restoreFocus:true });
},

keynav:function(ev){
if(ev.key==="Escape"){
menu.controller.clearSearch();
ev.preventDefault();
return;
}
if(ev.key==="Enter"){
ev.preventDefault();
const q = (menu.state.query||"").toLowerCase();
const list = menu.controller.getDescendants(menu.state.parentId)
.filter(it => (it.nama||"").toLowerCase().includes(q));
if(list.length===1){ menu.controller.open(list[0].id); }
}
},

clearSearch:function(){
menu.state.query="";
menu.state.caret=0;
menu.controller.menu(menu.state.parentId, { restoreFocus:true });
},

open:function(id){
const data = menu.model.table.data;
const item = data.find(x=>x.id==id);
if(!item) return;
try{
const m = item.url && item.url.match(/^menu\.controller\.menu\((\d+)\)/);
if(m){ menu.controller.menu(parseInt(m[1],10)); return; }
if(typeof d.url==="function"){ eval(item.url); }
}catch(e){ console.error(e); if(typeof d.info==="function") d.info("Gagal membuka menu"); }
},
},

nah:function(){ menu.controller.menu(1); }
};

document.addEventListener('keydown', (e)=>{
if((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==='k'){
e.preventDefault();
const el=document.getElementById('menuSearch');
if(el){ el.focus(); el.select(); }
}
});
