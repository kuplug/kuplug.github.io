var params={
model:{
  host:'http://localhost/donat/api/master/param.php',
table:{id:'params',data:[
  {id:1,nama:"param1",isi:1},
  {id:2,nama:"param2",isi:2},
]},},

controller:{
view:function(){
  d.service.host=params.model.host;

  d.service.param={t:'master_param', mod:'table',nama:'users'};
  d.service.get(callback);
  function callback(json){ res=JSON.parse(json);
    log(res.data);
    table.data=res.data;
    // table.data=params.model.table.data;
  d.controller.view()
  }

},
},

};
