var level = [[]];
let intv;
function home() {
editmode = false;
document.getElementById('all').innerHTML="<p>Welcome to Match 3!</p><button onclick='edit()'>Level Editor</button><br><br><br><button onclick='play()'>Play Daily Level (Currently Unavailable)</button><br><br><br><button onclick='info()'>Info</button>";
clearInterval(intv);
}
function info() {
document.getElementById('all').innerHTML="<p>Created by C1. Part of C1 Projects.</p><p>Game concept from the Chinese game 羊了个羊, not original; adapted to allow user-created levels.</p><button onclick='home()'>Return to Main Page</button>";
}
function edit() {
if (level.length != 30) {
level = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
}
editmode = true;
document.getElementById('all').innerHTML="<canvas id='cnv' width='400px' height='520px' ></canvas><p id='p1'>Click on a position to place a block.</p><p id='p2'>Blocks in the same layer may not overlap each other.</p><p id='p3'>Errors appear here.</p><p id='p4'>The top layer is layer 1.</p><p id='p5'>Current Layer: <span id='layers'>1 / 20</span></p><button onclick='inc()' id='b3'>Increase Layer by 1</button><button onclick='dec()' id='b4'>Decrease Layer by 1</button><button onclick='erase()' id='b5'>Eraser Mode: Off</button><p id='p6'>This level has a total of 0 blocks.</p><p id='p7'>Number of Block Types: <span id='typ'>12</span></p><button onclick='inct()' id='b6'>Increase Type by 1</button><button onclick='dect()' id='b7'>Decrease Type by 1</button><button onclick='save()' id='b2'>Save Level</button><button onclick='upload()' id='b8'>Upload Level</button><button onclick='verify()' id='b9'>Verify Level</button><button onclick='home()' id='b1'>Return to Main Page</button>";
setup();
}
var editmode = false;
var selectedobjind = 0; //selected obj index
var subind = -1; //sub index for arrays
var layer = 1;
var deletemode = false;
var total = 0;
var type = 12; //Type is between 12 and 16.
window.addEventListener('beforeunload', function (e) {
    // Check if any of the input fields are filled
    if (level.length == 30) {
        e.preventDefault();
        e.returnValue = '';
    }
});
function setup() {
  clearInterval(intv);
  intv = setInterval(edit1, 100);
  var canvas = document.getElementById('cnv');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    //0, 0 = 240, 240
    for (var i = 0; i < 20; i++) {
      for (var j = 0; j < 26; j++) {
        ctx.lineWidth = 2;
        ctx.fillStyle='white';
        ctx.fillRect(i*20, j*20, 20, 20);
        ctx.strokeStyle='rgb(200, 200, 200)';
        ctx.strokeRect(i*20, j*20, 20, 20);
      }
    }
  if (layer != 1) {
  for (var i = 0; i < level[layer-2].length/2; i++) {
  ctx.fillStyle='rgb(150, 150, 150)';
  ctx.fillRect(40 * level[layer-2][2*i] + 20, 40 * level[layer-2][2*i+1] + 20, 40, 40);
  ctx.strokeStyle = 'rgb(200, 200, 200)';
  ctx.lineWidth = 2;
  ctx.strokeRect(40 * level[layer-2][2*i] + 20, 40 * level[layer-2][2*i+1] + 20, 40, 40);
  }
  }
  for (var i = 0; i < level[layer-1].length/2; i++) {
  ctx.fillStyle='black';
  ctx.fillRect(40 * level[layer-1][2*i] + 20, 40 * level[layer-1][2*i+1] + 20, 40, 40);
  ctx.strokeStyle = 'rgb(200, 200, 200)';
  ctx.lineWidth = 2;
  ctx.strokeRect(40 * level[layer-1][2*i] + 20, 40 * level[layer-1][2*i+1] + 20, 40, 40);
  }
  }
}
function edit1() {
  var canvas = document.getElementById('cnv');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 400, 20);
    ctx.fillRect(0, 500, 440, 20);
    ctx.fillRect(0, 0, 20, 520);
    ctx.fillRect(380, 0, 20, 520);
    document.getElementById("cnv").onclick = function(e) {
      var clickx = e.clientX, clicky = e.clientY;
      if (clickx >= 0 && clickx <= 440 && clicky >= 0 && clicky <= 520) {
	var xpos = (Math.floor(clickx / 20) / 2-1);
	var ypos = (Math.floor(clicky/20) / 2-1);
	if (xpos < 0) {
	xpos = 0;
	} else if (xpos > 8) {
	xpos = 8;
	}
	if (ypos < 0) {
	ypos = 0;
	} else if (ypos > 11) {
	ypos = 11;
	}
	if (!deletemode) {
	for (var i = 0; i < level[layer - 1].length/2; i++) {
	if (Math.abs(level[layer - 1][2*i] - xpos) < 1 && Math.abs(level[layer - 1][2*i+1] - ypos) < 1) {
	document.getElementById('p3').innerHTML=("Two different blocks may not overlap in the same layer.");
	return;
	} 
	}
	if (layer != 1) {
	for (var i = 0; i < level[layer - 2].length/2; i++) {
	if (level[layer - 2][2*i] - xpos == 0 && level[layer - 2][2*i+1] - ypos == 0) {
	document.getElementById('p3').innerHTML=("A block can not coincide with the position of any block in the layer immediately below.");
	return;
	}
	}
	for (var i = 0; i < level[layer - 2].length/2; i++) {
	if (Math.abs(level[layer - 2][2*i] - xpos) < 1 && Math.abs(level[layer - 2][2*i+1] - ypos) < 1) {
	ctx.fillStyle = "black";
	document.getElementById('p3').innerHTML=("Errors appear here.");
       	ctx.fillRect(40 * xpos + 20, 40 * ypos + 20, 40, 40);
        ctx.strokeStyle = 'rgb(200, 200, 200)';
        ctx.lineWidth = 2;
        ctx.strokeRect(40 * xpos + 20, 40 * ypos + 20, 40, 40);
        console.log(xpos + " " + ypos);
	console.log(clickx + " " + clicky);
        level[layer - 1].push(xpos, ypos);
	total++;
	document.getElementById('p6').innerHTML='This level has a total of '+total+' blocks.';
	return;
	}
	}
	document.getElementById('p3').innerHTML=("Each block below the top layer must be under a block from the layer immediately above it.");
	return;
	} else {
	ctx.fillStyle = "black";
	document.getElementById('p3').innerHTML=("Errors appear here.");
       	ctx.fillRect(40 * xpos + 20, 40 * ypos + 20, 40, 40);
        ctx.strokeStyle = 'rgb(200, 200, 200)';
        ctx.lineWidth = 2;
        ctx.strokeRect(40 * xpos + 20, 40 * ypos + 20, 40, 40);
        console.log(xpos + " " + ypos);
	console.log(clickx + " " + clicky);
        level[layer - 1].push(xpos, ypos);
	total++;
	document.getElementById('p6').innerHTML='This level has a total of '+total+' blocks.';
	}
	} else {
	for (var i = 0; i < level[layer-1].length/2; i++) {
	if (Math.abs(level[layer-1][2*i] - xpos) < 1 && Math.abs(level[layer-1][2*i+1] - ypos) < 1) { 
	level[layer-1].splice(2*i, 2);
	setup();
	total -= 1;
	document.getElementById('p6').innerHTML='This level has a total of '+total+' blocks.';
	return;
	}
	}
	}
      }
    }
  }
}
//Check for hanging blocks before play. Can be created through erase tool.
var savestring = "";
function save() {
savestring = "#"+type.toString();
for (var i = 0; i < level.length; i++) {
for (var j = 0; j < level[i].length/2; j++) {
if (level[i][j*2] < 10) {
  savestring += "0";
}
savestring += level[i][j*2].toString();
if (level[i][j*2]%1 == 0) {
  savestring += ".0";
}
savestring += "/";
if (level[i][j*2+1] < 10) {
  savestring += "0";
}
savestring += level[i][j*2+1].toString();
if (level[i][j*2+1]%1 == 0) {
  savestring += ".0";
}
savestring += "\\";
}
savestring += "|";
}
	var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(savestring));
            element.setAttribute('download', 'current_level.txt');

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
}
var paritycheck = 0; //Records the number of vertical lines in the savecode. If not 20, invalid.
var stringcheck = 0; //Position in string.
//Fix upload bug where positions of blocks in even layers are shifted up 0.5 units.
function upload() {
loop:
for (var i = 0; i < level.length; i++) {
for (var j = 0; j < level[i].length; j++) {
if (level[i][j] >= 0) {
if (confirm("This operation will delete all data for the current level. If you do not save, your level can NOT be recovered.\nSave level? Press OK to save. Press Cancel to delete level and directly proceed to upload.")) {
save();
break loop;
} else {
break loop;
}
}
}
}
level = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
paritycheck = 0;
stringcheck = 0;
savestring = prompt("Input your save code. If you want to start from scratch, press Cancel.");
if (savestring === null) {
setup();
return;
}
loop2:
while (stringcheck < savestring.length) {
if (savestring.charAt(0) != '#') {
alert("Input code does not contain number of block types. Level could not be loaded.");
layer = 1;
level = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
document.getElementById('layers').innerHTML=(layer+" / 30");
document.getElementById('p6').innerHTML='This level has a total of 0 blocks.';
setup();
return;
}
if (stringcheck == 0) {
type = Number(savestring.substring(1, 3));
document.getElementById('typ').innerHTML=(type);
stringcheck = 3;
continue loop2;
}
if (savestring.charAt(stringcheck) == '|') {
paritycheck += 1;
stringcheck += 1;
} else {
if (Number(savestring.substring(stringcheck, stringcheck+4)) < 0 || Number(savestring.substring(stringcheck, stringcheck+4)) > 8) {
alert("Input code contains block out of bounds. Level could not be loaded.");
layer = 1;
level = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
document.getElementById('layers').innerHTML=(layer+" / 30");
document.getElementById('p6').innerHTML='This level has a total of 0 blocks.';
setup();
return;
}
if (Number(savestring.substring(stringcheck, stringcheck+4))%0.5 != 0) {
alert("Input code contains illegal block position. Level could not be loaded.");
layer = 1;
level = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
document.getElementById('layers').innerHTML=(layer+" / 30");
document.getElementById('p6').innerHTML='This level has a total of 0 blocks.';
setup();
return;
}
if (savestring.charAt(stringcheck+4) != '/' || savestring.charAt(stringcheck+9) != '\\') {
alert("Input code is malformed. Level could not be loaded.");
layer = 1;
level = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
document.getElementById('layers').innerHTML=(layer+" / 30");
document.getElementById('p6').innerHTML='This level has a total of 0 blocks.';
setup();
return;
}
level[paritycheck].push(Number(savestring.substring(stringcheck, stringcheck+4)));
if (Number(savestring.substring(stringcheck+5, stringcheck+9)) < 0 || Number(savestring.substring(stringcheck+5, stringcheck+9)) > 11) {
alert("Input code contains block out of bounds. Level could not be loaded.");
layer = 1;
level = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
document.getElementById('layers').innerHTML=(layer+" / 30");
document.getElementById('p6').innerHTML='This level has a total of 0 blocks.';
setup();
return;
}
if (Number(savestring.substring(stringcheck+5, stringcheck+9))%0.5 != 0) {
alert("Input code contains illegal block position. Level could not be loaded.");
layer = 1;
level = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
document.getElementById('layers').innerHTML=(layer+" / 30");
document.getElementById('p6').innerHTML='This level has a total of 0 blocks.';
setup();
return;
}
level[paritycheck].push(Number(savestring.substring(stringcheck+5, stringcheck+9)));
console.log(savestring.substring(stringcheck, stringcheck+10));
stringcheck += 10;
}
}
console.log(paritycheck);
if (paritycheck != 30) {
alert("Input code is malformed. Level could not be loaded.");
level = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
layer = 1;
document.getElementById('layers').innerHTML=(layer+" / 30");
document.getElementById('p6').innerHTML='This level has a total of 0 blocks.';
setup();
return;
}
layer = 1;
document.getElementById('layers').innerHTML=(layer+" / 30");
for (var i = 0; i < level.length; i++) {
total += level[i].length/2;
}
document.getElementById('p6').innerHTML='This level has a total of '+total+' blocks.';
setup();
}
function verify() {
if (total % (type * 3) == 0) {
console.log('Play request successful.')
} else {
document.getElementById('p3').innerHTML='The total number of blocks must be divisible by '+type*3+' in order to play.';
}
}
function inc() {
if (layer == 30) {
document.getElementById('p3').innerHTML=("Current layer is 30; layer can not be increased further.");
} else {
document.getElementById('p3').innerHTML=("Errors appear here.");
layer++;
document.getElementById('layers').innerHTML=(layer+" / 30");
setup();
}
}
function dec() {
if (layer == 1) {
document.getElementById('p3').innerHTML=("Current layer is 1; layer can not be decreased further.");
} else {
document.getElementById('p3').innerHTML=("Errors appear here.");
layer--;
document.getElementById('layers').innerHTML=(layer+" / 30");
setup();
}
}
function erase() {
if (!deletemode) {
deletemode = true;
document.getElementById('b5').innerHTML='Eraser Mode: On';
document.getElementById('b5').style.backgroundColor='rgb(200,50,50)';
} else {
deletemode = false;
document.getElementById('b5').innerHTML='Eraser Mode: Off';
document.getElementById('b5').style.backgroundColor='rgb(100,200,100)';
}
}
function inct() {
if (type == 16) {
document.getElementById('p3').innerHTML=("Current number of types is 16; maximum; can not be further increased.");
} else {
document.getElementById('p3').innerHTML=("Errors appear here.");
type++;
document.getElementById('typ').innerHTML=(type);
}
}
function dect() {
if (type == 12) {
document.getElementById('p3').innerHTML=("Current number of types is 12; minimum; can not be further decreased.");
} else {
document.getElementById('p3').innerHTML=("Errors appear here.");
type--;
document.getElementById('typ').innerHTML=(type);
}
}
