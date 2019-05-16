
function GetRules(evt,x){
  var i, mainmenu, rulecontainer;
  
  rulecontainer = document.getElementsByClassName("rulecontainer");
  for (i = 0; i < rulecontainer.length; i++) {
    rulecontainer[i].style.display = "none";
  }
  
  
mainmenu = document.getElementsByClassName("mainmenu");
for (i = 1; i < mainmenu.length; i++) {
    mainmenu[i].className = mainmenu[i].className.replace(" active", "");
}
evt.currentTarget.className += " active";
document.getElementById(x).style.display = "block";
}
function chargerangetextequality(fromrange,totext){
document.getElementById(totext).value=document.getElementById(fromrange).value;
console.log(document.getElementById(totext).value);
}

function HrefCreation(game) {
	var gameradius = '0',gamenumberoftargets = '0',gametime = '0';
	if (game == 1){
		gameradius = document.getElementById("game1radiusrange").value }
	if (game == 2){
		gameradius = document.getElementById("game2radiusrange").value;
		gamenumberoftargets = document.getElementById("game2numberoftargetsrange").value;
		gametime = document.getElementById("game2timerange").value}
	if (game == 3){
		gameradius = document.getElementById("game3radiusrange").value;
		gametime = document.getElementById("game3timerange").value}
	var myURL = 'game?game=' + game + '&gameradius=' + gameradius + '&gamenumberoftargets=' + gamenumberoftargets + '&gametime=' + gametime;
	document.getElementById('myUniqueLinkId' + game).href = myURL;
}