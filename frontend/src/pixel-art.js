document.addEventListener('click', event => {
  if (event.target.id == 'pixel-art') {

    clearInterval(p1move)
    clearInterval(p2move)

    state = {
      game: 'Pixel Art',
      board: makeBoard(15),
      color: "black"
    }

    gameBox.innerText = ""
    newBoard = renderBoard(state.board, 'paint')
    gameBox.append(newBoard)
    gameTitle.innerText = "Pixel Art"

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

    colorChooser = document.createElement('div')

    colorChooser.innerHTML = `
      <div class="red palette"></div>
      <div class="blue palette"></div>
      <div class="green palette"></div>
      <div class="yellow palette"></div>
      <div class="orange palette"></div>
      <div class="purple palette"></div>
      <div class="white palette"></div>
      <div class="black palette"></div>
    `

    gameBox.appendChild(colorChooser)

  }

  if (state.game == 'Pixel Art') {
    let selectedColor = event.target.className.split(" ")[0]
    let targetCellPaint = event.target.className.split(" ")[0] + " " + event.target.className.split(" ")[1]

    if (targetCellPaint == 'cell paint') {
      event.target.className = 'cell paint ' + state.color
      state.board[parseInt(event.target.parentElement.dataset.y)][parseInt(event.target.dataset.x)] = state.color
    } else if (selectedColor == "red") {
      state.color = "red"
    } else if (selectedColor == "blue") {
      state.color = "blue"
    } else if (selectedColor == "green") {
      state.color = "green"
    } else if (selectedColor == "yellow") {
      state.color = "yellow"
    } else if (selectedColor == "orange") {
      state.color = "orange"
    } else if (selectedColor == "purple") {
      state.color = "purple"
    } else if (selectedColor == "white") {
      state.color = "white"
    } else if (selectedColor == "black") {
      state.color = "black"
    }

  }

})
