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

    /// INSTRUCTIONS PANEL
        instructBox.innerHTML = `
        <h2 class="title is-6">Instructions</h2><br>
        <div style="font-size: 12px;"
          <p> Click the Switch!!</p><br>
          <p> See what happens!?</p><br>
        </div>
        `
    
  //// BUTTON
  const table = document.getElementById("board")
      column = table.getElementsByTagName("tr")[2]
          cell = column.getElementsByTagName("td")[2]
          cell.innerHTML = `<label class="switch">
                            <input type="checkbox" checked>
                            <span class="slider"></span>
                           </label><br>
                          `


} } )
