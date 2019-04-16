const gameBox = document.getElementById('game-box')
const instructBox = document.getElementById('instructions')
const gameTitle = document.getElementById('game-title')
const artBtn = document.getElementById('pixel-art')

//Make the arcade fit the screen size
const arcadeBox = document.getElementById('arcade')
arcadeBox.style.height = window.innerHeight + 20 + "px"


//Make a 2D array based on the 'size' chosen
function makeBoard(size) {
  return Array(size).fill().map(() => Array(size).fill(''))
}

//Render a board based on the size of the board given
function renderBoard(board, extraClass="") {
  let y = 0
  const boardEl = document.createElement('table')
  for (const row of board) {
    let x = 0
    const rowEl = document.createElement('tr')
    for (const cell of row) {
      const cellEl = document.createElement('td')
      cellEl.className = "cell " + extraClass
      cellEl.dataset.x = x
      cellEl.dataset.y = y
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
