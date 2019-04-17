document.addEventListener('click', event => {
  if (event.target.id == 'tron') {
    state = {
      game: 'Tron',
      board: makeBoard(40),
      player1: {
        class: "aqua",
        up: 38,
        down: 40,
        left: 37,
        right: 39,
      },
      player2: {
        class: "pink",
        up: 87,
        down: 83,
        left: 65,
        right: 68
      }
    }

    gameBox.innerText = ""
    newBoard = renderBoard(state.board)
    gameBox.append(newBoard)
    gameTitle.innerText = "Tron"
  }
}) //end of event listener
