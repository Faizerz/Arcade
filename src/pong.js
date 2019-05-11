document.addEventListener('click', event => {
  if (event.target.id == 'pong') {

/// INSTRUCTIONS PANEL
  instructBox.innerHTML = `
                          <h2 class="title is-6">Instructions</h2><br>
                          <div style="font-size: 11px;"
                            <p> Random Pong! </p><br>
                            <p> Play a friend 1v1! </p><br>
                            <p> But beware the random </p><br>
                            <p> generated ball! </p><br>
                          </div>
                          `
/// RENDER GAME BOARD
  gameTitle.innerText = "Pong"
  gameBox.innerHTML = ""
  gameBox.id = 'game-box'

const gameEl = document.createElement('div')
      gameEl.innerHTML = `
                      <div id="left"></div>
                      <div id="ball"></div>
                      <div id="right"></div>
                      `
      gameBox.append(gameEl)

const scoreEl = document.createElement('div')
      scoreEl.innerHTML = `
                        <center>
                        <span id="scoreleft"> 0 </span>
                        <span id="deli"> : </span>
                        <span id="scoreright"> 0 </span>
                        <br>
                        <span id="goal"> GOAL !!! </span>
                        `
      gameBox.append(scoreEl)


var ps = 15

function nfp(urpx) {
  return Number(urpx.replace("px", ""))
    }

    var r = document.getElementById('right');
    var l = document.getElementById('left');
    var b = document.getElementById('ball');

    var rscore = document.getElementById('scoreleft');
    var lscore = document.getElementById('scoreright');
    var ogoal = document.getElementById('goal');

    var w = window.innerWidth;
    var h = window.innerHeight;

    var map = []; // Or you could call it "key"
    onkeydown = onkeyup = function(e) {
        e = e || event; // to deal with IE
        map[e.keyCode] = e.type == 'keydown';
        /*insert conditional here*/
    }

    function keydown() {
        //if key was up arrow
        if (map[40]) {
            if (nfp(r.style.top) + ps > h - 200)
                r.style.top = h - 200 + "px";
            else
                r.style.top = nfp(r.style.top) + ps + "px";
        }
        //if key was down arrow
        else if (map[38]) {
            if (nfp(r.style.top) - ps < 0)
                r.style.top = 0 + "px";
            else
                r.style.top = nfp(r.style.top) - ps + "px";
        }
        //if key was s
        if (map[83]) {
            if (nfp(l.style.top) + ps > h - 200)
                l.style.top = h - 200 + "px";
            else
                l.style.top = nfp(l.style.top) + ps + "px";
        }
        //if key was w
        else if (map[87]) {
            if (nfp(l.style.top) - ps < 0)
                l.style.top = 0 + "px";
            else
                l.style.top = nfp(l.style.top) - ps + "px";
        }
    }

    var speedx = 3,
        speedy = 1;
    var balltime = 1;
    b.style.left = w / 2 + "px";

    function ball() {
        b.style.left = nfp(b.style.left) + speedx + "px";
        b.style.top = nfp(b.style.top) + speedy + "px";
    }

    function moveball() {
        ball();
        //remove overflow y
        if (h < nfp(b.style.top) + 20 || nfp(b.style.top) < 0) {
            speedy *= -1;
        }

        //overflow-x right
        if (nfp(b.style.left) >= w - 50) {
            if (nfp(r.style.top) <= nfp(b.style.top) + 20 && nfp(r.style.top) + 200 >= nfp(b.style.top)) {
                speedx *= -1;
            } else if (nfp(b.style.left) >= w - 20)
                goal('left');
        }

        //remove overflow x in left ir get the goal in left
        if (nfp(b.style.left) <= 30) {
            if (nfp(l.style.top) <= nfp(b.style.top) + 20 && nfp(l.style.top) + 200 >= nfp(b.style.top)) {
                speedx *= -1;
            } else if (nfp(b.style.left) <= 0)
                goal('right');
        }
        setTimeout(function() {
            moveball()
        }, balltime);
    }

    setInterval(function() {
        keydown();
    }, 10);
    moveball();

    function goal(pos) {
        ogoal.style.color = "black";
        setTimeout(function() {
            ogoal.style.color = "black"
        }, 1000);
        if (pos == "left")
            rscore.innerHTML = Number(rscore.innerHTML) + 1;
        else
            lscore.innerHTML = Number(lscore.innerHTML) + 1;
        speedx *= -1;
        b.style.left = w / 2 + "px";
    }


} } )
