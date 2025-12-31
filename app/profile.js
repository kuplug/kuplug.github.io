
var profile={
model:{
host:'http://localhost/donat/api/lms/index.php',
table:{id:'profile',data:[
{id:1,induk:0,nama:"admin",email:'sa',pin:"123",akses:"sa"},
{id:2,induk:0,nama:"user",email:'user',pin:"123",akses:"user"},
]},
data:{email:'sa',pin:'123'},

profile:{
id:'profile',
avatar:['man',2],
username:'Wawan',
input:{data:{email:'',pin:''},tipe:[ {id:"pin",nama:"password",arr:'1,2'},],},
button:{data:[
{id:1,nama:"Signout",icon:"person",url:"login.controller.signout()"},
{id:1,nama:"Update",icon:"pen",url:"profile.controller.signin()"},
]},
card:{id:"card", data:[
{id:1,nama:"Pesan",isi:"2",icon:"envelope",url:"d.url('pesan');"},
{id:2,nama:"Setting",isi:"2",icon:"setting",url:"d.url('setting');"},
{id:3,nama:"Param",isi:"2",icon:"lock",url:"d.url('params');"},
// {id:3,nama:"Param",isi:"2",icon:"lock",url:"param.controller.view()"},
]},
}, //end profile
}, //end model

view:{
profile:function(arr){
avt=avatar.view.svg(avatar.view.man(avatar.model.man[2]));
out=`
<div id="profile" class="row shadow">
<div id="profile" class="col-1-3">
<div id="avt" class="user-avatar img"> ${avt} </div>
<span class="username" >Welcome, ${arr.username}</span>
<div class=""> ${d.view.input(arr.input)} </div>
<div class=""> ${d.view.button(arr.button)} </div>
</div>
<div id="card" class="col-2-3"> ${d.view.card(arr.card)} </div>
</div>

<div id="kursus" class="row shadow">  </div>
`;
return out;

},

kursus:function(arr){
log(arr)
step=arr.length;
out=`<div class="row shadow"><div id="card" class="col-1-1">`;

if (step>4){step=4;}
for(i in arr){var {id_kursus,kursus,progress_kursus,status,icon,url}=arr[i];
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
}, //end view

controller:{

  view:function(i){
      data=d.getls('data');
      if(data) { this.profile(i);  }
      else { login.controller.signform(1); }
  },


profile:function(){
// http://localhost/donat/api/lms/?mod=view_peserta_kursus&nama=wawan
d.gebi('content').innerHTML=profile.view.profile(profile.model.profile);

const u = getUrlParam("u");
if (u) {

d.service.host=profile.model.host;
d.service.param={t:'view_peserta_kursus', mod:'view_peserta_kursus',nama:u};
d.service.get(callback);
function callback(json){res=JSON.parse(json);

arr=res.data;
profile.model.profile.username=u;
d.gebi('kursus').innerHTML=profile.view.kursus(arr);
}
}
},
}, //end controller

}; // end login
