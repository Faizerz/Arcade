document.addEventListener('click', event => {
  if (event.target.id == 'bank-robba') {

    state = {
      game: 'Bank Robba',
      board: makeBoard(20),
      color: "black"
    }

    gameBox.innerText = ""
    newBoard = renderBoard(state.board)
    gameBox.append(newBoard)
    gameTitle.innerText = "Bank Robba"

    instructBox.innerHTML = `
      <h2 class="title is-6">Instructions</h2><br>
      <div style="font-size: 12px;"
        <p>Select a colour to paint a pixel</p><br>
        <p>Click a pixel to fill it in that colour</p><br>
        <p>Be as creative as you want</p><br>
        <p>Save the picture once you're happy.</p><br>
        <p>Remember the name as you will need it to load the picture back from the database</p>
      </div>
    `


  }
})
