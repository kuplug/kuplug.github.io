log=console.log.bind(window.console);


let modul='donat'

var table={id:'master',rpp:5,page:1,fld:'id,nama',data:[
{id:1,nama:"satu",isi:250,icon:"bayam",url:"d.controller.view()"},
{id:2,nama:"dua",isi:75,icon:"person",url:"d.controller.view()"},
{id:3,nama:"tiga",isi:250,icon:"geo",url:"d.controller.view()"},
{id:3,nama:"tiga",isi:250,icon:"geo",url:"d.controller.view()"},
{id:3,nama:"tiga",isi:250,icon:"geo",url:"d.controller.view()"},
{id:3,nama:"tiga",isi:250,icon:"geo",url:"d.controller.view()"},
{id:3,nama:"tiga",isi:250,icon:"geo",url:"d.controller.view()"},
{id:3,nama:"tiga",isi:250,icon:"geo",url:"d.controller.view()"},
],
tipe:[
  // {id:"id",nama:"option",arr:'1,2,5',info:'abaikan',perlu:'0'},
{id:"id",nama:"text",arr:'1,2,5',info:'abaikan',perlu:'0'},
{id:"nama",nama:"text",arr:'1,2,5',info:'wajib diisi',perlu:'0'},
{id:"isi",nama:"textarea",arr:'1,2',info:'isi apa ajah',perlu:'0'},
],
};

table.rst= table.data;

const db = {}, donat = function(x='donat'){ db[x]=window[x]; return db[x];}

d={
mod:'master',
callback:function(){log('callback')},
url:function(id){ donat(id);

  modul=id;

// kursus.controller.view()
  // table.id=id;
  // table.data=db[id].model.table.data;
  // table.tipe=db[id].model.tipe;
  // d.controller.view();  log(table.id);

  // d.modal(id)

  window[id].controller.view()
},
setcss:function(id,str){return document.documentElement.style.setProperty(id, str);},
gebi:function(str){return document.getElementById(str);},
gebc:function(str){return document.getElementsByClassName(str);},
qs:function(str){return document.querySelector(str);},
getf:function(id){var item = d.model.set.filter(el => el.nama==id); if(item.length>0){controller[item[0].isi]();}},
ce:function(str) {return document.createElement(str);},
setls:function(nama,arr) {return window.localStorage.setItem(nama, JSON.stringify(arr));},
getls:function(nama) {return window.localStorage.getItem(nama);},
remls:function(nama) {return window.localStorage.removeItem(nama);},
color:function(step){
var pColor = getComputedStyle(document.body);
ph=pColor.getPropertyValue('--pColor-h');
ps=pColor.getPropertyValue('--pColor-s');
pl=pColor.getPropertyValue('--pColor-l');
arrColor = [];
var pl=parseInt(pl);
var pl=parseInt(pl+15);
per=parseInt(30 / step);
for(var i = 0; i < step; i++){hsl=`hsl(${ph},${ps},${pl}%)`;
pl=pl-per;
arrColor.push(hsl);
}
return arrColor;
},

modal:function(id) {
d.gebi('modal').innerHTML=d.view.modal(id);
d.open('modal')
tutup=function(){d.modal(''); d.close('modal');}
},

info:function(msg){d.gebi('bawah').innerHTML=msg;
d.open('bawah');
setTimeout(function(){d.close('bawah');}, 3000);
},

close:function(id){var z=this.gebi(id); z.className=z.className.replace('show', 'hide');},
open:function(id) {var z=this.gebi(id); z.className=z.className.replace('hide', 'show');},
events:function(id,method){d.gebi(id).addEventListener("click", method);},
selectElement:function(id, valueToSelect) {d.gebi(id).value = valueToSelect;},

model:{
id:'',
nama:'donat',
datatable:table,
table:table,
tmp:{},
color:{id:'color',data:[{id:'--pColor-h',isi:'213'},{id:'--pColor-s',isi:'100%'},{id:'--pColor-l',isi:'22.5%'}]}, // end color
data:[{id:1,nama:"satu"},{id:2,nama:"dua"},], // end data

css:{
ul:'ul', li:'li', a:'a',search:'search',page:'shadow row',
table:'table',
form:'form row',
gInput:'gInput', input:'input', label:'label',
gButton:"gButton", button:'button',
gIcons:"gIcons", icons:'icons',
}, //end css

page:{id:'page',data:['input','table','button'],}, //end page

input:{id:'input',data:table.data,tipe:table.tipe}, //end input

button:{id:'button',data:table.data,}, //end button
block:{id:'block',data:[],}, //end block
card:{id:'card',data:table.data}, //end card

view:{id:'view',
datatable:table,
button:{data:[
{id:1,nama:"Add",icon:"plus",url:"d.controller.add()"},
{id:2,nama:"Print",icon:"printer",url:"d.controller.print()"},
// {id:3,nama:"Upload",icon:"upload",url:"d.controller.upload()"},
// {id:4,nama:"Download",icon:"download",url:"d.controller.download()"},
// {id:4,nama:"Delete",icon:"x",url:"d.service.delete()"},
]},
}, //end view

add:{
id:'add',
input:{data:[],tipe:table.tipe},
button:{data:[
{id:1,nama:"Insert",icon:"plus",url:"d.service.create()"},
{id:2,nama:"Cancel",icon:"x",url:"tutup()"},
]},
}, //end add

edit:{ id:'edit',
input:{data:[],tipe:table.tipe},
button:{data:[
{id:1,nama:"Update",icon:"pen",url:"d.service.update()"},
// {id:1,nama:"Delete",icon:"trush",url:"d.service.delete()"},
{id:2,nama:"Cancel",icon:"x",url:"tutup()"},
]},
}, //end edit



}, //end model

view:{
modal:function(arr){

out=`<div class="modal">
<div class="row modalbar">
<span class="kiri" >Modal</span>
<button class="kanan merah" onclick="tutup()">X</button>
</div>

<div class="row modalcontent">${arr}</div>
</div>`;

return out;
},

page:function(arr){out=``;
for(i in arr){out+=`<div id="${arr[i].nama}" class="${arr[i].css} ">${arr[i].isi} </div>`;}
return out;
},

grid:function(arr){var {data}=arr;
out=`<div class="gGrid">`;
for(i in data){var {css,nama,isi}=data[i];
out+=`<div class="${css}"> <span> ${isi}</span> </div>`;}
out+=`</div>`;
return out;
var {css,nama,isi}=arr;
out=`<div id="${arr.nama}" class="${arr.css} ">${arr.isi} </div>`;
return out;
},

div:function(arr){
const node = arr.filter(e => e.induk === id);
out=``;
for (i in node) {nod=node[i];
if(nod.induk!=nod.nama){
out+=`<div id="${nod.nama}" class="${nod.css}"> ${nod.isi} ${this.div(nod.nama)}</div>`;}
inc.push(nod.nama);
}
log(inc)
return out;
},

menu:function(arr){
var{data}=arr;
out=`<ul class="${css.ul}">`;
for(i in data){
out+=`<li class="${css.li}">
<a class="${css.a}" onclick="d.service.read('${data[i].url}')"> ${svg.icon(data[i].icon)} ${data[i].nama}</a>
</li>`;}
out+=`</ul>`;
return out;
},

datatable:function(arr){

out=`<div class="${css.search}">
<select class="input" onChange="d.controller.rpp(this.value);"><option>5</option><option>10</option> <option>50</option></select>
<input id="search" class="input" type="text" onkeyup="d.controller.search()">

<div class="kebab-container">
        <button class="kebab-button" onclick="toggleMenu(this)">
            ⋮
        </button>

        <div class="kebab-menu">
            <a href="#" class="menu-item">Download</a>
            <a href="#" class="menu-item">Upload</a>
            <a href="#" class="menu-item delete-action">Delete</a>
        </div>
    </div>
</div>
<div id="table" class="gTable">${this.table(arr)}</div>
<div id="paging" class="gpaging">${this.paging(arr)}</div>
`;
return out;
},

table:function(arr){
var{page,rpp,data}=arr;
var al=data.length;
var np=Math.ceil(al / rpp);
out=`<table class="${css.table}">`;
out+=`<thead><tr><th><input type="checkbox" onclick=d.service.CheckAll(this) ></th><th>Aksi</th>`;
for(i in data[0]){out+=`<th scope="col">${i}</th>`;}
out+=`</tr></thead>
<tbody>`;

for (var key=(page-1) * rpp; key < (page * rpp) && key < al; key++) {col=data[key];
out+=`<tr>`;
out+=`<td> <input type="checkbox" name="cb[]" value="${table.data[key].id}"> </td>`;
out+=`<td> ${d.view.aksi(key)} </td>`;

for(i in col){str=col[i];

if(str.length>12){str=str.substring(0, 12) + ' ...'}
out+=`<td data-title="${i}">&nbsp; ${str} </td>`;}
out+=`</tr>`;
}
out+=`</tbody>
</table>`;
return out;
},

aksi:function(i){
return `
<button data-action="Edit" class="${css.button}" onclick="d.controller.edit(${i})"> ${svg.icon('pen')} <span>Edit</span></button>
`;
},



input:function(arr){var {data,tipe}=arr;


function input(tipe,data,id) {

  log(arr);

var inp=``, hide=``, label=``,bintang ='',info ='';

log(tipe);
if(tipe.length>0) {
const nod = tipe.find(e => e.id === id);

if (nod && nod.nama === "hidden") {hide =`hide`;}
if (nod && nod.nama === "label") {label =`label`;}

if (nod && nod.info !== "" && typeof nod.info !== "undefined") { info=nod.info;}
if (nod && nod.perlu === "1") { bintang ='*'; }

inp = `<input id="${id}" class="${css.input} ${hide}" type="text" aria-label="${id}" value="${data[id]}" placeholder="" name="${id}" >`;

if (nod && nod.nama === "password") {
inp = `<input id="${id}" class="${css.input}" type="password" aria-label="${id}" value="${data[id]}" placeholder="" name="${id}" >`;
}

else if (nod && nod.nama === "textarea") {
inp = `<textarea class="${css.input}" onInput="this.parentNode.dataset.replicatedValue = this.value" class="did-floating-input" aria-label="${i}" name="${i}" id="${i}" placeholder=" ">${data[i]}</textarea>`;
}

else if (nod && nod.nama === "option") {
text=nod.arr;
arr=text.split(",");
inp = `<select class="${css.input}" data-nama="${nod.nama}" class="did-floating-select" id="${id}" name="${id}" onchange="this.setAttribute('value', this.value);" onclick="this.setAttribute('value', this.value);">`;
inp += `<option value="" ></option>`;
for (let i in arr) {
if(data[id]==arr[i]){sel='selected';} else{sel='';}
inp += `<option value="${arr[i]}" ${sel} >${arr[i]}</option>`;
}
inp += `</select>`;
}

}

else {inp = `<input id="${id}" class="${css.input} ${hide}" type="text" aria-label="${id}" value="${data[id]}" placeholder="" name="${id}" >`;}

tooltip=function(id){
nod = tipe.find(e => e.id === id);
if (nod && nod.info) {d.info(nod.info)}
}

out=`<div class="col-1-2 ${hide} ${label}">
<div class="${css.gInput}" onClick="tooltip('${id}')" >
${inp}
<label class="${css.label}">${i} ${bintang} </label>
<div class="row">${info} </div>

</div></div>`;
return out;
}

out=`<form id="form" class="${css.form}">`;
for(i in data){out+=input(tipe,data,i);}
out+=`</form>`;
return out;
},

button:function(arr){var {data}=arr;

out=`<div class="${css.gButton}">`;
for(i in data){var {icon,url,nama}=data[i];
out+=`<button data-action="${nama}" class="${css.button}" onclick="${url}"> ${svg.icon(icon)} ${nama}</button>`;}
out+=`</div>`;
return out;
},

paging:function(arr){var {data,page}=arr;
rpp=d.model.table.rpp;
al=data.length;
np=Math.ceil(al / rpp);

if (page < 1) page=1;
if (page > np) page=np;
p='show';n='show';
if (page==1) {p='hide';n='show';}
if (page==np) {p='show';n='hide';}
if (al < rpp) {p='hide'; n='hide';}

out=`<div class="gPaging">
<button class="button ${p} " onclick="d.controller.paging(-1)" >Prev </button>
<button class="button ${n}" onclick="d.controller.paging(1)" >Next </button>
<span>page: ${page}/${np} data:${al} row(s) </span></div>
`;
return out;
},

pie:function(arr){var {data}=arr;
step=data.length;
color=d.color(step);
sdo=25;
s0=0;
s1=step*100;
out=`
<svg class="pie img" width="100" height="100%" viewBox="0 0 42 42">
<circle class="pie-hole" cx="21" cy="21" r="15.91549430918954" fill="#fff"></circle>`;
for(i in data){val=data[i].isi;
val1=parseInt(100-val);
s0+=val;
out+=`
<circle id="" cx="21" cy="21" r="15.91549430918954"
fill="transparent"
stroke="${color[i]}"
stroke-width="3"
stroke-dasharray="${val} ${val1}"
stroke-dashoffset="${sdo}">
</circle>`;
sdo+=parseInt(-val);
}

s2=parseInt((s0/s1)*100);
out+=`<g class="chart-text">
<text x="50%" y="50%" class="chart-number" id="totalValue">${s2}%</text>
<text x="50%" y="50%" class="chart-label">Total</text></g>
</svg>
`;
return out;
},

progress:function(arr){var {data}=arr;
let step=data.length;
color=d.color(step);
out=``;
for(i in data){val=data[i].isi;nama=data[i].nama;
out+=`<div class="progress-bar-linear">
<p class="progress-bar-text">${nama}
<span class="float_right">${val}% </span>
</p>
<div class="progress-bar">
<span data-percent="80" style="background:${color[i]}; width:${val}%;"></span>
</div>
</div>`;
}
return out;
},

icons:function(arr){var {data}=arr;
out=`<div class="${css.gIcons}">`;
for(i in data){nama=data[i]
out+=`<div class="${css.icons}"> ${svg.icon(nama)} <span>${nama}</span> </div>`;}
out+=`</div>`;
return out;
},

card:function(arr){var {data}=arr;
step=data.length;
// color=d.color(step);
if(step<1) color[0]='red';
// <div class="ag" style="background:${color[i]}" > ${svg.icon(icon)}
out=``;

if (step>4){step=4;}
for(i in data){var {nama,isi,icon,url}=data[i];
out+=`<div class="col-1-${step} card" onclick="${url}" >
<div class="ag"> ${svg.icon(icon)}
<div class="ag-menu" >
<div class="ag-title">${nama}</div>
<div class="ag-desc">${isi} </div>
</div>
</div>
</div>`;
}
return out;
},

view:function(arr){
out=`<div class="row shadow">
<div class="row modalbar header"><span class="kiri" >${modul}</span></div>

<div class="row"> ${this.button(arr.button)} </div>
<div class="row"> ${this.datatable(arr.datatable)} </div>
<div id="ext"></div>
</div>`;
return out;
},

add:function(arr){
  log(arr)
out=`<div class=""> ${this.input(arr.input)} </div>
<div class=""> ${this.button(arr.button)} </div>`;
return out;
},

edit:function(arr){ //view.edit
  log(arr)

// d.modal(JSON.stringify(arr))
out=`
<div id="ext"></div>
<div class=""> ${this.input(arr.input)} </div>
<div class=""> ${this.button(arr.button)} </div>
`;
return out;
},

// delete:function(arr){
//
// log(arr);
// return `<div class="info">Are you sure you want to delete the data?
// </div >
// <div class="btns tengah">
// <button onClick="ya();" >${svg.icon('check')} Yes</button>
// <button onClick="tutup();" >${svg.icon('x')} No</button> </div>
// `;
//
// },



}, //end view

controller:{
menu:function(){var {menu}=d.model; d.gebi('menu-left').innerHTML=d.view.menu(menu);},
page:function(){var {page}=d.model; d.gebi('content').innerHTML=d.view.page(page);},
datatable:function(){var {datatable}=d.model; d.gebi('datatable').innerHTML=d.view.datatable(datatable);},
input:function(){var {input}=d.model; d.gebi('input').innerHTML=d.view.input(input);},
button:function(){var {button}=d.model; d.gebi('button').innerHTML=d.view.button(button);},
table:function(){var {table}=d.model; d.gebi('table').innerHTML=d.view.table(table);},
open:function(){},
close:function(){d.controller.mod(d.model.page.nama);},
el:function(id){frm=d.gebi(id); obj={};
for (var i=0; i < frm.elements.length; i++) {e=frm.elements[i]; obj[e['name']]=e['value'];}
return obj;
},

paging:function(i){ var {page,rpp,data}=table;
  log(table)
page=parseInt(page+i);
table.page=page;
table.data=data;
table.rpp=rpp;

d.gebi('table').innerHTML=d.view.table(table);
d.gebi('paging').innerHTML=d.view.paging(table);
},

rpp:function(i){
table.rpp=i;
d.controller.table();
},

view:function(){
  d.gebi('content').innerHTML=d.view.view(d.model.view);
// d.modal(x)
},

add:function(){
d.model.add.input.data=table.data[0];
d.modal(d.view.edit(d.model['add']));
},

edit:function(i){ //controller.edit
  // d.model.edit.input.data=table.data[i];
  // d.model.edit.input.tipe=table.tipe;

  d.model.edit.input.data=table.data[i];

  log(d.model['edit'])
  log(table.tipe)


  // d.modal(d.view.edit(d.model['edit']));
  d.modal(d.view.edit(d.model['edit']));
  log(table.data[i])
  // d.modal("edit");

},


// delete:function(){
// d.modal(d.view.delete('delete'));
// ya=function(){
// d.service.param.mod="delete";d.service.get(callback); function callback(json){d.service.read()}
// tutup();
// }
// },

print:function(){window.print();},
color:function(){arr=d.model.color.data; for (i in arr){d.setcss(arr[i].id, arr[i].isi);}},
callback:function(arr){d.modal(arr)},

search:function(){ var {id,data}=table;
var y=d.gebi('search').value;
var res=d.controller.partsearch(data, y);

arr={data:res,page:table.page,rpp:table.rpp}
d.gebi('table').innerHTML=d.view.table(arr);
},

// d.controller.table();
partsearch:function(arr, y) {
return arr.filter(function (item) {
return Object.values(item).map(function (value) {
return String(value).toLowerCase();
}).find(function (value) { var r=y.toLowerCase();
return value.includes(r);
});
});
},

}, //end controller

service:{
host:'http://localhost/donat/api/index.php',
param:{t:'master_users', mod:'login',nama:'users'},
callback:function(json){},

req:function(param,callback){
var {host}=d.service;
// alert(host)
apiKey='bismillah';
var req=new XMLHttpRequest();
req.open("POST", host, true);
req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// req.setRequestHeader('Authorization', `Bearer ${apiKey}`);
req.onreadystatechange=function(){
if(req.readyState==4 && req.status==200){callback(req.responseText);}}
req.responseType="text";
req.onprogress=function(e){if(e.lengthComputable){}};
req.onloadstart=function(e){};
req.onloadend=function(e){};
req.send(JSON.stringify(param));
}, //end reg

get:function(callback){var {t,mod,nama}=this.param;
param={t:t,mod:mod,nama:nama};
// if(mod!=='table'){
// frm=d.controller.el('form'); id=frm.id;

if(mod=='create'){
  frm=d.controller.el('form');
  delete frm['id'];
  param={t:t,mod:mod,data:frm,id:id};
}

if(mod=='update'){
  frm=d.controller.el('form');
  id=frm.id;
  param={t:t,mod:mod,data:frm,id:id};
}

if(mod=='delete'){
  // frm=d.controller.el('form'); id=frm.id;
  // param={t:t,mod:mod,data:frm,id:id};
  id=d.model.id;
  param={t:t,mod:mod,id:id};
}

this.req(param,callback1);
function callback1(json){callback(json);}
}, // end get

set:function(callback){var {t,mod,nama}=this.param;
param={t:t,mod:mod,nama:nama};

if(mod=='create'){delete frm['id'];}
param={t:t,mod:mod,data:frm,id:id};

this.req(param,callback1);
function callback1(json){callback(json);}
}, // end get

menu:function(id){p=id.split('/');
this.param.nama=p[0];
this.read();
},

create:function(){
this.param.mod="create";
this.get(callback);function callback(json){
d.close('modal');
d.url(modul);
}
},

read:function(){
this.param.mod="table";
this.get(callback);
function callback(json){
res=JSON.parse(json);
data=res.data;
d.service.param.t=res.tb;
d.model.datatable.data=res.data;
// d.controller[p[1]]();
d.controller.view();
// cari=res.tipe;

// d.model.edit.input.tipe=JSON.parse(cari);

// d.model.edit.input.tipe=[
// {id:"status",nama:"option",arr:'1,2'},
// {id:"isi",nama:"textarea",arr:'1,2'},
// ];

}
},

update:function(){
  this.param.mod="update";
  this.get(callback);
  function callback(json){
    res=JSON.parse(json)
    // this.read()
log(res)
  }
},


CheckAll:function(el) {
var c=document.getElementsByName('cb[]');
for (var i=0;i<c.length;i++) c[i].checked = el.checked? true:false ;
},


cobadelete:function(i){
log('coba delete')

var c = document.getElementsByName('cb[]'); // ← perbaiki di sini
  var data = [];
  for (var i = 0; i < c.length; i++) {
    if (c[i].checked) data.push(c[i].value);
  }
  var joined = data.join(',');
  console.log('terpilih:', joined);
  return joined;

},

  delete:function(i){

  var c = document.getElementsByName('cb[]');
  var data = [];
  for (var i = 0; i < c.length; i++) { if (c[i].checked) data.push(c[i].value); }
  var joined = data.join(',');


out=`<div class="info">Are you sure you want to delete the data? ${joined}
</div >
<div class="btns tengah">
<button onClick="ya();" >${svg.icon('check')} Oke</button>
<button onClick="tutup();" >${svg.icon('x')} Cancel</button> </div>
`;

d.modal(out);
ya=function(){

  d.service.param.mod="delete";
  // d.service.param.id=joined;
  d.model.id=joined;


d.service.get(callback);
function callback(json){
  // d.service.read()
  res=JSON.parse(json);
log(res)
  d.url(modul);


}
tutup();

}

// d.service.param.mod="delete";
// d.service.get(callback);
// function callback(json){
//   d.close('modal');
//   d.url(modul);
// }

},
}, //end service

};

var {css}=d.model;
