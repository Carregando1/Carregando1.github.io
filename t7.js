var state = [[2,2,2,2,2,2,2,2,2,2,2],[2,2,2,2,2,2,2,2,2,2,2],[2,2,0,0,0,0,0,0,0,2,2],[2,2,0,0,0,0,0,0,0,2,2],[2,2,0,0,0,0,0,0,0,2,2],[2,2,0,0,0,2,0,0,0,2,2],[2,2,0,0,0,0,0,0,0,2,2],[2,2,0,0,0,0,0,0,0,2,2],[2,2,0,0,0,0,0,0,0,2,2],[2,2,2,2,2,2,2,2,2,2,2],[2,2,2,2,2,2,2,2,2,2,2]];
var moves = [];
var evalmatrix = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]];
var displaystr = "";
var statetemp;
function f(a) {
  document.getElementById('turn').innerHTML="T7Fish thinking";
  moves.push(a);
  display();
  evaluate();
}
function resetstate() {
  state = [[2,2,2,2,2,2,2,2,2,2,2],[2,2,2,2,2,2,2,2,2,2,2],[2,2,0,0,0,0,0,0,0,2,2],[2,2,0,0,0,0,0,0,0,2,2],[2,2,0,0,0,0,0,0,0,2,2],[2,2,0,0,0,2,0,0,0,2,2],[2,2,0,0,0,0,0,0,0,2,2],[2,2,0,0,0,0,0,0,0,2,2],[2,2,0,0,0,0,0,0,0,2,2],[2,2,2,2,2,2,2,2,2,2,2],[2,2,2,2,2,2,2,2,2,2,2]];
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
function evaluate() {
  minevalnum = 1000;
  for (var i = 0; i < 49; i++) {
    evalnum = 0;
    resetstate();
    state2 = state;
    if (state2[Math.floor(i/7)+2][i%7+2] == 0) {
      state2[Math.floor(i/7)+2][i%7+2] = -1;
      for (var j = 0; j < 49; j++) {
        if (state2[Math.floor(j/7)+2][j%7+2] == -1) {
          if (state2[Math.floor(j/7)+2-1][j%7+2+1] == -1 && state2[Math.floor(j/7)+2+1][j%7+2-1] == -1) {
            evalnum -= 1;
          }
          if (state2[Math.floor(j/7)+2][j%7+2+1] == -1 && state2[Math.floor(j/7)+2][j%7+2-1] == -1) {
            evalnum -= 1;
          }
          if (state2[Math.floor(j/7)+2+1][j%7+2+1] == -1 && state2[Math.floor(j/7)+2-1][j%7+2-1] == -1) {
            evalnum -= 1;
          }
          if (state2[Math.floor(j/7)+2-1][j%7+2] == -1 && state2[Math.floor(j/7)+2+1][j%7+2] == -1) {
            evalnum -= 1;
          }
        }
        if (state2[Math.floor(j/7)+2][j%7+2] == 1) {
          if (state2[Math.floor(j/7)+2-1][j%7+2+1] == 1 && state2[Math.floor(j/7)+2+1][j%7+2-1] == 1) {
            evalnum += 1;
          }
          if (state2[Math.floor(j/7)+2][j%7+2+1] == 1 && state2[Math.floor(j/7)+2][j%7+2-1] == 1) {
            evalnum += 1;
          }
          if (state2[Math.floor(j/7)+2+1][j%7+2+1] == 1 && state2[Math.floor(j/7)+2-1][j%7+2-1] == 1) {
            evalnum += 1;
          }
          if (state2[Math.floor(j/7)+2-1][j%7+2] == 1 && state2[Math.floor(j/7)+2+1][j%7+2] == 1) {
            evalnum += 1;
          }
        }
        if (state2[Math.floor(j/7)+2][j%7+2] == 0) {
          if (state2[Math.floor(j/7)+2-1][j%7+2+1] == 1 && state2[Math.floor(j/7)+2+1][j%7+2-1] == 0) {
            evalnum += 0.25;
          }
          if (state2[Math.floor(j/7)+2][j%7+2+1] == 1 && state2[Math.floor(j/7)+2][j%7+2-1] == 0) {
            evalnum += 0.25;
          }
          if (state2[Math.floor(j/7)+2+1][j%7+2+1] == 1 && state2[Math.floor(j/7)+2-1][j%7+2-1] == 0) {
            evalnum += 0.25;
          }
          if (state2[Math.floor(j/7)+2-1][j%7+2] == 1 && state2[Math.floor(j/7)+2+1][j%7+2] == 0) {
            evalnum += 0.25;
          }
          if (state2[Math.floor(j/7)+2-1][j%7+2+1] == 0 && state2[Math.floor(j/7)+2+1][j%7+2-1] == 1) {
            evalnum += 0.25;
          }
          if (state2[Math.floor(j/7)+2][j%7+2+1] == 0 && state2[Math.floor(j/7)+2][j%7+2-1] == 1) {
            evalnum += 0.25;
          }
          if (state2[Math.floor(j/7)+2+1][j%7+2+1] == 0 && state2[Math.floor(j/7)+2-1][j%7+2-1] == 1) {
            evalnum += 0.25;
          }
          if (state2[Math.floor(j/7)+2-1][j%7+2] == 0 && state2[Math.floor(j/7)+2+1][j%7+2] == 1) {
            evalnum += 0.25;
          }
          if (state2[Math.floor(j/7)+2-1][j%7+2+1] == 0 && state2[Math.floor(j/7)+2-2][j%7+2+2] == 1) {
            evalnum += 0.25;
          }
          if (state2[Math.floor(j/7)+2][j%7+2+1] == 0 && state2[Math.floor(j/7)+2][j%7+2+2] == 1) {
            evalnum += 0.25;
          }
          if (state2[Math.floor(j/7)+2+1][j%7+2+1] == 0 && state2[Math.floor(j/7)+2+2][j%7+2+2] == 1) {
            evalnum += 0.25;
          }
          if (state2[Math.floor(j/7)+2-1][j%7+2] == 0 && state2[Math.floor(j/7)+2-2][j%7+2] == 1) {
            evalnum += 0.25;
          }
          if (state2[Math.floor(j/7)+2+1][j%7+2-1] == 0 && state2[Math.floor(j/7)+2+2][j%7+2-2] == 1) {
            evalnum += 0.25;
          }
          if (state2[Math.floor(j/7)+2][j%7+2-1] == 0 && state2[Math.floor(j/7)+2][j%7+2-2] == 1) {
            evalnum += 0.25;
          }
          if (state2[Math.floor(j/7)+2-1][j%7+2-1] == 0 && state2[Math.floor(j/7)+2-2][j%7+2-2] == 1) {
            evalnum += 0.25;
          }
          if (state2[Math.floor(j/7)+2+1][j%7+2] == 0 && state2[Math.floor(j/7)+2+2][j%7+2] == 1) {
            evalnum += 0.25;
          }
          if (state2[Math.floor(j/7)+2-1][j%7+2+1] == -1 && state2[Math.floor(j/7)+2+1][j%7+2-1] == 0) {
            evalnum += -0.25;
          }
          if (state2[Math.floor(j/7)+2][j%7+2+1] == -1 && state2[Math.floor(j/7)+2][j%7+2-1] == 0) {
            evalnum += -0.25;
          }
          if (state2[Math.floor(j/7)+2+1][j%7+2+1] == -1 && state2[Math.floor(j/7)+2-1][j%7+2-1] == 0) {
            evalnum += -0.25;
          }
          if (state2[Math.floor(j/7)+2-1][j%7+2] == -1 && state2[Math.floor(j/7)+2+1][j%7+2] == 0) {
            evalnum += -0.25;
          }
          if (state2[Math.floor(j/7)+2-1][j%7+2+1] == 0 && state2[Math.floor(j/7)+2+1][j%7+2-1] == -1) {
            evalnum += -0.25;
          }
          if (state2[Math.floor(j/7)+2][j%7+2+1] == 0 && state2[Math.floor(j/7)+2][j%7+2-1] == -1) {
            evalnum += -0.25;
          }
          if (state2[Math.floor(j/7)+2+1][j%7+2+1] == 0 && state2[Math.floor(j/7)+2-1][j%7+2-1] == -1) {
            evalnum += -0.25;
          }
          if (state2[Math.floor(j/7)+2-1][j%7+2] == 0 && state2[Math.floor(j/7)+2+1][j%7+2] == -1) {
            evalnum += -0.25;
          }
          if (state2[Math.floor(j/7)+2-1][j%7+2+1] == 0 && state2[Math.floor(j/7)+2-2][j%7+2+2] == -1) {
            evalnum += -0.25;
          }
          if (state2[Math.floor(j/7)+2][j%7+2+1] == 0 && state2[Math.floor(j/7)+2][j%7+2+2] == -1) {
            evalnum += -0.25;
          }
          if (state2[Math.floor(j/7)+2+1][j%7+2+1] == 0 && state2[Math.floor(j/7)+2+2][j%7+2+2] == -1) {
            evalnum += -0.25;
          }
          if (state2[Math.floor(j/7)+2-1][j%7+2] == 0 && state2[Math.floor(j/7)+2-2][j%7+2] == -1) {
            evalnum += -0.25;
          }
          if (state2[Math.floor(j/7)+2+1][j%7+2-1] == 0 && state2[Math.floor(j/7)+2+2][j%7+2-2] == -1) {
            evalnum += -0.25;
          }
          if (state2[Math.floor(j/7)+2][j%7+2-1] == 0 && state2[Math.floor(j/7)+2][j%7+2-2] == -1) {
            evalnum += -0.25;
          }
          if (state2[Math.floor(j/7)+2-1][j%7+2-1] == 0 && state2[Math.floor(j/7)+2-2][j%7+2-2] == -1) {
            evalnum += -0.25;
          }
          if (state2[Math.floor(j/7)+2+1][j%7+2] == 0 && state2[Math.floor(j/7)+2+2][j%7+2] == -1) {
            evalnum += -0.25;
          }
        }
      }
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
  if (moves.length == 48) {
    if (minevalnum > 0) {
    document.getElementById('eval').innerHTML="Red wins by "+minevalnum+" 3-in-a-rows";
    } else if (minevalnum < 0) {
      document.getElementById('eval').innerHTML="Blue wins by "+(-1 *minevalnum)+" 3-in-a-rows";
    } else {
      document.getElementById('eval').innerHTML="Draw";
    }
  }
  state[Math.floor((minevalind-1)/7)+2][(minevalind-1)%7+2]=-1;
  display();
  document.getElementById('turn').innerHTML="Your move!";
  
}
