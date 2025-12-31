var pesan={
model:{
  host:'http://localhost/donat/api/master/pesan.php',
table:{id:'pesan',data:[
  {id:1,nama:"pesan1",isi:1},
  {id:2,nama:"pesan2",isi:2},
]},},

controller:{
view:function(){
  d.service.host=pesan.model.host;

  d.service.param={t:'master_pesan', mod:'table',nama:'users'};
  d.service.get(callback);
  function callback(json){ res=JSON.parse(json);
  table.data=res.data;
  log(res)

  d.controller.view()
  }

  },
},




};
