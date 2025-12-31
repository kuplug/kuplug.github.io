var setting={
model:{
  host:'http://localhost/donat/api/master/setting.php',
table:{id:'setting',data:[
  {id:1,nama:"setting1",isi:1},
  {id:2,nama:"setting2",isi:2},
]},},

controller:{
view:function(){
  d.service.host=setting.model.host;

  d.service.param={t:'master_settings', mod:'table',nama:'users'};
  d.service.get(callback);
  function callback(json){ res=JSON.parse(json);
  table.data=res.data;
  d.controller.view()
  }

  },
},




};
