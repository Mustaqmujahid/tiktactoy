const board = document.getElementById("gameBoard");
const statusDisplay = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");
const playerXInput = document.getElementById("playerX");
const playerOInput = document.getElementById("playerO");
const scoreXDisplay = document.getElementById("scoreX");
const scoreODisplay = document.getElementById("scoreO");

let boardState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let scores = { X: 0, O: 0 };

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function createBoard() {
    board.innerHTML = "";
    boardState.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.setAttribute("data-cell-index", index);
        cellElement.textContent = cell;
        cellElement.addEventListener("click", handleCellClick);
        board.appendChild(cellElement);
    });
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = clickedCell.getAttribute("data-cell-index");

    if (boardState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    boardState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    checkResult();
}

function checkResult() {
    let roundWon = false;

    winningConditions.forEach((condition) => {
        const [a, b, c] = condition;
        if (boardState[a] === "" || boardState[b] === "" || boardState[c] === "") {
            return;
        }
        if (boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
        }
    });

    if (roundWon) {
        statusDisplay.textContent = `${getCurrentPlayerName()} wins!`;
        scores[currentPlayer]++;
        updateScoreboard();
        gameActive = false;
        return;
    }

    if (!boardState.includes("")) {
        statusDisplay.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function getCurrentPlayerName() {
    return currentPlayer === "X" ? playerXInput.value : playerOInput.value;
}

function updateScoreboard() {
    scoreXDisplay.textContent = scores.X;
    scoreODisplay.textContent = scores.O;
}

restartBtn.addEventListener("click", () => {
    boardState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    statusDisplay.textContent = "";
    createBoard();
});

createBoard();