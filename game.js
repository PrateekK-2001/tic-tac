const cells = document.querySelectorAll('[data-cell]');
const resetButton = document.getElementById('resetButton');
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modal-message');
const newGameButton = document.getElementById('newGameButton');
const currentPlayerDisplay = document.getElementById('currentPlayer');
let currentPlayer = 'X';

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function checkWin() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return cells[a].classList.contains(currentPlayer) &&
               cells[b].classList.contains(currentPlayer) &&
               cells[c].classList.contains(currentPlayer);
    });
}

function checkDraw() {
    return [...cells].every(cell => cell.classList.contains('X') || cell.classList.contains('O'));
}

function handleClick(event) {
    const cell = event.target;
    if (cell.classList.contains('X') || cell.classList.contains('O')) return;
    
    cell.classList.add(currentPlayer);
    cell.textContent = currentPlayer;

    if (checkWin()) {
        setTimeout(() => showModal(`${currentPlayer} wins!`), 10);
        return;
    }

    if (checkDraw()) {
        setTimeout(() => showModal('It\'s a draw!'), 10);
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    currentPlayerDisplay.textContent = currentPlayer;
}

function showModal(message) {
    modalMessage.textContent = message;
    modal.style.display = 'flex';
}

function resetGame() {
    cells.forEach(cell => {
        cell.classList.remove('X', 'O');
        cell.textContent = '';
    });
    currentPlayer = 'X';
    currentPlayerDisplay.textContent = currentPlayer;
    modal.style.display = 'none';
}

function newGame() {
    resetGame();
    modal.style.display = 'none';
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
newGameButton.addEventListener('click', newGame);
