let fightState = function(){};
fightState.prototype.create = function (l) {
  this.music = game.add.audio('fightmusic');
  this.music.loop = true;
  this.music.play();
  this.music.volume = .1;

  this.hitsound = game.add.audio('hitsound');
  this.highattacksound = game.add.audio('highattacksound');
  this.lowattacksound = game.add.audio('lowattacksound');
  this.dodgesound = game.add.audio('dodge');

  framerate = 6;
  idletimer = 250;
  game.add.sprite(0,0,"fight"); // load the background
  this.player = game.add.sprite(160, 300, "playeridle"); // 845 X 560 elephant size
  if(currentLevel === 1)this.enemy = game.add.sprite(2200, 300, "enemy1idle");
  else if(currentLevel === 2)this.enemy = game.add.sprite(2200, 300, "enemy2idle");
  else if(currentLevel === 3)this.enemy = game.add.sprite(2200, 300, "enemy3idle");
  else this.enemy = game.add.sprite(2200, 300, "enemy4idle");

  this.player.animations.play('idle', framerate ,true);
  this.player.state = "ready to act";

	game.input.mouse.capture = true;
  this.player.leftdown = false;
  this.player.swipedtop = false;
  this.player.swipedright = false;
  this.player.slope = 0;
  this.player.state = "idle";
  this.player.action = "null"
  this.player.actionframe = 0;
  this.player.actionTimer = 0;

  if(spear_used)this.player.attack = 2;
  else this.player.attack = 1;
  if(shield_used)this.player.defense = 1;
  else this.player.defense = 0;
  if(tooth_used)this.player.health = 15;
  else this.player.health = 10;
  this.player.speed = 3;


  this.playerhptext = game.add.text(16, 16, "HP: ", {fontSize: "128px", fill: "#000000"});
  this.enemyhptext = game.add.text(1550, 16, "HP: ", {fontSize: "128px", fill: "#000000"});

  console.log(currentLevel);
  if (currentLevel==1){ // assign enemy stats per level
    this.enemy.attack = 1;
    this.enemy.speed = 1;
    this.enemy.health = 10;
    this.enemy.skill = 1;
  }
  else if (currentLevel==2){
    this.enemy.attack = 2;
    this.enemy.speed = 1.25;
    this.enemy.health = 10;
    this.enemy.skill = 2;
  }
  else if (currentLevel==3){
    this.enemy.attack = 2;
    this.enemy.speed = 1.5;
    this.enemy.health = 15;
    this.enemy.skill = 3;
  }
  else if (currentLevel==4){
    this.enemy.attack = 2;
    this.enemy.speed = 2;
    this.enemy.health = 20;
    this.enemy.skill = 4;
  }
  this.enemy.defense = 0;
  this.enemy.scale.x *= -1;
  this.enemy.state = "cooling down"; // stores the current state of the enemy
  this.enemy.action = "null"; // stores the current action ie. blocking, attacking
  this.enemy.actionTimer = 0;
  this.enemy.actionSequence = [];
  this.enemy.currentAttackDamge = false;
  this.enemy.active = true;
  this.enemy.cooldown = 60;

	this.enemy.animations.add('idle', [24,25,26,30,31,32],framerate);
	this.enemy.animations.add('high attack',[ 3, 4, 4, 5, 5, 9,10,11],framerate);
	this.enemy.animations.add('high block', [12,13,14,18],framerate);
	this.enemy.animations.add('low attack', [27,27,28,28,29,33,34,35],framerate);
	this.enemy.animations.add('low block',  [ 36, 37, 38, 42, 43],framerate);
	this.enemy.animations.add('hurt', [15,16,17],framerate);
	this.enemy.animations.add('death', [0,1,2,6,7],framerate);
  this.enemy.animations.play("idle",framerate,true);

	this.player.animations.add('idle', [24,25,26,30,31,32],framerate);
  this.player.animations.add('high attack', [3,4,5,9,10,11],framerate);
  this.player.animations.add('high block',  [12,13,14,18],framerate);
  this.player.animations.add('low attack', [27,28,29,33,34,35],framerate);
  this.player.animations.add('low block',   [ 36, 37, 38, 42, 43],framerate);
  this.player.animations.add('hurt', [15,16,17],framerate);
  this.player.animations.add('death', [0,1,2,6,7],framerate);
  this.player.animations.play("idle",framerate,true);

};

fightState.prototype.update = function () {
  //fighting and stuff
  if(this.player.hitcounting){
    this.player.hitcount++;
  }
  if(this.player.actionframe === 0){
  	this.player.state = "idle";
  }
  this.PlayerInput();

  if(this.enemy.active){
  	this.enemyBehavior(this.player,this.enemy);
  }

  this.playerhptext.text = "Your HP: " + this.player.health;
  this.enemyhptext.text = "Enemy HP: " + this.enemy.health;

  if(this.player.actionframe < this.player.speed){
  	this.player.actionframe++;
  }
  //this.updatePlayerAction(this.player);
  if(this.enemy.active){
  	this.checkForDamage(this.player, this.enemy);
  }
  if(this.player.animations.isPlaying == false){
  	this.player.animations.play('idle', framerate ,true);
  }

  //console.log(this.player.animations.currentAnim);
};

fightState.prototype.checkForDamage = function (player,enemy) {
	if(player.state === "high attack" && enemy.action !== "high block"){
		this.DamageCalc(player,enemy);
		if(this.enemy.health <= 0)
  		{
  			if(enemy.state !== 'dead')this.enemy.animations.play('death');
				enemy.state = "dead";
        this.Win();
  		}
  		else
  		{
  			this.enemy.animations.play('hurt');
        this.hitsound.play();
  			enemy.staggercooldown = 90;
				enemy.state = "staggered"
  		}

	}

	else if(player.state === "low attack" && enemy.action !== "low block"){
		this.DamageCalc(player,enemy);
		if(this.enemy.health <= 0)
  		{
				if(enemy.state !== 'dead')this.enemy.animations.play('death');

				enemy.state = "dead";
        this.Win();
  		}
  		else
  		{
  			this.enemy.animations.play('hurt');
        this.hitsound.play();
  			enemy.staggercooldown = 90;
				enemy.state = "staggered"
  		}
	}

	else if(enemy.action === "high attack" && player.state !== "high block"){
		if(enemy.currentAttackDamge === false)this.DamageCalc(enemy,player);
    enemy.currentAttackDamge = true;
		if(this.player.health <= 0)
  		{
  			this.player.animations.play('death');
  			this.Lose();
  		}
  		else
  		{
  			this.player.animations.play('hurt');
        this.hitsound.play();
  			game.time.events.add(idletimer,this.ReturnToIdle,this);

  		}
  	}

	else if(enemy.action === "low attack" && player.state !== "low block"){
    if(enemy.currentAttackDamge === false)this.DamageCalc(enemy,player);
    enemy.currentAttackDamge = true;
		if(this.player.health <= 0)
  			{
  				this.player.animations.play('death');
  				this.Lose();
  			}
  			else
  			{
  				this.player.animations.play('hurt');
          this.hitsound.play();
  				game.time.events.add(idletimer,this.ReturnToIdle,this);
  			}
	}

	this.player.state = "idle";
};


fightState.prototype.updatePlayerAction = function (player) {
  if (player.state !== "null" && this.player.actionTimer===-1) {
    this.player.actionTimer = 0;
  }
  if (player.actionTimer >=0) {
    if (player.state === "high attack"){
      if (player.actionTimer > 15 && player.actionTimer < 45){
        player.action = "high attack";
      }
      else {
        player.action = "null"
      }
    }
    if (player.state === "low attack"){
      if (player.actionTimer > 15 && player.actionTimer < 45){
        player.action = "low attack";
      }
      else {
        player.action = "null"
      }
    }
    if (player.state === "high block"){
      if (player.actionTimer > 0 && player.actionTimer < 60){
        player.action = "high block";
      }
      else {
        player.action = "null"
      }
    }
    if (player.state === "low block"){
      if (player.actionTimer > 0 && player.actionTimer < 60){
        player.action = "low block";
      }
      else {
        player.action = "null"
      }
    }
    player.actionTimer++;
  }
  if (player.actionTimer> 60) {
    player.actionTimer = -1;
    player.state = "null";
  }
};

fightState.prototype.PlayerInput = function (){
	this.player.swipestartx;
	this.player.swipestarty;
	this.player.swipeendx;
	this.player.swipeendy;

	if(this.player.actionframe < this.player.speed){
		return;
	}

	if(!this.player.leftdown && game.input.activePointer.isDown){
		this.player.leftdown = true;
		this.player.swipestartx = game.input.mousePointer.x;
		this.player.swipestarty = game.input.mousePointer.y;
		}
	else if(this.player.leftdown && game.input.activePointer.isUp){
		this.player.leftdown = false;
		this.player.swipeendx = game.input.mousePointer.x;
		this.player.swipeendy = game.input.mousePointer.y;
		this.Swipe(this.player.swipestartx,this.player.swipestarty,this.player.swipeendx,this.player.swipeendy);
	}
};

fightState.prototype.Swipe = function (swipestartx,swipestarty,swipeendx,swipeendy){
	this.player.actionframe = 0;
	slope = (swipeendy - swipestarty)/(swipeendx - swipestartx);
	swipedright = swipestartx < swipeendx;
	swipedtop = swipestarty < window.screen.height/2;

	if(swipedright){
		if(swipedtop){
			//HIGH ATTACK
			console.log("high attack");
			this.player.animations.play('high attack');
      this.highattacksound.play();
			game.time.events.add(750,this.setPlayerState,this);
		}
		else{
			//LOW ATTACK
			console.log("low attack");
			this.player.animations.play('low attack');
      this.lowattacksound.play();
      game.time.events.add(750,this.setPlayerState,this);
		}
	}
	else{
		if(swipedtop){
			//HIGH BLOCK
			console.log("high block");
			this.player.animations.play('high block');
      this.dodgesound.play();
      game.time.events.add(0,this.setPlayerState,this);
		}
		else{
			//LOW BLOCK
			console.log("low block");
			this.player.animations.play('low block');
      this.dodgesound.play();
			game.time.events.add(0,this.setPlayerState,this);
		}
	}
};

fightState.prototype.setPlayerState = function(state){
  if(this.player.animations.currentAnim.name === "high attack")
  {
    this.player.state = "high attack";
    game.time.events.add(idletimer,this.ReturnToIdle,this);
  }

  if(this.player.animations.currentAnim.name === "low attack")
  {
    this.player.state = "low attack";
    game.time.events.add(idletimer,this.ReturnToIdle,this);
  }

  if(this.player.animations.currentAnim.name === "high block")
  {
    this.player.state = "high block";
    game.time.events.add(1000,this.ReturnToIdle,this);
  }

  if(this.player.animations.currentAnim.name === "low block")
  {
    this.player.state = "low block";
    game.time.events.add(1000,this.ReturnToIdle,this);
  }
};

fightState.prototype.DamageCalc = function (attacker,defender){
	defender.health = game.math.max(0,(defender.health - (attacker.attack - defender.defense)));
  console.log(attacker.attack, defender.defense)
};

fightState.prototype.enemyBehavior = function (player,enemy) { //determines what actions the enemy should take
  if (enemy.state === "ready to act") { // decide on an action or sequence of actions
    let actionVariable = Math.random()
    if(player.state === "idle"){
      if(actionVariable > (0.8 - enemy.skill *0.05)){
        enemy.actionSequence = ["high attack"];
        if (enemy.skill ===4)enemy.actionSequence = ["high attack","low attack", "high attack"];
        if (enemy.skill === 3)enemy.actionSequence = ["high attack","low attack"];
      }
      if(actionVariable > (0.55  - enemy.skill *0.1)&& actionVariable <=(0.8 - enemy.skill *0.05)){
        enemy.actionSequence = ["low attack"];
        if (enemy.skill ===4)enemy.actionSequence = ["low attack","high attack", "low attack"];
        if (enemy.skill === 3)enemy.actionSequence = ["low attack","high attack"];
      }
      if(actionVariable > (0.3 - enemy.skill *0.05) && actionVariable <= (0.55 - enemy.skill*0.1)){
        enemy.actionSequence = ["high block"];
      }
      if(actionVariable <= (0.3 - enemy.skill *0.05)){
        enemy.actionSequence = ["low block"];
      }
    }
    else if(player.state === "high attack"){
      if(actionVariable > (0.8+0.05*enemy.skill)){
        enemy.actionSequence = ["high attack"];
        if (enemy.skill ===4)enemy.actionSequence = ["high attack","low attack", "high attack"];
        if (enemy.skill === 3)enemy.actionSequence = ["high attack","low attack"];
      }
        if(actionVariable > (0.6 + 0.1 *enemy.skill) && actionVariable <= (0.8+0.05*enemy.skill)){
        enemy.actionSequence = ["low attack"];
        if (enemy.skill ===4)enemy.actionSequence = ["high attack","low attack", "high attack"];
        if (enemy.skill === 3)enemy.actionSequence = ["high attack","low attack"];
      }
      if(actionVariable > (0.3 + 0.05 * enemy.skill) && actionVariable <= (0.6 + 0.1 *enemy.skill)){
        enemy.actionSequence = ["high block"];
      }
      if(actionVariable <= (0.3 + 0.05 * enemy.skill)){
        enemy.actionSequence = ["low block"];
      }
    }
    else if(player.state === "low attack"){
      if(actionVariable > (0.8+0.05*enemy.skill)){
        enemy.actionSequence = ["high attack"];
        if (enemy.skill ===4)enemy.actionSequence = ["high attack","low attack", "high attack"];
        if (enemy.skill === 3)enemy.actionSequence = ["high attack","low attack"];
      }
      if(actionVariable > (0.6 + 0.1 *enemy.skill) && actionVariable <= (0.8+0.05*enemy.skill)){
        enemy.actionSequence = ["low attack"];
        if (enemy.skill ===4)enemy.actionSequence = ["low attack","high attack", "low attack"];
        if (enemy.skill === 3)enemy.actionSequence = ["low attack","high attack"];
      }
      if(actionVariable > (0.3 + 0.05 * enemy.skill) && actionVariable <= (0.6 + 0.1 *enemy.skill)){
        enemy.actionSequence = ["high block"];
      }
      if(actionVariable <= (0.3 + 0.05 * enemy.skill)){
        enemy.actionSequence = ["low block"];
      }
    }
    else if(player.state === "high block"){
      if(actionVariable > (0.8 - 0.15 * enemy.skill)){
        enemy.actionSequence = ["low attack"];
        if (enemy.skill ===4)enemy.actionSequence = ["low attack","high attack", "low attack"];
        if (enemy.skill === 3)enemy.actionSequence = ["high attack","low attack"];
      }
      if(actionVariable > (0.4-0.1*enemy.skill) && actionVariable <= (0.8 - 0.15 * enemy.skill)){
        enemy.actionSequence = ["high attack"];
        if (enemy.skill ===4)enemy.actionSequence = ["low attack","high attack", "low attack"];
        if (enemy.skill === 3)enemy.actionSequence = ["low attack","high attack"];
      }
      if(actionVariable >(0.2 - 0.05*enemy.skill)  && actionVariable <= (0.4-0.1*enemy.skill)){
        enemy.actionSequence = ["high block"];
      }
      if(actionVariable <= (0.2 - 0.05*enemy.skill)){
        enemy.actionSequence = ["low block"];
      }
    }
    else if(player.state === "low block"){
      if(actionVariable > (0.8 - 0.15 * enemy.skill)){
        enemy.actionSequence = ["high attack"];
        if (enemy.skill ===4)enemy.actionSequence = ["low attack","high attack", "low attack"];
        if (enemy.skill === 3)enemy.actionSequence = ["low attack","high attack"];
      }
      if(actionVariable > (0.4-0.1*enemy.skill) && actionVariable <= (0.8 - 0.15 * enemy.skill)){
        enemy.actionSequence = ["low attack"];
        if (enemy.skill ===4)enemy.actionSequence = ["low attack","high attack", "low attack"];
        if (enemy.skill === 3)enemy.actionSequence = ["low attack","high attack"];
      }
      if(actionVariable >(0.2 - 0.05*enemy.skill)  && actionVariable <= (0.4-0.1*enemy.skill)){
        enemy.actionSequence = ["high block"];
      }
      if(actionVariable <= (0.2 - 0.05*enemy.skill)){
        enemy.actionSequence = ["low block"];
      }
    }
    enemy.state = "mid action";
    enemy.actionTimer = 0;
    console.log("Enemy Action: " + enemy.actionSequence);
  }
  else if (enemy.state === "mid action") { // ensure the enemy carries out the decided upon actions
    if (enemy.actionSequence.length>0){
      enemy.actionTimer++;
      if(enemy.actionTimer>48){
        enemy.actionSequence.shift();
        enemy.actionTimer = 0;
      }
      if (enemy.actionSequence[0]==="high attack"){
        if (enemy.actionTimer <=3){
          enemy.currentAttackDamge = false;
          this.enemy.animations.play("high attack")
          this.highattacksound.play();
        }
        if (enemy.actionTimer>30 && enemy.actionTimer < 42) {
          enemy.action = "high attack";
        }
        else{
          enemy.action = "null";
        }
      }
      else if (enemy.actionSequence[0]==="low attack"){
        if (enemy.actionTimer <= 3){
          enemy.currentAttackDamge = false;
          this.enemy.animations.play("low attack")
          this.lowattacksound.play();
        }
        if (enemy.actionTimer>30 && enemy.actionTimer < 42) {
          enemy.action = "low attack";
        }
        else{
          enemy.action = "null";
        }
      }
      else if (enemy.actionSequence[0]==="high block"){
        if (enemy.actionTimer <= 3){
          this.enemy.animations.play("high block")
          this.dodgesound.play();
        }
        if (enemy.actionTimer>18 && enemy.actionTimer < 36) {
          enemy.action = "high block";
        }
        else{
          enemy.action = "null";
        }
      }
      else if (enemy.actionSequence[0]=="low block"){
        if (enemy.actionTimer <= 3) {
          this.enemy.animations.play("low block")
          this.dodgesound.play();
        }
        if (enemy.actionTimer>18 && enemy.actionTimer < 36) {
          enemy.action = "low block";
        }
        else{
          enemy.action = "null";
        }
      }
    }
    else{
      enemy.state = "cooling down";
      enemy.cooldown = 30 + Math.random()*60;
      this.enemy.animations.play("idle")
    }

  }
  else if (enemy.state === "cooling down") {// used for when the enemy should cool down after attacking or when staggered
    enemy.cooldown -= enemy.speed;
    if (enemy.cooldown <= 0){
      enemy.state = "ready to act";
    }
  }
	else if (enemy.state === "staggered"){// if hit the enemy will be staggered for a given number of frames
		if (enemy.staggercooldown > 90){
			enemy.animations.play('hurt')
		}
		enemy.staggercooldown -= enemy.speed;
		if(enemy.staggercooldown <= 0){
			enemy.state = "ready to act";
		}
	}
	else if (enemy.state === "dead"){
		return;
	}
};

fightState.prototype.ReturnToIdle = function (){
	this.player.animations.play('idle', framerate ,true);
};

fightState.prototype.ReturnToIdleEnemy = function (){
	this.enemy.animations.play('idle', framerate ,true);
};

fightState.prototype.Lose = function(){
	this.enemy.active = false;
	this.music.stop();
	this.music = game.add.audio("losemusic");
	this.music.play();
	game.time.events.add(3000,this.GoToLose,this);
  currentLevel = 1;
  tooth_used = false;
  shield_used = false;
  spear_used = false;

};

fightState.prototype.GoToLose = function(){
	game.state.start("Loss");
};

fightState.prototype.Win = function(){
	this.enemy.active = false;
	this.music.stop();
	this.music = game.add.audio("winmusic");
	this.music.play();
	game.time.events.add(3000,this.NextLevel,this);
};

fightState.prototype.NextLevel = function(){
	if(currentLevel === 1){
		currentLevel++;
		game.state.start("Story3");
	}
	else if(currentLevel === 2){
		currentLevel++;
		game.state.start("Story4");
	}
	else if(currentLevel === 3){
		currentLevel++;
		game.state.start("Story5");
	}
	else if(currentLevel === 4){
		currentLevel++;
		game.state.start("StoryVictory");
	}
}
