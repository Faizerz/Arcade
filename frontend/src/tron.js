let p1move
let p2move

document.addEventListener('click', event => {
  if (event.target.id == 'tron') {
    state = {
      game: 'Tron',
      board: makeBoard(40),
      player1: {
        head: [20, 0],
        class: "blue",
        direction: "right",
        up: 87,
        down: 83,
        left: 65,
        right: 68
      },
      player2: {
        head: [20, 39],
        class: "pink",
        direction: "left",
        up: 38,
        down: 40,
        left: 37,
        right: 39
      }
    }


    gameBox.innerText = ""
    newBoard = renderBoard(state.board)
    gameBox.append(newBoard)
    gameTitle.innerText = "Tron"

    function setStart(playerObj) {
      let row = document.querySelector(`[data-y = '${playerObj.head[0]}']`)
      let td = row.querySelector(`[data-x = '${playerObj.head[1]}']`)
      td.className = playerObj.class
    }

    setStart(state.player1)
    setStart(state.player2)

    instructBox.innerHTML = `
    <h2 class="title is-6">Instructions</h2><br>
    <div style="font-size: 12px;"
      <p>Don't hit the edge of the map</p><br>
      <p>Don't hit a tron trail</p><br>
      <p>Last one alive Wins</p><br>
      <p>P1: W A S D</p><br>
      <p>P2: &#8593; &#11013; &#8595; &#10132;</p><br>
      <div class="cell"></div><br>
      <h2 class="title is-7">Key</h2>
      <div class="blue key"></div>Player 1<br><br>
      <div class="pink key"></div>Player 2<br><br>
    </div>
    `

    changeDirection(state.player1)
    changeDirection(state.player2)

    p1move = setInterval(() => movePlayer(state.player1), 65);
    p2move = setInterval(() => movePlayer(state.player2), 65);


  }
}) //end of event listener

function movePlayer(person) {
  //get head location
  let tronLocation = person.head

  if (person.direction == 'up') {
    tronLocation[0]--
    if (tronLocation[0] == -1) {
      tronLocation[0] = 39
      if (tronCollision(person)) {
        singleMove(person, tronLocation[0], tronLocation[1])
      }
    } else {
      if (tronCollision(person)) {
        singleMove(person, tronLocation[0], tronLocation[1])
      }
    }
  } else if (person.direction == 'down') {
    tronLocation[0]++
    if (tronLocation[0] == 40) {
      tronLocation[0] = 0
      if (tronCollision(person)) {
        singleMove(person, tronLocation[0], tronLocation[1])
      }
    } else {
      if (tronCollision(person)) {
        singleMove(person, tronLocation[0], tronLocation[1])
      }
    }
  } else if (person.direction == 'left') {
    tronLocation[1]--
    if (tronLocation[1] == -1) {
      tronLocation[1] = 39
      if (tronCollision(person)) {
        singleMove(person, tronLocation[0], tronLocation[1])
      }
    } else {
      if (tronCollision(person)) {
        singleMove(person, tronLocation[0], tronLocation[1])
      }
    }
  } else if (person.direction == 'right') {
    tronLocation[1]++
    if (tronLocation[1] == 40) {
      tronLocation[1] = 0
      if (tronCollision(person)) {
        singleMove(person, tronLocation[0], tronLocation[1])
      }
    } else {
      if (tronCollision(person)) {
        singleMove(person, tronLocation[0], tronLocation[1])
      }
    }
  }
}

function singleMove(person, yLoc, xLoc) {
  let row = document.querySelector(`[data-y = '${yLoc}']`)
  let newPos = row.querySelector(`[data-x = '${xLoc}']`)
  newPos.className = person.class
}


function changeDirection(person) {
  document.addEventListener('keydown', e => {
    if (e.keyCode == person.up) {
      if (person.direction != 'down') {
        person.direction = 'up'
      }
    } else if (e.keyCode == person.down) {
      if (person.direction != 'up') {
        person.direction = 'down'
      }
    } else if (e.keyCode == person.left) {
      if (person.direction != 'right') {
        person.direction = 'left'
      }
    } else if (e.keyCode == person.right) {
      if (person.direction != 'left') {
        person.direction = 'right'
      }
    }
  })
}


function lose(person) {
  clearInterval(p1move)
  clearInterval(p2move)

  if (person.class == 'blue') {
    alert(`Pink Wins`)
    document.getElementById('board').remove()
    gameBox.innerHTML = `<div id='end-game' style='margin-top:250px;'><span style='color:deeppink'>Pink</span> Wins</div>`
  } else if (person.class == 'pink') {
    alert(`Blue Wins`)
    document.getElementById('board').remove()
    gameBox.innerHTML = `<div id='end-game' style='margin-top:250px;'><span style='color:deepskyblue'>Blue</span> Wins</div>`
  }
}

function tronCollision(person) {
  let row = document.querySelector(`[data-y = '${person.head[0]}']`)
  let newPos = row.querySelector(`[data-x = '${person.head[1]}']`)
  if (newPos.className == 'blue' || newPos.className == 'pink') {
    lose(person)
    return false;
  }
  return true
}






//
