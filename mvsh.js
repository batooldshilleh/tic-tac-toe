const selectBox = document.querySelector(".select-box"),
playBoard = document.querySelector(".play-board"),
players = document.querySelector(".players"),
allBox = document.querySelectorAll("section span"),
resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text"),
replayBtn = resultBox.querySelector("button");
let level ;

function setlevel(value){
    
    sessionStorage.setItem('level1', value);
    level = sessionStorage.getItem('level1');
    }

window.onload = ()=>{
    for (let i = 0; i < allBox.length; i++) {
       allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
}

selectBox.classList.add("hide");
    playBoard.classList.add("show");

/*selectBtnX.onclick = ()=>{
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
}
selectBtnO.onclick = ()=>{ 
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
    players.setAttribute("class", "players active player");
}*/

let human = "X",
ai = "O",
playerSign = "X",
runBot = true;
console.log(array[1]);
function clickedBox(element){
        
        element.innerHTML = human;
        element.setAttribute("id", playerSign);
        players.classList.add("active");
    
    selectWinner();
    element.style.pointerEvents = "none";
    playBoard.style.pointerEvents = "none";
    let randomTimeDelay = ((Math.random() * 1000) + 200).toFixed(0);

    setTimeout(()=>{
        bot(runBot);
    }, randomTimeDelay);
}


function bot(){
    let array = [];
    if(runBot){
        playerSign = "X";
        for (let i = 0; i < allBox.length; i++) {
            if(allBox[i].childElementCount == 0){
                array.push(i);
            }
        }
        let randomBox = bestMove(array);
        if(array.length > 0){
            if(allBox[randomBox].innerHTML == ""){
                allBox[randomBox].innerHTML = ai;
                players.classList.remove("active");
                allBox[randomBox].setAttribute("id", playerSign);
            }
            else{
                 randomBox = bestMove(array);
                 bot(runBot)

            }
            selectWinner();
        }
        allBox[randomBox].style.pointerEvents = "none";
        playBoard.style.pointerEvents = "auto";
        playerSign = "O";
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
        return "won";
    }else{
        if(getIdVal(1) != "" && getIdVal(2) != "" && getIdVal(3) != "" && getIdVal(4) != "" && getIdVal(5) != "" && getIdVal(6) != "" && getIdVal(7) != "" && getIdVal(8) != "" && getIdVal(9) != ""){
            runBot = false;
            bot(runBot);
            setTimeout(()=>{
                resultBox.classList.add("show");
                playBoard.classList.remove("show");
            }, 700);
            wonText.textContent = "Match has been drawn!";
            return "tie";
        }
    }
    return null;
}

replayBtn.onclick = ()=>{
    window.location.reload();
}

function bestMove(board) {
    
    let v = -Infinity;
    let move;
    for (let i = 0; i < board.length; i++) {
      if (board[i] == '') {
        board[i] = 'O';
        let score = alphabeta(board, 0, -Infinity, Infinity, false);
        board[i]= '';
        if (score > v) {
          v = score;
          move = i;
        }
      }
    }
    board[move]= 'O';
    return move;
  }
  
  
  let scores = {
    X: 1,
    O: -1,
    tie: 0
  };
 
  function alphabeta(board, depth, alpha, beta, isMaximizing) {
    let result = selectWinner();
    if (result !== null) {
      return scores[result];
    }
  
    if (isMaximizing) {
      let v = -Infinity;
      for (let i = 0; i < 9; i++) {
          if (board[i] == '') {
            board[i] = 'X';
            let score = alphabeta(board, depth + 1, alpha, beta, false);
            board[i] = '';
            if(level=="Hard"){
            v = score > v ? score : v }
            else if (level=='Easy'){
            v = score < v ? score : v}
            else if (level=="Medium"){
            v = Math.random() < 0.5 ? score : v;}
            alpha = alpha > v ? alpha : v 
            if(beta < alpha || beta == alpha)
            break;
          }
      }
      return v;
    } else {
      let v = Infinity;
      for (let i = 0; i < 9; i++) {
          if (board[i] == '') {
            board[i] = 'O';
            let score = alphabeta(board, depth + 1, alpha, beta, true);
            board[i] = '';
            if(level=="Hard"){
            v = score < v ? score : v }
            else if (level=='Easy'){
            v = score > v ? score : v }
            else if (level=="Medium"){
            v = Math.random() < 0.5 ? score : v;}
            beta = beta < v ? beta : v 
            if(beta < alpha || beta == alpha)
            break;
          }
      }
      return v;
    }
  }