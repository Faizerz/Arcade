const gameBox = document.getElementById('game-box')
const instructBox = document.getElementById('instructions')
const gameTitle = document.getElementById('game-title')
const artBtn = document.getElementById('pixel-art')

//Make the arcade fit the screen size
const arcadeBox = document.getElementById('arcade')
arcadeBox.style.height = window.innerHeight + 10 + "px"


//Make a 2D array based on the 'size' chosen
function makeBoard(size) {
  return Array(size).fill().map(() => Array(size).fill(''))
}

//Render a board based on the size of the board given
function renderBoard(board, extraClass = "") {
  let y = 0
  const boardEl = document.createElement('table')
  boardEl.id = 'board'
  for (const row of board) {
    let x = 0
    const rowEl = document.createElement('tr')
    rowEl.dataset.y = y
    for (const cell of row) {
      const cellEl = document.createElement('td')
      cellEl.className = "cell " + extraClass
      cellEl.dataset.x = x
      rowEl.append(cellEl)
      x++
    }
    boardEl.append(rowEl)
    y++
  }
  return boardEl
}

//Initial state
state = {
  board: makeBoard(2)
}
let newBoard = renderBoard(state.board)
gameBox.append(newBoard)









//
