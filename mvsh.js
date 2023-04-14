const selectBox = document.querySelector(".select-box"),
selectBtnX = selectBox.querySelector(".options .playerX"),
selectBtnO = selectBox.querySelector(".options .playerO"),
playBoard = document.querySelector(".play-board"),
players = document.querySelector(".players"),
allBox = document.querySelectorAll("section span"),
resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text"),
replayBtn = resultBox.querySelector("button")
defBtn = document.querySelector(".def");
var level="hi";
var humanPlayer , combuterPlayer ;


function setlevel(value){
  sessionStorage.setItem('level1', value);
  level = sessionStorage.getItem('level1');
  console.log(level)
}

window.onload = ()=>{
    for (let i = 0; i < allBox.length; i++) {
       allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
}

selectBtnX.onclick = ()=>{
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
    humanPlayer = "X";
    combuterPlayer ="O";
    

}

selectBtnO.onclick = ()=>{ 
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
    
    players.setAttribute("class", "players active player");
    humanPlayer = "O";
    combuterPlayer ="X";
}


replayBtn.onclick = ()=>{
    window.location.reload();
}





