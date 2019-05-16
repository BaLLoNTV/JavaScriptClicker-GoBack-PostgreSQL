var clickCount = 0, STGT = 0, Game = 0 , GameStarted = -1; 
var i, r, n, TargetX = [], TargetY = [], TargetRadius = [], LifeTimeOfTarget = [], TargetVisibility = [];
var clickHandlerX, clickHandlerY;
var MyCan0, MyCan2D;
var timerId0, timerId1, timerId2, timerId3, timerId = [];
var FlipTime, ClickTime;
var ForGameRadius, ForGameNumberOfTergets, ForGameTime;

function ParseURLPrm(PRM){
var FullURL = window.location.search.substring(1);
var PrmArray = FullURL.split('&');
console.log(PrmArray.length);
for (var i = 0; i < PrmArray.length; i++)
{
	var PrmOne = PrmArray[i].split('=');
	console.log(PrmArray[i]);
	console.log(PrmArray[i].split('='));
	if (PrmOne[0] == PRM)
	{return PrmOne[1]}
}
}

document.addEventListener('DOMContentLoaded',function(){
MyCan0 = document.getElementById("mycanvas");
MyCan2D = MyCan0.getContext("2d");
Game = parseInt(ParseURLPrm('game'),10);
ForGameRadius =  parseInt(ParseURLPrm('gameradius'),10);
ForGameNumberOfTergets = parseInt(ParseURLPrm('gamenumberoftargets'),10);
ForGameTime = parseInt(ParseURLPrm('gametime'),10);
console.log(Game);
console.log(ForGameRadius); 
console.log(ForGameNumberOfTergets);
console.log(ForGameTime);
SG(Game);
})


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function Accuracy( radius , X , Y )
{
 if ( radius >= Math.sqrt( Math.pow( clickHandlerX - X , 2 ) + Math.pow( clickHandlerY - Y ,2)) )
 { return 1; }
 else
 { return 0; }
}

function GameOne()
{
	if ( Accuracy( TargetRadius[0] , TargetX[0] , TargetY[0])  )
		{
		ResetGame();
		CreateTargets( i , ForGameRadius );
		ClearScreen();
		DrawTarget( TargetX[0] , TargetY[0] , TargetRadius[0] );
		}
}

function ForGameTwo( n )
{
TargetX[n] = (getRandomInt( TargetRadius[n] , MyCan0.width - TargetRadius[n]));
TargetY[n] = (getRandomInt( TargetRadius[n] , MyCan0.height - TargetRadius[n]));
timerId.push( setTimeout(function() { DrawTarget(TargetX[n] , TargetY[n] , TargetRadius[n]); TargetVisibility[n] = 1; timerId.shift(); }, i*ForGameTime ) );
}


function GameTwo()
{
window.requestAnimationFrame(GameTwo);
var n = 0 ; g = 0, RMass = []; Start = [];
for(n=0;n < i; n++)
{
if ( Accuracy( TargetRadius[n] , TargetX[n] , TargetY[n]) && TargetVisibility[n] === 1 )
{
TargetVisibility[n] = 0;
ForGameTwo( n );
ClearScreen();
}
}
for(g=0; g < i;g++)
{ if(TargetVisibility[g]===1) { DrawTarget(TargetX[g] , TargetY[g] , TargetRadius[g]); } }
}

function GameTree()
{
var SomeTime;
var a;
if ( TargetVisibility[0] === 0)
{
SG3();
}
a=document.getElementById('TGa1');
//console.log(a);
if ( Accuracy( r , MyCan0.width / 2 , MyCan0.height / 2 ) && TargetVisibility[0] === 1 )
{
ClickTime = new Date();
TargetVisibility[0] = 0;
SomeTime = ClickTime - FlipTime;
a.innerHTML = SomeTime.toString();
SG3();
}
}


function GameTreeStart()
{
var flipflop = getRandomInt( 500 , 7000 );
TargetVisibility[0] = 0;
DrawTarget( MyCan0.width / 2 , MyCan0.height / 2 , r );
timerId1 = setTimeout(function() {
	ClearScreen();
 	MyCan2D.beginPath();
	MyCan2D.arc( MyCan0.width / 2 , MyCan0.height / 2 , r , 0, 2 * Math.PI);
	MyCan2D.fillStyle = 'red';
	MyCan2D.fill();
	MyCan2D.stroke();
	MyCan2D.fillStyle = 'black';
	FlipTime = new Date();	
	TargetVisibility[0] = 1;
	console.log(timerId0);
	console.log(timerId1);
	console.log(timerId2);
	console.log(timerId3);
	}, flipflop );
	timerId2 = setTimeout(function() { ClearScreen(); DrawTarget( MyCan0.width / 2 , MyCan0.height / 2 , r );  TargetVisibility[0] = 0; } , flipflop + 500);
}


function clickHandler(evt){ 
	clickHandlerX = evt.clientX - MyCan0.offsetLeft + window.pageXOffset;
	clickHandlerY = evt.clientY - MyCan0.offsetTop + window.pageYOffset; 

	if( GameStarted === 1)
	if(Game === 1)
	{
	GameOne();
	}
	else if (Game === 2)
	{
	GameTwo();
	}
	else if (Game === 3)
	{
	GameTree();
	}
	else if (Game === 4)
	{
	}
	
	
	if ( GameStarted === 0 && Accuracy( r , MyCan0.width / 2 , MyCan0.height / 2 ))
	{
	GameStarted = 1;
	ClearScreen();
	if ( Game === 1){
	DrawTarget( TargetX[0] , TargetY[0] , TargetRadius[0] );}
	else if ( Game === 2){
	var n = 0;
	timerId0 = setInterval(function(){  DrawTarget(TargetX[n] , TargetY[n] , TargetRadius[n]); TargetVisibility[n] = 1; n++; } , ForGameTime);
	timerId1 = setTimeout(function() {  clearInterval(timerId0); }, (i)*ForGameTime );}
	else if ( Game === 3 ){
	GameTreeStart();}
	}
}


function DrawPreGameView(x)
{
MyCan2D.clearRect(0,0,MyCan0.width,MyCan0.height);
MyCan2D.font = 'bold 80px sans-serif';
MyCan2D.fillText( "Start!" ,MyCan0.width / 2 - 100 ,MyCan0.height / 2 - (x+20));
DrawTarget( MyCan0.width / 2 , MyCan0.height / 2 , x);
}

function CreateTargets( NumberOfButtons , radius )
{
var infi = 0;
for (;infi<NumberOfButtons;infi++)
{
TargetX.push(getRandomInt( radius , MyCan0.width - radius));
TargetY.push(getRandomInt( radius , MyCan0.height - radius));
TargetRadius.push(radius);
TargetVisibility.push(0);
}
}


function SG(SGame){
if ( SGame == 1){
i = 1;
Game = 1;
GameStarted = 0;
r=20;
ResetGame();
CreateTargets( i , ForGameRadius );
DrawPreGameView(r);
}
else if ( SGame == 2){
i = ForGameNumberOfTergets;
Game = 2;
GameStarted = 0;
r=20;
ResetGame();
CreateTargets( i , ForGameRadius );
DrawPreGameView(r);
}
else if ( SGame == 3){
i = 1;
Game = 3;
GameStarted = 0;
r=100;
ResetGame();
DrawPreGameView(r);
}
}


//function DrawAllGameObj( x ){
//var timerId = setInterval(  DrawTarget(  , 250);
//setTimeout(function() {  clearInterval(timerId); }, (x)*250 );
//}

function ClearScreen()
{
MyCan2D.clearRect(0,0, MyCan0.width , MyCan0.height );
}

function DrawTarget( x , y , radius){
	MyCan2D.beginPath();
	MyCan2D.arc( x , y , radius , 0, 2 * Math.PI);
	MyCan2D.fillStyle = 'blue';
	MyCan2D.fill();
	MyCan2D.stroke();
	MyCan2D.fillStyle = 'black';
}

function ResetGame(){
var n;
clearInterval( timerId0 );
clearTimeout( timerId0 );
clearTimeout( timerId1 );
clearTimeout( timerId2 );
clearTimeout( timerId3 );
for ( n = 0; n < timerId.length ; n++){
clearTimeout( timerId[n] );}
TargetX = []; TargetY = []; TargetRadius = []; LifeTimeOfTarget = []; TargetVisibility = []; timerId = [];}

