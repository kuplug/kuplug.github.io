var materi={
menu:function(){
data=JSON.parse(d.getls('data'));
d.model.profile.card.data=data.menu;
arr=d.model.profile;
d.gebi('content').innerHTML=menu.view.menu(arr);
},

model:{
role:'tutor',
table:{id:'menu',data:[
{id:1,induk:0,nama:"Pemrograman Web",keterangan:"Informatika",isi:1,icon:"code",url:"kursus.controller.menu(1)"},
{id:2,induk:1,nama:"Modul 1: RPS",keterangan:"pembelajaran 1",isi:1,icon:"eye",url:"kursus.controller.video('WpW36ldAqnM')"},
{id:2,induk:1,nama:"Modul 2: Pengantar Perograman Web ",keterangan:"pembelajaran 1",isi:1,icon:"eye",url:"kursus.controller.video('IYGG55qwQZQ')"},
{id:2,induk:1,nama:"Modul 3:",keterangan:"pembelajaran 1",isi:1,icon:"eye",url:"kursus.controller.video('pAsmrKyMqaA')"},
{id:3,induk:1,nama:"Modul 4:",isi:2,icon:"eye",url:"pdf('pdf01.pdf')"},
{id:3,induk:1,nama:"Modul 5:",isi:2,icon:"eye",url:"kursus.controller.pdf('pdf02.pdf')"},
{id:3,induk:1,nama:"Modul 6:",isi:2,icon:"eye",url:"kursus.controller.pdf('pdf03.pdf')"},
{id:3,induk:1,nama:"Modul 7:",isi:2,icon:"eye",url:"kursus.controller.pdf('pdf04.pdf')"},
{id:3,induk:1,nama:"Modul 8:",isi:2,icon:"eye",url:"kursus.controller.pdf('pdf05.pdf')"},
{id:3,induk:1,nama:"Modul 9:",isi:2,icon:"eye",url:"kursus.controller.pdf('pdf06.pdf')"},
{id:3,induk:1,nama:"Modul 10:",isi:2,icon:"eye",url:"kursus.controller.pdf('pdf07.pdf')"},
{id:3,induk:1,nama:"Modul 11:",isi:2,icon:"eye",url:"kursus.controller.pdf('pdf08.pdf')"},
{id:3,induk:1,nama:"Modul 12:",isi:2,icon:"eye",url:"kursus.controller.pdf('pdf09.pdf')"},
{id:3,induk:1,nama:"Modul 13:",isi:2,icon:"eye",url:"kursus.controller.pdf('pdf10.pdf')"},
{id:3,induk:1,nama:"Modul 14:",isi:2,icon:"eye",url:"kursus.controller.pdf('pdf10.pdf')"},

{id:4,induk:1,nama:"Kuis",isi:2,icon:"eye",url:"kuis.controller('kuis-web')"},
{id:4,induk:1,nama:"Sertifikat",isi:2,icon:"eye",url:"sertifikat.controller('kuis-web')"},



{id:5,induk:0,nama:"Software Proses",keterangan:"Informatika",isi:1,icon:"setting",url:"menu.controller.menu(1)"},
{id:6,induk:5,nama:"Video",isi:1,icon:"house",url:"kursus.controller.video('video-mobile')"},
{id:7,induk:5,nama:"PDF",isi:2,icon:"menu",url:"kursus.controller.pdf('pdf-mobile')"},
{id:8,induk:5,nama:"Kuis",isi:2,icon:"menu",url:"kursus.controller.kuis('kui-mobile')"},
{id:8,induk:5,nama:"Sertifikat",isi:2,icon:"menu",url:"kursus.controller.sertifikat('kui-mobile')"},

{id:5,induk:0,nama:"Wireless & Mobile Computing",keterangan:"Informatika",isi:1,icon:"setting",url:"menu.controller.menu(1)"},
{id:6,induk:5,nama:"Video",isi:1,icon:"house",url:"kursus.controller.video('video-mobile')"},
{id:7,induk:5,nama:"PDF",isi:2,icon:"menu",url:"kursus.controller.pdf('pdf-mobile')"},
{id:8,induk:5,nama:"Kuis",isi:2,icon:"menu",url:"kursus.controller.kuis('kui-mobile')"},
{id:8,induk:5,nama:"Sertifikat",isi:2,icon:"menu",url:"kursus.controller.sertifikat('kui-mobile')"},

{id:9,induk:0,nama:"Aplikasi Komputer",keterangan:"Informatika",isi:1,icon:"setting",url:"menu.controller.menu(1)"},
{id:10,induk:9,nama:"Video",isi:1,icon:"house",url:"kursus.controller.video('video-desain')"},
{id:11,induk:9,nama:"PDF",isi:2,icon:"menu",url:"kursus.controller.pdf('pdf-desain')"},
{id:12,induk:9,nama:"Kuis",isi:2,icon:"menu",url:"kursus.controller.kuis('kuis-desain')"},
{id:12,induk:9,nama:"Sertifikat",isi:2,icon:"menu",url:"kursus.controller.sertifikat('kuis-desain')"},

{id:9,induk:0,nama:"Pemrograman Berorientasi Objek",keterangan:"Informatika",isi:1,icon:"setting",url:"menu.controller.menu(1)"},
{id:10,induk:9,nama:"Video",isi:1,icon:"house",url:"kursus.controller.video('video-desain')"},
{id:11,induk:9,nama:"PDF",isi:2,icon:"menu",url:"kursus.controller.pdf('pdf-desain')"},
{id:12,induk:9,nama:"Kuis",isi:2,icon:"menu",url:"kursus.controller.kuis('kuis-desain')"},
{id:12,induk:9,nama:"Sertifikat",isi:2,icon:"menu",url:"kursus.controller.sertifikat('kuis-desain')"},



]},
},


view:{
menu:function(arr){
out=`
<div class="row shadow">
<div id="card" class="col-1-1">  ${d.view.card(arr)}
</div>
</div>`;
return out;``
},


},
controller:{

  view:function(){
    d.service.host=kursus.model.host;
    d.service.param={t:'materi', mod:'table',nama:'users'};
    d.service.get(callback);
    function callback(json){
    res=JSON.parse(json);
    table.data=res.data;
    log(res.data)
    // table.data=materi.model.table.data;
    d.controller.view()
    }
  },

menu:function(i){ // data=JSON.parse(d.getls('data'));
  // d.close('parallax-container');
  // d.close('parallax');
  // d.close('menu');
  // d.gebi('parallax-container').style="display:mone";
  // alert('s')

// data=kursus.model.table.data;
// const node = data.filter(e => e.induk == i);
// arr={}
// arr.data=node;
// d.gebi('content').innerHTML=kursus.view.menu(arr);


d.service.host="http://localhost/donat/api/lms/index.php";
d.service.param={t:'lms_materi', mod:'table',nama:'users'};
d.service.get(callback);
function callback(json){
res=JSON.parse(json);
// table.data=res.data;
log(res.data)
// table.data=materi.model.table.data;
// d.controller.view()
data=res.data;
const node = data.filter(e => e.induk == i);
arr={}
arr.data=node;
d.gebi('content').innerHTML=kursus.view.menu(arr);

}




},

video:function(vid){
  openVideo(vid);
},

},


};
