var menus={
model:{
host:'http://localhost/donat/api/master/menu.php',
table:{id:'menus',data:[
  {id:1,nama:"menu1",isi:1},
  {id:2,nama:"menu2",isi:2},
]},},

controller:{
view:function(){
d.service.host=menus.model.host;
d.service.param={t:'master_menu', mod:'table',nama:'users'};
d.service.get(callback);
function callback(json){ res=JSON.parse(json);
table.data=res.data;
d.controller.view()
}

},
},

};
