var dashboard={
model:{
  table:{id:'dashboard',data:[
  {id:1,induk:0,nama:"Master",isi:1,icon:"setting",url:"menu.controller.menu(1)"},
  {id:2,induk:1,nama:"Pesan",isi:10,icon:"envelope",url:"d.url('pesan')"},
  {id:3,induk:1,nama:"Menu",isi:20,icon:"menu",url:"d.url('menus')"},
  {id:4,induk:1,nama:"Users",isi:30,icon:"person",url:"d.url('users')"},
  {id:4,induk:1,nama:"Setting",isi:40,icon:"setting",url:"d.url('setting')"},
  ]},

},

view:{
dashboard:function(arr){
out=`
<div class="row shadow">
<div id="card" class="col-1-1">  ${d.view.card(arr)} </div>
</div>
<div class="row shadow">
<div id="progres" class="col-1-1">  ${d.view.progress(arr)} </div>
</div>
<div class="row shadow">
<div id="pie" class="col-1-1">  ${d.view.pie(arr)} </div>
</div>

`;
return out;

},
},

controller:{

view:function(i){
  data=d.getls('data');
  if(data) { this.dashboard(i);  }
  else { login.controller.signform(1); }
},

dashboard:function(i){ // data=JSON.parse(d.getls('data'));

  data=dashboard.model.table.data;
  const node = data.filter(e => e.induk == i);
  arr={}
  arr.data=node;
  d.gebi('content').innerHTML=dashboard.view.dashboard(arr);

},
}, // edn controller

service:{},

}; // end menu
