let fightState = function(){};

fightState.prototype.preload = function(){
	 game.load.audio('fightmusic', ['assets/music/CombatSong.wav']);
	 game.load.spritesheet("playeridle", "assets/sprites/elephant1/elephantIdle_sheet.png",1150,825);
}

fightState.prototype.create = function () {
  this.music = game.add.audio('fightmusic');
  this.music.loop = true;
  this.music.play();
  this.music.volume = .1;

  game.add.sprite(0,0,"fight"); // load the background
  this.player = game.add.sprite(160, 300, "playeridle"); // 845 X 560 elephant size
  this.player.animations.add('idle');
  this.player.animations.play('idle', 10, true);
  this.player.state = "ready to act";

  this.enemy = game.add.sprite(2200, 300, "playeridle");
  this.enemy.animations.add('idle');
  this.enemy.animations.play('idle', 10, true);
  this.enemy.scale.x *= -1;
  this.enemy.state = "ready to act"; // stores the current state of the enemy
  this.enemy.action = "nul"; // stores the current action ie. blocking, attacking
  this.enemy.actionTimer = 0;
  this.enemy.actionSequence = [];

  let currentLevel =1;

  if (currentLevel===1){ // assign enemy stats per level
    this.enemy.attack = 1;
    this.enemy.defense = 1;
    this.enemy.speed = 1;
    this.enemy.health = 10;
    this.enemy.skill = 1;
  }
  else if (currentLevel===2){
    this.enemy.attack = 1;
    this.enemy.defense = 1;
    this.enemy.speed = 1;
    this.enemy.health = 10;
    this.enemy.skill = 2;
  }
  else if (currentLevel===3){
    this.enemy.attack = 1;
    this.enemy.defense = 1;
    this.enemy.speed = 1;
    this.enemy.health = 10;
    this.enemy.skill = 3;
  }
  else if (currentLevel===4){
    this.enemy.attack = 1;
    this.enemy.defense = 1;
    this.enemy.speed = 1;
    this.enemy.health = 10;
    this.enemy.skill = 4;
  }

  game.input.mouse.capture = true;
  this.player.leftdown = false;
  this.player.swipedtop = false;
  this.player.swipedright = false;
  this.player.slope = 0;
  this.player.state = "idle";
  this.player.action = "null"
  this.player.actionframe = 0;
  this.player.actionTimer = 0;


  this.player.attack = 5;
  this.player.defense = 1;
  this.player.speed = 60;
  this.player.health = 10;

  this.playerhptext = game.add.text(16, 16, "HP: ", {fontSize: "128px", fill: "#000000"});
  this.enemyhptext = game.add.text(1550, 16, "HP: ", {fontSize: "128px", fill: "#000000"});

};

fightState.prototype.update = function () {
  //fighting and stuff
  if(this.player.actionframe === 0){
  	this.player.state = "idle";
  }
  this.PlayerInput();
  this.enemyBehavior(this.player,this.enemy);
  
  this.playerhptext.text = "Your HP: " + this.player.health;
  this.enemyhptext.text = "Enemy HP: " + this.enemy.health;

  if(this.player.actionframe < this.player.speed){
  	this.player.actionframe++;
  }
  //this.updatePlayerAction(this.player);
  this.checkForDamage(this.player, this.enemy);
};

fightState.prototype.checkForDamage = function (player,enemy) {
	if(player.state === "high attack" && enemy.state !== "high block"){
		this.DamageCalc(player,enemy);
	}

	if(player.state === "low attack" && enemy.state !== "low block"){
		this.DamageCalc(player,enemy);
	}

	if(enemy.state === "high attack" && player.state !== "high block"){
		this.DamageCalc(enemy,player);
	}

	if(enemy.state === "low attack" && player.state !== "low block"){
		this.DamageCalc(enemy,player);
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
      if (player.actionTimer > 15 && player.actionTimer < 45){
        player.action = "high block";
      }
      else {
        player.action = "null"
      }
    }
    if (player.state === "low block"){
      if (player.actionTimer > 15 && player.actionTimer < 45){
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
			this.player.state = "high attack";
		}
		else{
			//LOW ATTACK
			console.log("low attack");
			this.player.state = "low attack";
		}
	}
	else{
		if(swipedtop){
			//HIGH BLOCK
			console.log("high block");
			this.player.state = "high block";
		}
		else{
			//LOW BLOCK
			console.log("low block");
			this.player.state = "low block";
			this.player.animations.play("low block",10);
		}
	}
};

fightState.prototype.DamageCalc = function (attacker,defender){
	defender.health -= game.math.max(0,(attacker.attack - defender.defense));
};

fightState.prototype.enemyBehavior = function (player,enemy) { //determines what actions the enemy should take
  if (enemy.state === "ready to act") { // decide on an action or sequence of actions
    let actionVariable = Math.random()
    if(player.state === "idle"){
      if(actionVariable > (0.8 - enemy.skill *0.05)){
        enemy.actionSequence = ["high attack"];
      }
      if(actionVariable > (0.55  - enemy.skill *0.1)&& actionVariable <=(0.8 - enemy.skill *0.05)){
        enemy.actionSequence = ["low attack"];
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
      }
        if(actionVariable > (0.6 + 0.1 *enemy.skill) && actionVariable <= (0.8+0.05*enemy.skill)){
        enemy.actionSequence = ["low attack"];
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
      }
      if(actionVariable > (0.6 + 0.1 *enemy.skill) && actionVariable <= (0.8+0.05*enemy.skill)){
        enemy.actionSequence = ["low attack"];
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
      }
      if(actionVariable > (0.4-0.1*enemy.skill) && actionVariable <= (0.8 - 0.15 * enemy.skill)){
        enemy.actionSequence = ["high attack"];
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
      }
      if(actionVariable > (0.4-0.1*enemy.skill) && actionVariable <= (0.8 - 0.15 * enemy.skill)){
        enemy.actionSequence = ["low attack"];
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
      if(enemy.actionTimer>75){
        enemy.actionSequence.shift();
        enemy.actionTimer = 0;
      }
      if (enemy.actionSequence[0]=="high attack"){
        if (enemy.actionTimer>15 && enemy.actionTimer < 45) {
          enemy.action = "high attack";
        }
        else{
          enemy.action = "null";
        }
      }
      else if (enemy.actionSequence[0]=="low attack"){
        if (enemy.actionTimer>15 && enemy.actionTimer < 45) {
          enemy.action = "low attack";
        }
        else{
          enemy.action = "null";
        }
      }
      else if (enemy.actionSequence[0]=="high block"){
        if (enemy.actionTimer>15 && enemy.actionTimer < 45) {
          enemy.action = "high block";
        }
        else{
          enemy.action = "null";
        }
      }
      else if (enemy.actionSequence[0]=="low block"){
        if (enemy.actionTimer>15 && enemy.actionTimer < 45) {
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
    }

  }
  else if (enemy.state === "cooling down") {// used for when the enemy should cool down after attacking or when staggered
    enemy.cooldown -= enemy.speed;
    if (enemy.cooldown <= 0){
      enemy.state = "ready to act";
    }
  }
};
