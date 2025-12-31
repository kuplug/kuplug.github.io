
var presensi={
model:{
  table:{id:'peserta',data:[
  {id:1,induk:0,nama:"peserta1",isi:1,icon:"setting",url:"menu.controller.menu(1)"},
  {id:2,induk:1,nama:"peserta2",isi:1,icon:"house",url:"d.url('dashboard')"},

  ]},
},

controller:{
  view:function(){
    log('presensi')
    d.service.host="http://localhost/donat/api/lms/presensi.php";
    d.service.param={t:'presensi', mod:'table',nama:'users'};
    d.service.get(callback);
    function callback(json){
    res=JSON.parse(json);
    table.data=res.data;
    log(res.data)
    // table.data=materi.model.table.data;
    d.controller.view()
    }
  },

},


}; // end menu
