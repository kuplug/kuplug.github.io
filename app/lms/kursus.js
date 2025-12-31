var kursus={

model:{
host:'http://localhost/donat/api/lms/lms.php',
role:'tutor',
table:{id:'menu',data:[
{id:1,induk:0,nama:"Pemrograman Web",isi:1,icon:"code",url:"kursus.controller.menu(1)"},
{id:2,induk:1,nama:"Modul 01",isi:1,icon:"eye",url:"kursus.controller.video('WpW36ldAqnM')"},
{id:3,induk:1,nama:"Modul 02",isi:2,icon:"eye",url:"pdf('pdf01.pdf')"},
{id:4,induk:1,nama:"Kuis",isi:2,icon:"eye",url:"kuis.controller('kuis-web')"},
{id:5,induk:1,nama:"Sertifikat",isi:2,icon:"eye",url:"sertifikat.controller('kuis-web')"},
]},
},

view:{
menu:function(arr){
out=`
<div class="row shadow">
<div id="card" class="col-1-1">  ${d.view.card(arr)}
</div>
</div>`;
return out;
},

kursus:function(arr){ var {data}=arr;
idpeserta=1;

step=data.length;
out=`<div class="row shadow"><div id="card" class="col-1-1">`;

if (step>4){step=4;}
for(i in data){var {id_kursus,kursus,progress_kursus,status,icon,url}=data[i];
out+=`<div class="col-1-${step}"  >
<div class="ag"> ${svg.icon(icon)}
<div class="ag-menu" >
<div class="ag-title">${id_kursus} ${kursus}</div>
<div class="ag-desc">
<input type="button" onclick="kursus.controller.materi(${id_kursus})" value="${status}" >
</div>
</div>
</div>
</div>`;
}
out+=`</div></div>`;
return out;
},

materi:function(arr){ var {kursus,progress_kursus}=arr.kursus[0];
nah=arr.kursus
log(nah)
// res=JSON.parse(json);

out=`<div class="row shadow">
<div id="card" class="col-1-1">

<div class="col-1-1" >
<div class="ag"> ${svg.icon('buku')}
<div class="ag-menu" >
<input type="button" onclick="kursus.controller.menu(0)" value="Learn" >
<input type="button" onclick="kursus.controller.sertifikat(nah)" value="Download Sertifikat" >

<div class="ag-title">${kursus}</div>
<div class="ag-desc">

<div class="progress-bar-linear">
<p class="progress-bar-text">Progress <span class="float_right">${progress_kursus}% </span></p>
<div class="progress-bar">
<span data-percent="80" style="background:hsl(213,100%,37%); width:${progress_kursus}%;"></span>
</div>
</div>

</div>
</div>
</div>
</div>
`;

step=arr.modul.length;
if (step>4){step=4;}
for(i in arr.modul){var {modul,status_modul,id_modul,icon,url}=arr.modul[i];

out+=`
<div class="col-1-${step}" >
<div class="ag"> ${svg.icon(icon)}
<div class="ag-menu" >
<div class="ag-title">${modul}</div>
<div class="ag-desc">
<input type="button" onclick="kursus.controller.baca(${id_modul},${url})" value="${status_modul}" >
</div>
</div>
</div>
</div>`;
}
out+=`</div>
</div>`;
return out;
},

},

controller:{
  view:function(){
    d.service.host=kursus.model.host;
    d.service.param={t:'kursus', mod:'table',nama:'users'};
    d.service.get(callback);
    function callback(json){
    res=JSON.parse(json);
    table.data=res.data;
    log(res.data)
    // table.data=materi.model.table.data;
    d.controller.view()
    }
  },


daftar: async function(idpeserta,idkursus,func){
await kursus.controller.didaftar(idpeserta,idkursus);
},

baca: async function(i, func){
await kursus.controller.dibaca(i);
},

nilai: async function(arr,func){
await kursus.controller.dinilai(arr);
},

didaftar:function(idpeserta,idkursus){
d.service.host=kursus.model.host;
d.service.param={t:'view_kursus', mod:'daftarKursus',nama:{namas:Number(idkursus),namap:Number(idpeserta)}};
d.service.get(callback);
function callback(json){res=JSON.parse(json);}
},

dibaca:function(i){
d.service.host=kursus.model.host;
d.service.param={t:'view_kursus', mod:'dibaca',nama:i};
d.service.get(callback);
function callback(json){res=JSON.parse(json);}
},

dinilai:function(arr){
arr['idp']=1;
arr['idk']=1;
d.service.host=kursus.model.host;
d.service.param={t:'view_kursus', mod:'nilai',nama:arr};
d.service.get(callback);
function callback(json){res=JSON.parse(json);

alert(arr['nilai'])

}

},



menu:function(i){
d.service.host=kursus.model.host;
d.service.param={t:'view_kursus', mod:'view_kursus',nama:'1'};
d.service.get(callback);
function callback(json){
res=JSON.parse(json);
log(res)
data=res.data;
// const node = data
// .filter(e => e.induk == i)
// .sort((a, b) => a.id - b.id);
arr={}
// arr.data=node;
arr.data=data;
d.gebi('content').innerHTML=kursus.view.kursus(arr);
}
},





materi:function(idk){
// idk=1;
d.service.host=kursus.model.host;
d.service.param={mod:'view_peserta_modul',nama:idk};
d.service.get(callback);
function callback(json){
res=JSON.parse(json);
d.gebi('content').innerHTML=kursus.view.materi(res);
}
},


video:function(vid){
var vid=mp4.view();
d.modal(vid)
mp4.controller();

document.querySelectorAll('.modalcontent').forEach(el => {
  if (el.querySelector('.player')) {
    el.classList.add('has-player');
  }
});

},



presensi:function(idk){
idk=1;
d.service.host=kursus.model.host;
d.service.param={mod:'view_peserta_modul',nama:idk};
d.service.get(callback);
function callback(json){
res=JSON.parse(json);
d.gebi('content').innerHTML=kursus.view.materi(res);
}
},

ujian:function(idk){
idk=1;
d.gebi('content').innerHTML='ujian';
},

sertifikat:function(arr){
  log(arr)
// arr2={nama:'Wawan Sismadi',kursus:'PBO',tanggal:'08 Sep 2025',sertifikat:'202509080101'}
// sertifikat.controller(arr);
d.gebi('content').innerHTML='sertifikat';

},


},

};
