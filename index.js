const gameBoard = document.querySelector('#game-board');

// There has got to be a better way to do this
const squareOne = document.querySelector('#one');
const squareTwo = document.querySelector('#two');
const squareThree = document.querySelector('#three');
const squareFour = document.querySelector('#four');
const squareFive = document.querySelector('#five');
const squareSix = document.querySelector('#six');
const squareSeven = document.querySelector('#seven');
const squareEight = document.querySelector('#eight');
const squareNine = document.querySelector('#nine');

function addMultipleEventListener(element, events, handler) {
  events.forEach((e) => element.addEventListener(e, handler));
}

let currentPlayer = 'O';
let numberOfUsedSquares = 0;
let isGameOver = false;

const grid = [
  [false, false, false],
  [false, false, false],
  [false, false, false],
];

const handleCatsGame = () => {
  gameBoard.style.pointerEvents = 'none';
  isGameOver = true;
  document.querySelector('#winner').style.display = 'flex';
  document.querySelector('#winner').textContent = "Game over: Cat's Game";
  document.querySelector('#current-player').style.display = 'none';
};

const declareWinner = (winningPlayer) => {
  gameBoard.style.pointerEvents = 'none';
  isGameOver = true;
  document.querySelector('#winner').style.display = 'flex';
  document.querySelector(
    '#winner'
  ).textContent = `Game over: ${winningPlayer} wins!`;
  document.querySelector('#current-player').style.display = 'none';
};

const checkRowsForWinner = () => {
  for (const row of grid) {
    let firstValue = row[0];
    if (row[0] === false) {
      continue;
    }
    if (row[1] === firstValue && row[2] === firstValue) {
      declareWinner(firstValue);
    }
  }
};

const checkColumnsForWinner = () => {
  const columnOne = [grid[0][0], grid[1][0], grid[2][0]];
  const columnTwo = [grid[0][1], grid[1][1], grid[2][1]];
  const columnThree = [grid[0][2], grid[1][2], grid[2][2]];
  const columns = [columnOne, columnTwo, columnThree];
  for (const column of columns) {
    let firstValue = column[0];
    if(firstValue === false) {
      continue;
    }
    if (firstValue === column[1] && firstValue === column[2]) {
      declareWinner(firstValue);
    }
  }
};

const checkDiagonalForWinner = () => {
  const angleOne = [grid[0][0], grid[1][1], grid[2][2]];
  const angleTwo = [grid[0][2], grid[1][1], grid[2][0]];
  const angles = [angleOne, angleTwo];
  for (const angle of angles) {
    let firstValue = angle[0];
    if(firstValue === false) {
      continue;
    }
    if (firstValue === angle[1] && firstValue === angle[2]) {
      declareWinner(firstValue);
    }
  }
}

const traverseGrid = () => {
  checkRowsForWinner();
  checkColumnsForWinner();
  checkDiagonalForWinner();
};

const checkGameStatus = () => {
  if (numberOfUsedSquares === 9) {
    handleCatsGame();
  }
  traverseGrid();
};

const changePlayer = () => {
  document.querySelector('#current-player').textContent = `Current Player: ${currentPlayer}`

  currentPlayer === 'X' ? (currentPlayer = 'O') : (currentPlayer = 'X');
};

gameBoard.addEventListener('click', (e) => {
  checkGameStatus();
});

const handleSquareSelection = (id) => {
  changePlayer();
  numberOfUsedSquares += 1;
  document.querySelector(`#${id}`).textContent = currentPlayer;
  if (currentPlayer === 'X') {
    document.querySelector(`#${id}`).style.backgroundColor = 'gray';
  } else {
    document.querySelector(`#${id}`).style.backgroundColor = 'red';
  }
};

const updateGrid = (e) => {
  const id = e.currentTarget.id;
  handleSquareSelection(id);
  switch (id) {
    case 'one':
      grid[0][0] = currentPlayer;
      break;
    case 'two':
      grid[0][1] = currentPlayer;
      break;
    case 'three':
      grid[0][2] = currentPlayer;
      break;
    case 'four':
      grid[1][0] = currentPlayer;
      break;
    case 'five':
      grid[1][1] = currentPlayer;
      break;
    case 'six':
      grid[1][2] = currentPlayer;
      break;
    case 'seven':
      grid[2][0] = currentPlayer;
      break;
    case 'eight':
      grid[2][1] = currentPlayer;
      break;
    case 'nine':
      grid[2][2] = currentPlayer;
      break;
    default:
      break;
  }
};

squareOne.addEventListener('click', updateGrid);
squareTwo.addEventListener('click', updateGrid);
squareThree.addEventListener('click', updateGrid);
squareFour.addEventListener('click', updateGrid);
squareFive.addEventListener('click', updateGrid);
squareSix.addEventListener('click', updateGrid);
squareSeven.addEventListener('click', updateGrid);
squareEight.addEventListener('click', updateGrid);
squareNine.addEventListener('click', updateGrid);


document.querySelector('button').addEventListener('click', () => {
  document.location.reload();
});