const selectBox = document.querySelector(".select-box"),
selectBtnX = selectBox.querySelector(".options .playerX"),
selectBtnO = selectBox.querySelector(".options .playerO"),
playBoard = document.querySelector(".play-board"),
players = document.querySelector(".players"),
allBox = document.querySelectorAll("section span"),
resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text");
var level ;
// set on click button 
window.onload = ()=>{
    for (let i = 0; i < allBox.length; i++) {
       allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
}

let ai = 'X';
let human = 'O';
let currentPlayer = human;
selectBox.classList.add("hide");
playBoard.classList.add("show");
// select x or y 
selectBtnX.onclick = ()=>{
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
}

selectBtnO.onclick = ()=>{ 
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
    players.setAttribute("class", "players active player");
}

function setlevel(value){
    sessionStorage.setItem('level1', value);
     console.log(level)
 
}

//drow icons
let playerXIcon = "fas fa-times",
playerOIcon = "far fa-circle",
playerSign = "X",
runBot = true;


//drow in play aria
function clickedBox(element){
    if(players.classList.contains("player")){
        playerSign = human;
        element.innerHTML = `<i class="${playerOIcon}"></i>`;
        players.classList.remove("active");
        element.setAttribute("id", playerSign);
    }else{
        element.innerHTML = `<i class="${playerXIcon}"></i>`;
        element.setAttribute("id", playerSign);
        players.classList.add("active");
    }
    selectWinner();
    element.style.pointerEvents = "none";
    playBoard.style.pointerEvents = "none";
    let randomTimeDelay = ((Math.random() * 1000) + 200).toFixed();
    setTimeout(()=>{
        bot(runBot);
    }, randomTimeDelay);
}


//
function bot(){
    let array = [];
    if(runBot){
        playerSign = human;
        for (let i = 0; i < allBox.length; i++) {
            if(allBox[i].childElementCount == 0){
                array.push(i);
            }
        }

        if(level === 'Easy'){
            console.log(level);
        }
        else if (level === 'Medium'){
            console.log(level)
        }
        else{
            console.log(level)
        }
    }
    
}


function getIdVal(classname){
    return document.querySelector(".box" + classname).id;
}
function checkIdSign(val1, val2, val3, sign){ 
    if(getIdVal(val1) == sign && getIdVal(val2) == sign && getIdVal(val3) == sign){
        return true;
    }
}
function selectWinner(){
    if(checkIdSign(1,2,3,playerSign) || checkIdSign(4,5,6, playerSign) || checkIdSign(7,8,9, playerSign) || checkIdSign(1,4,7, playerSign) || checkIdSign(2,5,8, playerSign) || checkIdSign(3,6,9, playerSign) || checkIdSign(1,5,9, playerSign) || checkIdSign(3,5,7, playerSign)){
        runBot = false;
        bot(runBot);
        setTimeout(()=>{
            resultBox.classList.add("show");
            playBoard.classList.remove("show");
        }, 700);
        wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;
    }else{
        if(getIdVal(1) != "" && getIdVal(2) != "" && getIdVal(3) != "" && getIdVal(4) != "" && getIdVal(5) != "" && getIdVal(6) != "" && getIdVal(7) != "" && getIdVal(8) != "" && getIdVal(9) != ""){
            runBot = false;
            bot(runBot);
            setTimeout(()=>{
                resultBox.classList.add("show");
                playBoard.classList.remove("show");
            }, 700);
            wonText.textContent = "Match has been drawn!";
        }
    }
}
replayBtn.onclick = ()=>{
    window.location.reload();
}

let scores = {
  X: 1,
  O: -1,
  tie: 0
};
let array = [];
  
  
for (let i = 0; i < allBox.length; i++) {
    if(allBox[i].childElementCount == 0){
        array.push(i);
    }
  }
function alphabeta(array, depth, alpha, beta, isMaximizing) {
 
        let result = selectWinner();
    if (result !== null) {
      return scores[result];
    }

    if (isMaximizing) {
      let v = -Infinity;
      for (let i = 0; i < 3; i++) {
       
          if (array[i] == '') {
            array[i] = ai;
            let score = alphabeta(board, depth + 1, alpha, beta, false);
            array[i] = '';
            v=min(score,v);
            alpha = max(alpha,v);
            if(beta < alpha || beta == alpha)
            break;
          }
      }
      return v;
    }

}

