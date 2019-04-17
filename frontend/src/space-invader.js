document.addEventListener('click', event => {
  if (event.target.id == 'space-invader') {

    gameTitle.innerText = "Space Invader"
    gameBox.innerHTML = ""

/// INSTRUCTIONS PANEL
    instructBox.innerHTML = `
    <h2 class="title is-6">Instructions</h2><br>
    <div style="font-size: 12px;"
      <p> Defend Your Planet From An Alien Invasion!!</p><br>
      <p> Defender: &#11013; &#10132;</p><br>
      <p> Use [spacebar] to shoot! </p><br>
    </div>
    `

/// SET UP SPACE BACKGROUND
    const starfield = new Starfield();
		starfield.initialise(gameBox);
		starfield.start();
		function randomise() {
			starfield.stop();
			starfield.stars = Math.random()*1000 + 50;
			starfield.minVelocity = Math.random()*30+5;
			starfield.maxVelocity = Math.random()*50 + starfield.minVelocity;
			starfield.start();
    }


//////////////////////////////////// END OF SPACE INVADERS EVENT LISTENER
} } )
