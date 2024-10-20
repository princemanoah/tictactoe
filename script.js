const board = document.getElementById('board');
const restartButton = document.getElementById('restart');
const scoreXDisplay = document.getElementById('scoreX');
const scoreODisplay = document.getElementById('scoreO');
const statusDisplay = document.getElementById('status');
let Board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let scores = { X: 0, O: 0 }; // Initialize scores

function createBoard() {
    Board.forEach((_, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => handleCellClick(index));
        board.appendChild(cell);
    });
}

function handleCellClick(index) {
    if (Board[index] === '' && currentPlayer === 'X') {
        Board[index] = currentPlayer;
        render();
        if (!checkWin()) {
            currentPlayer = 'O';
            aiMove();
        }
    }
}

function aiMove() {
    let availableCells = Board.map((val, index) => val === '' ? index : null).filter(val => val !== null);
    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    Board[randomIndex] = currentPlayer;
    render();
    checkWin();
    currentPlayer = 'X';
}

function render() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.textContent = Board[index];
    });
    updateScoreDisplay();
}

function updateScoreDisplay() {
    scoreXDisplay.textContent = scores.X;
    scoreODisplay.textContent = scores.O;
}

function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (Board[a] && Board[a] === Board[b] && Board[a] === Board[c]) {
            statusDisplay.textContent = `${Board[a]} wins!`;
            scores[Board[a]]++;
            updateScoreDisplay();
            document.querySelectorAll('.cell')[a].classList.add('winner');
            document.querySelectorAll('.cell')[b].classList.add('winner');
            document.querySelectorAll('.cell')[c].classList.add('winner');
            return true;
        }
    }
    if (Board.every(cell => cell !== '')) {
        statusDisplay.textContent = "It's a tie!";
        return true;
    }
    return false;
}

restartButton.addEventListener('click', () => {
    Board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    statusDisplay.textContent = '';
    render();
    document.querySelectorAll('.cell').forEach(cell => cell.classList.remove('winner')); // Reset winning highlights
});

createBoard();