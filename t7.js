var state = [[2,2,2,2,2,2,2,2,2,2,2],[2,2,2,2,2,2,2,2,2,2,2],[2,2,0,0,0,0,0,0,0,2,2],[2,2,0,0,0,0,0,0,0,2,2],[2,2,0,0,0,0,0,0,0,2,2],[2,2,0,0,0,0,0,0,0,2,2],[2,2,0,0,0,0,0,0,0,2,2],[2,2,0,0,0,0,0,0,0,2,2],[2,2,0,0,0,0,0,0,2,2,2],[2,2,2,2,2,2,2,2,2,2,2],[2,2,2,2,2,2,2,2,2,2,2]];
var moves = [];
var botmode = 1;
var evalmatrix = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]];
var displaystr = "";
var statetemp;
var evalm = 0;
function db() {
  botmode = 0;
  document.getElementById('t7').innerHTML='T7 Player vs Player';
}
function evalmode() {
  evalm = 1;
    for (var i = 0; i < 49; i++) {
      document.getElementsByClassName("top")[i].style.color="black";
    }
    for (var k = 0; k < 49; k++) {
      minevalnum = 1000;
      resetstate();
      state2 = state;
      if (state2[Math.floor(k/7)+2][k%7+2] == 0) {
        for (var i = 0; i < 49; i++) {
          evalnum = 0;
          if (state2[Math.floor(i/7)+2][i%7+2] == 0) {
            resetstate();
            state2 = state;
            state2[Math.floor(k/7)+2][k%7+2] = 1;
            state2[Math.floor(i/7)+2][i%7+2] = -1;
            evalnum = evaluate(state2);
            if (minevalnum > evalnum) {
              minevalnum = evalnum;
            }
          } else {
          continue;
          }
        }
        document.getElementsByClassName('top')[k].innerHTML=minevalnum;
      } else {
        document.getElementsByClassName('top')[k].innerHTML="C";
        document.getElementsByClassName('top')[k].style.color="gray";
        continue;
      }
    }
}
function f(a) {
  if (botmode == 1) {
    document.getElementById('turn').innerHTML="T7Fish thinking";
  } else if (botmode == 0 && moves.length%2 == 0) {
    document.getElementById('turn').innerHTML="Blue's turn";
  } else {
    document.getElementById('turn').innerHTML="Red's turn";
  }
  moves.push(a);
  display();
  if (botmode == 1) {
    search();
  }
}
function resetstate() {
  state = [[2,2,2,2,2,2,2,2,2,2,2],[2,2,2,2,2,2,2,2,2,2,2],[2,2,0,0,0,0,0,0,0,2,2],[2,2,0,0,0,0,0,0,0,2,2],[2,2,0,0,0,0,0,0,0,2,2],[2,2,0,0,0,0,0,0,0,2,2],[2,2,0,0,0,0,0,0,0,2,2],[2,2,0,0,0,0,0,0,0,2,2],[2,2,0,0,0,0,0,0,2,2,2],[2,2,2,2,2,2,2,2,2,2,2],[2,2,2,2,2,2,2,2,2,2,2]];
  for (var i = 0; i < moves.length; i++) {
    if (i%2 == 0) {
      state[Math.floor((moves[i]-1)/7)+2][(moves[i]-1)%7+2]=1;
    } else {
      state[Math.floor((moves[i]-1)/7)+2][(moves[i]-1)%7+2]=-1;
    }
  }
}
function display() {
  resetstate();
  if (botmode == 0) {
    document.getElementById('sc').innerHTML="Red: "+evaluate3(state, 1)+" 3-in-a-rows, Blue: "+evaluate3(state, -1)+" 3-in-a-rows";
  if (moves.length == 48) {
    document.getElementById('turn').innerHTML="Game over";
    if (evaluate3(state, 1)-evaluate3(state, -1) > 0) {
      document.getElementById('eval').innerHTML="Red wins by "+(evaluate3(state, 1)-evaluate3(state, -1))+" 3-in-a-rows";
    } else if (evaluate3(state, 1)-evaluate3(state, -1) < 0) {
      document.getElementById('eval').innerHTML="Blue wins by "+(evaluate3(state, -1)-evaluate3(state, 1))+" 3-in-a-rows";
    } else {
      document.getElementById('eval').innerHTML="Blue wins by draw rule";
    }
  }
  }
  for (var i = 0; i < 49; i++) {
    if (state[Math.floor(i/7)+2][i%7+2] == 2) {
      displaystr = "gray";
    } else if (state[Math.floor(i/7)+2][i%7+2] == 1) {
      displaystr = "red";
    } else if (state[Math.floor(i/7)+2][i%7+2] == -1) {
      displaystr = "blue";
    } else {
      continue;
    }
    document.getElementsByClassName("top")[i].style.backgroundColor=displaystr;
    document.getElementsByClassName("top")[i].style.color=displaystr;
    document.getElementsByClassName("top")[i].onclick="";
  }
}
var evalnum = 0;
var minevalnum = 0;
var minevalind = 0;
var scorea;
var scoreb;
var state2 = [[2,2,2,2,2,2,2,2,2,2,2],[2,2,2,2,2,2,2,2,2,2,2],[2,2,0,0,0,0,0,0,0,2,2],[2,2,0,0,0,0,0,0,0,2,2],[2,2,0,0,0,0,0,0,0,2,2],[2,2,0,0,0,2,0,0,0,2,2],[2,2,0,0,0,0,0,0,0,2,2],[2,2,0,0,0,0,0,0,0,2,2],[2,2,0,0,0,0,0,0,0,2,2],[2,2,2,2,2,2,2,2,2,2,2],[2,2,2,2,2,2,2,2,2,2,2]];
var teststr;
function search() {
  minevalnum = 1000;
  for (var i = 0; i < 49; i++) {
    evalnum = 0;
    resetstate();
    state2 = state;
    if (state2[Math.floor(i/7)+2][i%7+2] == 0) {
      state2[Math.floor(i/7)+2][i%7+2] = -1;
      evalnum = evaluate(state2);
      if (minevalnum > evalnum) {
        minevalnum = evalnum;
        minevalind = i+1;
      }
    } else {
      continue;
    }
  }
  document.getElementById('eval').innerHTML=minevalnum;
  moves.push(minevalind);
  state[Math.floor((minevalind-1)/7)+2][(minevalind-1)%7+2]=-1;
  document.getElementById('sc').innerHTML="Red: "+evaluate3(state, 1)+" 3-in-a-rows, Blue: "+evaluate3(state, -1)+" 3-in-a-rows";
  document.getElementById('turn').innerHTML="Your move!";
  if (moves.length == 48) {
    document.getElementById('turn').innerHTML="Game over";
    if (minevalnum > 0) {
    document.getElementById('eval').innerHTML="Red wins by "+(evaluate3(state, 1)-evaluate3(state, -1))+" 3-in-a-rows";
    } else if (minevalnum < 0) {
      document.getElementById('eval').innerHTML="Blue wins by "+(evaluate3(state, -1)-evaluate3(state, 1))+" 3-in-a-rows";
    } else {
      document.getElementById('eval').innerHTML="Blue wins by draw rule";
    }
  }
  display();
  if (evalm) {
    for (var i = 0; i < 49; i++) {
      document.getElementsByClassName("top")[i].style.color="black";
    }
    for (var k = 0; k < 49; k++) {
      minevalnum = 1000;
      resetstate();
      state2 = state;
      if (state2[Math.floor(k/7)+2][k%7+2] == 0) {
        for (var i = 0; i < 49; i++) {
          evalnum = 0;
          if (state2[Math.floor(i/7)+2][i%7+2] == 0) {
            resetstate();
            state2 = state;
            state2[Math.floor(k/7)+2][k%7+2] = 1;
            state2[Math.floor(i/7)+2][i%7+2] = -1;
            evalnum = evaluate(state2);
            if (minevalnum > evalnum) {
              minevalnum = evalnum;
            }
          } else {
          continue;
          }
        }
        document.getElementsByClassName('top')[k].innerHTML=minevalnum;
      } else {
        document.getElementsByClassName('top')[k].innerHTML="C";
        document.getElementsByClassName('top')[k].style.color="gray";
        continue;
      }
    }
  }
}
var res = 0;
function evaluate(pos) {
  res = 0;
  for (var j = 0; j < 49; j++) {
    if (pos[Math.floor(j/7)+2][j%7+2] == -1) {
      if (pos[Math.floor(j/7)+2-1][j%7+2+1] == -1 && pos[Math.floor(j/7)+2+1][j%7+2-1] == -1) {
        res -= 1;
      }
      if (pos[Math.floor(j/7)+2][j%7+2+1] == -1 && pos[Math.floor(j/7)+2][j%7+2-1] == -1) {
        res -= 1;
      }
      if (pos[Math.floor(j/7)+2+1][j%7+2+1] == -1 && pos[Math.floor(j/7)+2-1][j%7+2-1] == -1) {
        res -= 1;
      }
      if (pos[Math.floor(j/7)+2-1][j%7+2] == -1 && pos[Math.floor(j/7)+2+1][j%7+2] == -1) {
        res -= 1;
      }
      if (pos[Math.floor(j/7)+2-1][j%7+2+1] == -1 && pos[Math.floor(j/7)+2-2][j%7+2+2] == 0) {
        res -= 0.6;
      }
      if (pos[Math.floor(j/7)+2][j%7+2+1] == -1 && pos[Math.floor(j/7)+2][j%7+2+2] == 0) {
        res -= 0.6;
      }
      if (pos[Math.floor(j/7)+2+1][j%7+2+1] == -1 && pos[Math.floor(j/7)+2+2][j%7+2+2] == 0) {
        res -= 0.6;
      }
      if (pos[Math.floor(j/7)+2+1][j%7+2] == -1 && pos[Math.floor(j/7)+2+2][j%7+2] == 0) {
        res -= 0.6;
      }
      if (pos[Math.floor(j/7)+2+1][j%7+2-1] == -1 && pos[Math.floor(j/7)+2+2][j%7+2-2] == 0) {
        res -= 0.6;
      }
      if (pos[Math.floor(j/7)+2][j%7+2-1] == -1 && pos[Math.floor(j/7)+2][j%7+2-2] == 0) {
        res -= 0.6;
      }
      if (pos[Math.floor(j/7)+2-1][j%7+2-1] == -1 && pos[Math.floor(j/7)+2-2][j%7+2-2] == 0) {
        res -= 0.6;
      }
      if (pos[Math.floor(j/7)+2-1][j%7+2] == -1 && pos[Math.floor(j/7)+2-2][j%7+2] == 0) {
        res -= 0.6;
      }
      if (pos[Math.floor(j/7)+2+1][j%7+2-1] == 0 && pos[Math.floor(j/7)+2+2][j%7+2-2] == -1) {
        res -= 0.6;
      }
      if (pos[Math.floor(j/7)+2][j%7+2-1] == 0 && pos[Math.floor(j/7)+2][j%7+2-2] == -1) {
        res -= 0.6;
      }
      if (pos[Math.floor(j/7)+2-1][j%7+2-1] == 0 && pos[Math.floor(j/7)+2-2][j%7+2-2] == -1) {
        res -= 0.6;
      }
      if (pos[Math.floor(j/7)+2-1][j%7+2] == 0 && pos[Math.floor(j/7)+2-2][j%7+2] == -1) {
        res -= 0.6;
      }
      if (pos[Math.floor(j/7)+2-1][j%7+2+1] == 0 && pos[Math.floor(j/7)+2-2][j%7+2+2] == 0) {
        res -= 0.25;
      }
      if (pos[Math.floor(j/7)+2][j%7+2+1] == 0 && pos[Math.floor(j/7)+2][j%7+2+2] == 0) {
        res -= 0.25;
      }
      if (pos[Math.floor(j/7)+2+1][j%7+2+1] == 0 && pos[Math.floor(j/7)+2+2][j%7+2+2] == 0) {
        res -= 0.25;
      }
      if (pos[Math.floor(j/7)+2+1][j%7+2] == 0 && pos[Math.floor(j/7)+2+2][j%7+2] == 0) {
        res -= 0.25;
      }
      if (pos[Math.floor(j/7)+2+1][j%7+2-1] == 0 && pos[Math.floor(j/7)+2+2][j%7+2-2] == 0) {
        res -= 0.25;
      }
      if (pos[Math.floor(j/7)+2][j%7+2-1] == 0 && pos[Math.floor(j/7)+2][j%7+2-2] == 0) {
        res -= 0.25;
      }
      if (pos[Math.floor(j/7)+2-1][j%7+2-1] == 0 && pos[Math.floor(j/7)+2-2][j%7+2-2] == 0) {
        res -= 0.25;
      }
      if (pos[Math.floor(j/7)+2-1][j%7+2] == 0 && pos[Math.floor(j/7)+2-2][j%7+2] == 0) {
        res -= 0.25;
      }
      if (pos[Math.floor(j/7)+2+1][j%7+2-1] == 0 && pos[Math.floor(j/7)+2-1][j%7+2+1] == 0) {
        res -= 0.25;
      }
      if (pos[Math.floor(j/7)+2][j%7+2-1] == 0 && pos[Math.floor(j/7)+2][j%7+2+1] == 0) {
        res -= 0.25;
      }
      if (pos[Math.floor(j/7)+2-1][j%7+2-1] == 0 && pos[Math.floor(j/7)+2+1][j%7+2+1] == 0) {
        res -= 0.25;
      }
      if (pos[Math.floor(j/7)+2-1][j%7+2] == 0 && pos[Math.floor(j/7)+2+1][j%7+2] == 0) {
        res -= 0.25;
      }
    }
    if (pos[Math.floor(j/7)+2][j%7+2] == 1) {
      if (pos[Math.floor(j/7)+2-1][j%7+2+1] == 1 && pos[Math.floor(j/7)+2+1][j%7+2-1] == 1) {
        res += 1;
      }
      if (pos[Math.floor(j/7)+2][j%7+2+1] == 1 && pos[Math.floor(j/7)+2][j%7+2-1] == 1) {
        res += 1;
      }
      if (pos[Math.floor(j/7)+2+1][j%7+2+1] == 1 && pos[Math.floor(j/7)+2-1][j%7+2-1] == 1) {
        res += 1;
      }
      if (pos[Math.floor(j/7)+2-1][j%7+2] == 1 && pos[Math.floor(j/7)+2+1][j%7+2] == 1) {
        res += 1;
      }
      if (pos[Math.floor(j/7)+2-1][j%7+2+1] == 1 && pos[Math.floor(j/7)+2-2][j%7+2+2] == 0) {
        res += 0.6;
      }
      if (pos[Math.floor(j/7)+2][j%7+2+1] == 1 && pos[Math.floor(j/7)+2][j%7+2+2] == 0) {
        res += 0.6;
      }
      if (pos[Math.floor(j/7)+2+1][j%7+2+1] == 1 && pos[Math.floor(j/7)+2+2][j%7+2+2] == 0) {
        res += 0.6;
      }
      if (pos[Math.floor(j/7)+2+1][j%7+2] == 1 && pos[Math.floor(j/7)+2+2][j%7+2] == 0) {
        res += 0.6;
      }
      if (pos[Math.floor(j/7)+2+1][j%7+2-1] == 1 && pos[Math.floor(j/7)+2+2][j%7+2-2] == 0) {
        res += 0.6;
      }
      if (pos[Math.floor(j/7)+2][j%7+2-1] == 1 && pos[Math.floor(j/7)+2][j%7+2-2] == 0) {
        res += 0.6;
      }
      if (pos[Math.floor(j/7)+2-1][j%7+2-1] == 1 && pos[Math.floor(j/7)+2-2][j%7+2-2] == 0) {
        res += 0.6;
      }
      if (pos[Math.floor(j/7)+2-1][j%7+2] == 1 && pos[Math.floor(j/7)+2-2][j%7+2] == 0) {
        res += 0.6;
      }
      if (pos[Math.floor(j/7)+2+1][j%7+2-1] == 0 && pos[Math.floor(j/7)+2+2][j%7+2-2] == 1) {
        res += 0.6;
      }
      if (pos[Math.floor(j/7)+2][j%7+2-1] == 0 && pos[Math.floor(j/7)+2][j%7+2-2] == 1) {
        res += 0.6;
      }
      if (pos[Math.floor(j/7)+2-1][j%7+2-1] == 0 && pos[Math.floor(j/7)+2-2][j%7+2-2] == 1) {
        res += 0.6;
      }
      if (pos[Math.floor(j/7)+2-1][j%7+2] == 0 && pos[Math.floor(j/7)+2-2][j%7+2] == 1) {
        res += 0.6;
      }
      if (pos[Math.floor(j/7)+2-1][j%7+2+1] == 0 && pos[Math.floor(j/7)+2-2][j%7+2+2] == 0) {
        res += 0.25;
      }
      if (pos[Math.floor(j/7)+2][j%7+2+1] == 0 && pos[Math.floor(j/7)+2][j%7+2+2] == 0) {
        res += 0.25;
      }
      if (pos[Math.floor(j/7)+2+1][j%7+2+1] == 0 && pos[Math.floor(j/7)+2+2][j%7+2+2] == 0) {
        res += 0.25;
      }
      if (pos[Math.floor(j/7)+2+1][j%7+2] == 0 && pos[Math.floor(j/7)+2+2][j%7+2] == 0) {
        res += 0.25;
      }
      if (pos[Math.floor(j/7)+2+1][j%7+2-1] == 0 && pos[Math.floor(j/7)+2+2][j%7+2-2] == 0) {
        res += 0.25;
      }
      if (pos[Math.floor(j/7)+2][j%7+2-1] == 0 && pos[Math.floor(j/7)+2][j%7+2-2] == 0) {
        res += 0.25;
      }
      if (pos[Math.floor(j/7)+2-1][j%7+2-1] == 0 && pos[Math.floor(j/7)+2-2][j%7+2-2] == 0) {
        res += 0.25;
      }
      if (pos[Math.floor(j/7)+2-1][j%7+2] == 0 && pos[Math.floor(j/7)+2-2][j%7+2] == 0) {
        res += 0.25;
      }
      if (pos[Math.floor(j/7)+2+1][j%7+2-1] == 0 && pos[Math.floor(j/7)+2-1][j%7+2+1] == 0) {
        res += 0.25;
      }
      if (pos[Math.floor(j/7)+2][j%7+2-1] == 0 && pos[Math.floor(j/7)+2][j%7+2+1] == 0) {
        res += 0.25;
      }
      if (pos[Math.floor(j/7)+2-1][j%7+2-1] == 0 && pos[Math.floor(j/7)+2+1][j%7+2+1] == 0) {
        res += 0.25;
      }
      if (pos[Math.floor(j/7)+2-1][j%7+2] == 0 && pos[Math.floor(j/7)+2+1][j%7+2] == 0) {
        res += 0.25;
      }
    } 
  }
  return Math.round(res*10)/10;
}
function evaluate3(pos,num) {
  res = 0;
  for (var j = 0; j < 49; j++) {
    if (pos[Math.floor(j/7)+2][j%7+2] == num) {
      if (pos[Math.floor(j/7)+2-1][j%7+2+1] == num && pos[Math.floor(j/7)+2+1][j%7+2-1] == num) {
        res += 1;
      }
      if (pos[Math.floor(j/7)+2][j%7+2+1] == num && pos[Math.floor(j/7)+2][j%7+2-1] == num) {
        res += 1;
      }
      if (pos[Math.floor(j/7)+2+1][j%7+2+1] == num && pos[Math.floor(j/7)+2-1][j%7+2-1] == num) {
        res += 1;
      }
      if (pos[Math.floor(j/7)+2-1][j%7+2] == num && pos[Math.floor(j/7)+2+1][j%7+2] == num) {
        res += 1;
      }
    }
  }
  return res;
}
