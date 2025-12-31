var akses={
model:{
host:'http://localhost/donat/api/master/akses.php',
table:{id:'akses',data:[
  {id:1,nama:"akses1",isi:1},
  {id:2,nama:"akses2",isi:2},
]},},

controller:{
view:function(){
  d.service.host=akses.model.host;
  d.service.param={t:'master_akses', mod:'table',nama:'users'};
  d.service.get(callback);
  function callback(json){
  res=JSON.parse(json);
  table.data=res.data;
  // table.data=materi.model.table.data;
  d.controller.view()
  }
  },
},
};
