var login={
model:{
  // host:'http://localhost/donat/api/master/index.php',
  host:'http://localhost/donat/api/master/login.php',

data:{email:'sa',pin:'123'},

signform:{
id:'signin',
input:{data:{email:'',pin:''},
tipe:[ {id:"pin",nama:"password",arr:'1,2'},],},

button:{data:[
{id:1,nama:"Signin",icon:"person",url:"login.controller.signin()"},
]},},

regform:{
id:'regform',
input:{
data:{email:'',pin:''},
tipe:[ {id:"pin",nama:"password",arr:'1,2'},],},
button:{data:[
{id:1,nama:"Signup",icon:"person",url:"login.controller.signup()"},
]},},

}, //end model

view:{
signform:function(arr){
return `
<div id="login" class="show row login">
<div class="shadow" style="max-width:400px; padding: 20px auto; margin: 0  auto;">
<h1>Login</h1>
<div class=""> ${d.view.input(arr.input)} </div>
<div class=""> ${d.view.button(arr.button)} </div></div></div>`;
},

regform:function(arr){
return `
<div id="login" class="show row login">
<div class="shadow" style="max-width:400px; padding: 20px auto; margin: 0  auto;">
<h1>Register</h1>
<div class=""> ${d.view.input(arr.input)} </div>
<div class=""> ${d.view.button(arr.button)} </div></div></div>`;
},

}, //end view

controller:{
signform:function(){
// d.close('menu');
d.gebi('main').classList.add("login");
d.gebi('content').innerHTML=login.view.signform(login.model.signform);
},

regform:function(){
// d.close('menu');
d.gebi('main').classList.add("login");
d.gebi('content').innerHTML=login.view.regform(login.model.regform);
},

login:function(){
data=d.getls('data');
if(data) {
// d.open('menu');
// d.gebi('main').classList.remove("login");
// d.gebi('topmenu').classList.add("hide");
dashboard.controller.dashboard(1);
}
else {
  // dashboard.controller.dashboard(1);
  home.controller.home(1);

// d.gebi('topmenu').classList.remove("hide");
// d.gebi('main').classList.add("login");
// d.close('menu');

// d.gebi('content').innerHTML=`Let's Code It` ;
// d.gebi('content').innerHTML = mp4.view();
// mp4.controller();

}

home.controller.home(1);



},

signin:function(){res=login.model.data;
email=d.gebi('email').value;
pin=d.gebi('pin').value;

d.service.host=login.model.host;
d.service.param={t:'view_kursus', mod:'signin',nama:{email:email,pin:pin}};
d.service.get(callback);


function callback(json){
res=JSON.parse(json);

log(res)

if (res.data && res.data.length > 0){ d.setls('data',res); login.controller.login();}
else { d.info('Login Gagal');}
}





},

signup:function(i){
email=d.gebi('email').value;
pin=d.gebi('pin').value;
d.service.host=login.model.host;
d.service.param={t:'view_kursus', mod:'signup',nama:{email:email,pin:pin}};
d.service.get(callback);
function callback(json){
res=JSON.parse(json);
log(res)
}
},

signout:function(){
d.remls('data');
this.login();

// d.close('menu');
// d.gebi('main').classList.add("login");
// d.gebi('topmenu').classList.remove("hide");
//
// d.gebi('content').innerHTML='siap';

},

}, //end controller

service:{
login:function(){data=d.getls('data');
if(data) {this.profile();} else { this.signform();}
},

signin:function(){   email=d.gebi('email').value;
pin=d.gebi('email').value;
param={mod:"login",data:{email:email,pin:pin}}
d.api.req(param,callback);
function callback(json){
// d.modal(json)

res=JSON.parse(json)

if (res.login.length>0){
d.setls('data',res);
d.login.login();
}
else {
d.info('Login Gagal')
}
// login.app.js.login();
}},

signout:function(){d.remls('data');this.login();},

signform:function(){
d.close('menu');
d.gebi('main').classList.add("login");
d.gebi('content').innerHTML=login.view.signform(login.model.signform);
},

}, //end service

}; // end login
