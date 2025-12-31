
var home={
model:{
host:'http://localhost/donat/api/lms/index.php',
table:{id:'profile',data:[
{id:1,induk:0,nama:"admin",email:'sa',pin:"123",akses:"sa"},
{id:2,induk:0,nama:"user",email:'user',pin:"123",akses:"user"},
]},
data:{email:'sa',pin:'123'},


card:{id:"card", data:[
{id:1,nama:"Pesan",isi:"2",icon:"envelope",url:"d.url('pesan');"},
{id:2,nama:"Setting",isi:"2",icon:"setting",url:"d.url('setting');"},
{id:3,nama:"Param",isi:"2",icon:"lock",url:"param.controller.view()"},
]},

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
{id:3,nama:"Param",isi:"2",icon:"lock",url:"param.controller.view()"},
]},
}, //end profile


}, //end model

view:{

  home:function(arr){

    nah=arr.card
    log(nah)
    st=nah.data;

    step=st.length;

    // st=nah.data[1].id;


    log(st);
    // <img class="img" src='bg.png'>
    out=`



<div class="row shadow">
<img src="bg.png" class="img">
</div>

    <div class="row shadow">
    <div id="card" class="col-1-1">`;

    if (step>4){step=4;}
    for(i in st){
   var {id,nama}=st[i];

      // log(data.id)

    out+=`<div class="col-1-${step}"  >
    <div class="ag">
    <div class="ag-menu" >
    <div class="ag-title">${id}</div>
    <div class="ag-desc">${nama} </div>
    </div>
    </div>
    </div>`;
    }
    out+=`</div></div>`;
    return out;

  },


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
home:function(){
  d.gebi('content').innerHTML=home.view.home(home.model);
},

profile:function(){
// http://localhost/donat/api/lms/?mod=view_peserta_kursus&nama=wawan
d.gebi('content').innerHTML=home.view.home();


},
}, //end controller

}; // end login
