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
