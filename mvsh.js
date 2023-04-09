const selectBox = document.querySelector(".select-box"),
selectBtnX = selectBox.querySelector(".options .playerX"),
selectBtnO = selectBox.querySelector(".options .playerO"),
playBoard = document.querySelector(".play-board"),
players = document.querySelector(".players"),
allBox = document.querySelectorAll("section span"),
resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text"),
replayBtn = resultBox.querySelector("button");
var survey = []; //Bidimensional array: [ [1,3], [2,4] ]
window.onload = ()=>{
    for (let i = 0; i < allBox.length; i++) {
       allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
}

selectBtnX.onclick = ()=>{
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
    

}

selectBtnO.onclick = ()=>{ 
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
    
    players.setAttribute("class", "players active player");
}


replayBtn.onclick = ()=>{
    window.location.reload();
}



//Switcher function:
$(".rb-tab").click = ()=>{
  //Spot switcher:
  $(this).parent().find(".rb-tab").removeClass("rb-tab-active");
  $(this).setAttribute("rb-tab-active");
};
