var presources = [];
var nresources = [];
var sc = 0;
var as = 0;
let screencheck;
let gameintv;
function onloadp() {
	if (window.innerWidth < 820) {
   		document.getElementById("totaldiv").innerHTML="<p>To play Idle Prestiges, you need a window of width 820px or wider. Resize your window, swap orientation, or swap devices to continue.</p><p>Current width: "+window.innerWidth+"px";
  		screencheck = setInterval(widthcheck, 20);
	}
	init();
}
function widthcheck() {
	if (window.innerWidth >= 820) {
		document.getElementById('totaldiv').innerHTML="<div class='mainbar' id='mainbar1'><button onclick='pg(1)' class='topbar'>Prestige Layers</button></div><div class='mainbar' id='mainbar2'><button onclick='pg(2)' class='topbar'>Locked</button></div><div class='mainbar' id='mainbar3'><button onclick='pg(3)' class='topbar'>Achievements</button></div><div class='mainbar' id='mainbar4'><button onclick='pg(4)' class='topbar'>Statistics</button></div><div id='maincontent'></div>";
		clearInterval(screencheck);
		//reinit();
	} else {
		document.getElementById("totaldiv").innerHTML="<p>To play Idle Prestiges, you need a window of width 820px or wider. Resize your window, swap orientation, or swap devices to continue.</p><p>Current width: "+window.innerWidth+"px";
	}
}
function init() {
	document.getElementById('maincontent').innerHTML="<div class='prestiges'><p class='prestigeinfo'>Score: 10</p><p class='prestigemult'>Multiplier: x1</p><button class='prestigeac' onclick=pres(0)><p>Prestige to Layer 1</p><p>Requires: 10 Score</p></button></div>";
	document.getElementsByClassName('prestiges')[0].style.top = 60px;
	screencheck = setInterval(widthcheck, 20);
	gameintv = setInterval(update, 1000);
}
function reinit() {
	console.log("keep your width > 820 please");
}
function update() {
	//function code
}
function pres(a) {
	console.log("lol");
}
function npres(a) {
	console.log("later feature");
}