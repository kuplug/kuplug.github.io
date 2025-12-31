var dashboards={
model:{
  host:'http://localhost/donat/api/master/dashboard.php',
table:{id:'dashboards',data:[
  {id:1,nama:"dashboard1s",isi:1},
  {id:2,nama:"dashboard2s",isi:2},
]},},

controller:{
view:function(){
  d.service.host=dashboards.model.host;

  d.service.param={t:'master_dashboard', mod:'table',nama:'users'};
  d.service.get(callback);
  function callback(json){ res=JSON.parse(json);
  table.data=res.data;
  d.controller.view()
  }

  },
},




};
