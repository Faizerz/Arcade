let br = 0

document.addEventListener('click', event => {
  if (event.target.id == 'bank-robba') {

    state = {
      game: 'Bank Robba',
      board: makeBoard(20),
      gemCount: 0,
      player1: {
        class: "cop",
        up: 38,
        down: 40,
        left: 37,
        right: 39,
      },
      player2: {
        class: "robber",
        up: 87,
        down: 83,
        left: 65,
        right: 68
      }
    }

    gameBox.innerText = ""
    newBoard = renderBoard(state.board)
    gameBox.append(newBoard)
    gameTitle.innerText = "Bank Robba"

    instructBox.innerHTML = `
    <h2 class="title is-6">Instructions</h2><br>
    <div style="font-size: 12px;"
      <p>The Robber must steal 4 Gems to win</p><br>
      <p>The Cop must catch the robber</p><br>
      <p>Use Portals to traverse the map</p><br>
      <p>Robber: W A S D</p><br>
      <p>Cop: &#8593; &#11013; &#8595; &#10132;</p><br>
      <div class="cell"></div><br>
      <h2 class="title is-7">Key</h2>
      <div class="cop key"></div>Cop<br><br>
      <div class="robber key"></div>Robber<br><br>
      <div class="gem key"></div>Gem<br><br>
      <div class="portal key"></div>Portal<br>
    </div>
    `

    function giveClass(cellArr, cellClass) {
      let p = 1
      cellArr.forEach(cell => state.board[cell[0]][cell[1]] = cellClass)
      cellArr.forEach(function(cell) {
        if (cellClass == 'portal') {
          let row = document.querySelector(`[data-y = '${cell[0]}']`)
          let foundCell = row.querySelector(`[data-x = '${cell[1]}']`)
          foundCell.className = cellClass
          foundCell.dataset.p = p
          p++
        } else {
          let row = document.querySelector(`[data-y = '${cell[0]}']`)
          let foundCell = row.querySelector(`[data-x = '${cell[1]}']`)
          foundCell.className = cellClass
        }
      })
    }

    giveClass(robber, 'robber')
    giveClass(cop, 'cop')
    giveClass(gems, 'gem')
    giveClass(portals, 'portal')
    giveClass(walls, 'walls')

    if (br == 0) {
      controller(state.player1)
      controller(state.player2)
    }
    br++
  }
})

function controller(player) {
  document.addEventListener('keydown', e => {
    let carTd = document.querySelector('.' + player.class)

    let carX = parseInt(carTd.dataset.x)
    let carY = parseInt(carTd.parentElement.dataset.y)

    if (e.keyCode == player.up) {
      if (carY > 0) {
        let row = document.querySelector(`[data-y = '${carY-1}']`)
        let newPos = row.querySelector(`[data-x = '${carX}']`)
        if (collisionCheck(newPos, player.class)) {
          carTd.className = "cell"
          newPos.className = player.class
        }
      }
    } else if (e.keyCode == player.down) {
      if (carY < 19) {
        let row = document.querySelector(`[data-y = '${carY+1}']`)
        let newPos = row.querySelector(`[data-x = '${carX}']`)
        if (collisionCheck(newPos, player.class)) {
          carTd.className = "cell"
          newPos.className = player.class
        }
      }
    } else if (e.keyCode == player.left) {
      if (carX > 0) {
        let row = document.querySelector(`[data-y = '${carY}']`)
        let newPos = row.querySelector(`[data-x = '${carX-1}']`)
        if (collisionCheck(newPos, player.class)) {
          carTd.className = "cell"
          newPos.className = player.class
        }
      }
    } else if (e.keyCode == player.right) {
      if (carX < 19) {
        let row = document.querySelector(`[data-y = '${carY}']`)
        let newPos = row.querySelector(`[data-x = '${carX+1}']`)
        if (collisionCheck(newPos, player.class)) {
          carTd.className = "cell"
          newPos.className = player.class
        }
      }
    }
  })
}

function collisionCheck(position, playerClass) {
  if (position.className == 'portal') {
    teleport(position, playerClass)
    return false
  }
  if (playerClass == 'cop') {
    if (position.className == 'walls' || position.className == 'gem') {
      return false
    } else if (position.className == 'robber') {
      gameOver('cop')
    } else {
      return true
    }
  } else if (playerClass == 'robber') {
    if (position.className == 'walls' || position.className == 'cop') {
      return false
    } else if (position.className == 'gem') {
      state.gemCount++
      if (state.gemCount == 4) {
        gameOver('robber')
      }
      return true
    } else {
      return true
    }

  }
}

function teleport(position, playerClass) {
  if (position.dataset.p == "1") {
    let newRow = document.querySelector(`[data-y = '9'`)
    let newPos = newRow.querySelector(`[data-x = '3'`)
    let oldRow = document.querySelector(`[data-y = '6'`)
    let oldPos = oldRow.querySelector(`[data-x = '12'`)

    if (newPos.className == 'cop') {
      return false
    } else if (newPos.className == 'robber') {
      gameOver('cop')
    } else if (oldPos.className == playerClass) {
      oldPos.className = 'cell'
    }
    newPos.className = playerClass
    return false

  } else if (position.dataset.p == "2") {
    let newRow = document.querySelector(`[data-y = '6'`)
    let newPos = newRow.querySelector(`[data-x = '12'`)
    let oldRow = document.querySelector(`[data-y = '9'`)
    let oldPos = oldRow.querySelector(`[data-x = '3'`)

    if (newPos.className == 'cop') {
      return false
    } else if (newPos.className == 'robber') {
      gameOver('cop')
    } else if (oldPos.className == playerClass) {
      oldPos.className = 'cell'
    }
    newPos.className = playerClass
    return false
  }
}

function gameOver(player) {
  document.getElementById('board').remove()
  if (player == 'cop') {
    gameBox.innerHTML = `<div id='end-game' style='margin-top:200px;'>You have been<br><br>ARRESTED<br><br>The <span style='color:blue'>Cop</span> Wins</div>`
  } else if (player == 'robber') {
    gameBox.innerHTML = `<div id='end-game' style='margin-top:200px;'>You have robbed the<br><br>BANK<br><br>The <span style='color:red'>Robber</span> Wins</div>`
  }
}









//
