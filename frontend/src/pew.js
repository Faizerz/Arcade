let pew = 0;
let bullInterval

document.addEventListener('click', event => {
  if (event.target.id == 'pew-pew') {

    clearInterval(p1move)
    clearInterval(p2move)

    state = {
      game: 'Pew Pew',
      board: makeBoard(20),
      player1: {
        position: [0, 0],
        direction: "up",
        bullet: [0, 0],
        bullDirection: "up",
        class: "greenPlayer",
        up: 87,
        down: 83,
        left: 65,
        right: 68,
        shoot: 49
      },
      player2: {
        position: [19, 19],
        direction: "down",
        bullet: [19, 19],
        bullDirection: "down",
        class: "orangePlayer",
        up: 38,
        down: 40,
        left: 37,
        right: 39,
        shoot: 32
      }
    }

    gameBox.innerText = ""
    newBoard = renderBoard(state.board)
    gameBox.append(newBoard)
    gameTitle.innerText = "Pew Pew"


    function giveClass(cellArr, cellClass) {
      let p = 1
      cellArr.forEach(cell => state.board[cell[0]][cell[1]] = cellClass)
      cellArr.forEach(function(cell) {
        let row = document.querySelector(`[data-y = '${cell[0]}']`)
        let foundCell = row.querySelector(`[data-x = '${cell[1]}']`)
        foundCell.className = cellClass
      })
    }


    giveClass(greenPlayer, 'greenPlayer')
    giveClass(orangPlayer, 'orangePlayer')
    giveClass(pewWalls, 'walls')

    if (pew == 0) {
      pewController(state.player1)
      pewController(state.player2)
      pew++
    }


  }
})


function pewController(player) {
  document.addEventListener('keydown', e => {

    if (e.keyCode == player.up) {
      movePew(player, 'up')
    } else if (e.keyCode == player.down) {
      movePew(player, 'down')
    } else if (e.keyCode == player.left) {
      movePew(player, 'left')
    } else if (e.keyCode == player.right) {
      movePew(player, 'right')
    } else if (e.keyCode == player.shoot) {
      shoot(player)
    }
  })
}

function movePew(player, direction) {
  let oldRow = document.querySelector(`[data-y = '${player.position[0]}']`)
  let oldPos = oldRow.querySelector(`[data-x = '${player.position[1]}']`)
  if (direction == 'up') {
    oldPos.id = 'up'
    if (player.position[0] - 1 >= 0) {
      let newRow = document.querySelector(`[data-y = '${player.position[0]-1}']`)
      let newPos = newRow.querySelector(`[data-x = '${player.position[1]}']`)
      player.direction = 'up'
      if (pewCollision(player, newPos)) {
        oldPos.className = "cell"
        newPos.className = player.class
        player.position[0]--
        player.bullet[0]--
        newPos.id = 'up'
      }
    }
  } else if (direction == 'down') {
    oldPos.id = 'down'
    if (player.position[0] + 1 < 20) {
      let newRow = document.querySelector(`[data-y = '${player.position[0]+1}']`)
      let newPos = newRow.querySelector(`[data-x = '${player.position[1]}']`)
      player.direction = 'down'
      if (pewCollision(player, newPos)) {
        oldPos.className = "cell"
        newPos.className = player.class
        player.position[0]++
        player.bullet[0]++
        newPos.id = 'down'
      }
    }
  } else if (direction == 'left') {
    oldPos.id = 'left'
    if (player.position[1] - 1 >= 0) {
      let newRow = document.querySelector(`[data-y = '${player.position[0]}']`)
      let newPos = newRow.querySelector(`[data-x = '${player.position[1]-1}']`)
      player.direction = 'left'
      if (pewCollision(player, newPos)) {
        oldPos.className = "cell"
        newPos.className = player.class
        player.position[1]--
        player.bullet[1]--
        newPos.id = 'left'
      }
    }
  } else if (direction == 'right') {
    oldPos.id = 'right'
    if (player.position[0] + 1 < 20) {
      let newRow = document.querySelector(`[data-y = '${player.position[0]}']`)
      let newPos = newRow.querySelector(`[data-x = '${player.position[1]+1}']`)
      player.direction = 'right'
      if (pewCollision(player, newPos)) {
        oldPos.className = "cell"
        newPos.className = player.class
        player.position[1]++
        player.bullet[1]++
        newPos.id = 'right'
      }
    }
  }
}

function pewCollision(player, position) {
  if (position.className == 'walls' || position.className == 'greenPlayer' || position.className == 'orangePlayer') {
    return false
  } else {
    return true
  }
}

function shoot(player) {
  player.bullDirection = [...player.direction]
  player.bullet = [...player.position]
  bullInterval = setInterval(() => moveBullet(player), 10);

}

function moveBullet(player) {
  let bulletLoc = player.bullet

  let oldBullRow = document.querySelector(`[data-y = '${bulletLoc[0]}']`)
  let oldBullPos = oldBullRow.querySelector(`[data-x = '${bulletLoc[1]}']`)
  if (player.bullDirection == 'up') {
    let newBullRow = document.querySelector(`[data-y = '${bulletLoc[0]-1}']`)
    let newBullPos = newBullRow.querySelector(`[data-x = '${bulletLoc[1]}']`)
    if (collisionBullet(newBullPos, player)) {
      bulletLoc[0]--
      newBullPos.className = 'bullet'
      oldBullPos.className = 'cell'
    }
  } else if (player.bullDirection == 'down') {
    let newBullRow = document.querySelector(`[data-y = '${bulletLoc[0]+1}']`)
    let newBullPos = newBullRow.querySelector(`[data-x = '${bulletLoc[1]}']`)
    if (collisionBullet(newBullPos, player)) {
      bulletLoc[0]++
      newBullPos.className = 'bullet'
      oldBullPos.className = 'cell'
    }
  } else if (player.bullDirection == 'left') {
    let newBullRow = document.querySelector(`[data-y = '${bulletLoc[0]}']`)
    let newBullPos = newBullRow.querySelector(`[data-x = '${bulletLoc[1]-1}']`)
    if (collisionBullet(newBullPos, player)) {
      bulletLoc[1]--
      newBullPos.className = 'bullet'
      oldBullPos.className = 'cell'
    }
  } else if (player.bullDirection == 'right') {
    let newBullRow = document.querySelector(`[data-y = '${bulletLoc[0]}']`)
    let newBullPos = newBullRow.querySelector(`[data-x = '${bulletLoc[1]+1}']`)
    if (collisionBullet(newBullPos, player)) {
      bulletLoc[1]++
      newBullPos.className = 'bullet'
      oldBullPos.className = 'cell'
    }
  }
}


function collisionBullet(bullPos, player) {
  if (bullPos.className == 'walls') {
    player.bullet = [...player.position]
    player.bullDirection = [...player.direction]
    clearInterval(bullInterval)
    return false
  } else if (bullPos.className == 'greenPlayer') {
    console.log('green dead')
    clearInterval(bullInterval)
  } else if (bullPos.className == 'orangePlayer') {
    console.log('green dead')
    clearInterval(bullInterval)
  } else {
    return true
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
