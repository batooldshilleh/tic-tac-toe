const selectBox = document.querySelector(".select-box"),
playBoard = document.querySelector(".play-board"),
players = document.querySelector(".players"),
allBox = document.querySelectorAll("section span"),
resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text"),
replayBtn = resultBox.querySelector("button");
let boxes = document.querySelectorAll(".box");
let currentPlayer = "X";
let gameOver = false;

window.onload = ()=>{
    for (let i = 0; i < allBox.length; i++) {
       allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
}

selectBox.classList.add("hide");
playBoard.classList.add("show");

for (let i = 0; i < 9; i+=1) {
    boxes[i].addEventListener("click", function() {
        if (!gameOver && this.innerHTML == "") {
            this.innerHTML = currentPlayer;
            if (currentPlayer == 'X'){
                players.classList.add("active");
            }
            else{
                players.classList.remove("active");
            }
            if (checkWin()) {
                resultBox.classList.add("show");
                playBoard.classList.remove("show");
                wonText.innerHTML = `Player <p>${currentPlayer}</p> won the game!`;
                gameOver = true;
            } else if (checkDraw()) {
                resultBox.classList.add("show");
                playBoard.classList.remove("show");
                wonText.textContent = "Match has been drawn!";
                gameOver = true;
            } else {
                currentPlayer = currentPlayer == "X" ? "O" : "X";
                
            }
            
        }
    });
}

function checkWin() {
    let winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < winningCombos.length; i++) {
        if (boxes[winningCombos[i][0]].innerHTML == currentPlayer
            && boxes[winningCombos[i][1]].innerHTML == currentPlayer
            && boxes[winningCombos[i][2]].innerHTML == currentPlayer) {
            return true;
        }
    }
    return false;
}

function checkDraw() {
    for (let i = 0; i < 9; i++) {
        if (boxes[i].innerHTML == "") {
            return false;
        }
    }
    return true;
}


replayBtn.onclick = ()=>{
    window.location.reload();
}