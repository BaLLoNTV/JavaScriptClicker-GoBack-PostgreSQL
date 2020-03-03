function openNav() {
  document.getElementById("mySidenav").style.width = "100%";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
var cusid_ele = document.getElementsByClassName('inputinsidenav');

setTimeout(function() {
	for (var i = 0; i < cusid_ele.length; ++i) {
    var item = cusid_ele[i];  
    item.value = '';
};}, 500);
}

function GetLoginMenu() {
  document.getElementById("singup").style.display = "none";
  document.getElementById("switcher2").style.display = "block";
  document.getElementById("login").style.display = "block";
  document.getElementById("switcher1").style.display = "none";

}
function GetSingUpMenu() {
  document.getElementById("login").style.display = "none";
  document.getElementById("switcher1").style.display = "block";
  document.getElementById("singup").style.display = "block";
  document.getElementById("switcher2").style.display = "none";
}

function SingUp() {
	var Login = document.getElementById("unames").value;
	var Password1 = document.getElementById ("psws").value;
	var Password2 = document.getElementById ("psw-repeats").value;
    fetch('/auth/signup', {
        method: "POST",
        body: JSON.stringify({login: Login, pwd1: Password1, pwd2: Password2})
    })
        .then(resp => {
            console.log('resp:', resp);
        }).catch(err => {
            console.log('err:', err)
        });
}

function LogIn() {
	var Login = document.getElementById("uname").value;
	var Password = document.getElementById ("psw").value;
    fetch('/auth/login', {
        method: "POST",
        body: JSON.stringify({login: Login, pwd: Password})
    })
        .then(resp => {
            console.log('resp:', resp);
        }).catch(err => {
            console.log('err:', err)
        });
}
