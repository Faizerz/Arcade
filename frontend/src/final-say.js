document.addEventListener('click', event => {
  if (event.target.id == 'clicker') {

        state = {
          game: 'Clicker',
          board: makeBoard(5),
          }

    gameBox.innerText = ""
    newBoard = renderBoard(state.board)
    gameBox.append(newBoard)
    gameTitle.innerText = "Clicker"



} } )
