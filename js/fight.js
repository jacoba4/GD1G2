let fightState = function(){};

fightState.prototype.create = function () {
  game.add.sprite(0,0,"fight"); // load the background
  this.player = game.add.sprite(160, 500, "player"); // 845 X 560 elephant size
  this.enemy = game.add.sprite(1430, 500, "enemy");
  this.enemy.state = "ready to act"; // stores the current state of the enemy
  this.enemy.action = "null"; // stores the current action ie. blocking, attacking
  this.enemy.appliedDefense = 0;
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
  this.debugtext = game.add.text(16, 16, "State: ", {fontSize: "32px", fill: "#000000"});

};

fightState.prototype.update = function () {
  //fighting and stuff
  this.enemyBehavior(this.player,this.enemy);
  this.PlayerInput();
  this.debugtext.text = "State: " + this.player.leftdown;
  console.log(this.player.leftdown);
};


fightState.prototype.PlayerInput = function (){
	this.player.swipestartx;
	this.player.swipestarty;
	this.player.swipeendx;
	this.player.swipeendy;

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

fightState.prototype.Swipe = function (swipestartx,swipestartx,swipeendx,swipeendy){

	slope = (swipeendy - swipestarty)/(swipeendx - swipestartx);
	swipedright = swipestartx < swipeendx;
	swipedtop = swipestarty > window.screen.height;

	if(swipedright){
		if(swipedtop){
			//HIGH ATTACK
			player.state = "high attack";
			game.debug.text("HIGH ATTACK");
		}
		else{
			//LOW ATTACK
			player.state = "low attack";
			game.debug.text("LOW ATTACK");
		}
	}
	else{
		if(swipedtop){
			//HIGH BLOCK
			player.state = "high block";
			game.debug.text("HIGH BLOCK");
		}
		else{
			//LOW BLOCK
			player.state = "low block";
			game.debug.text("LOW BLOCK");
		}
	}
};

fightState.prototype.enemyBehavior = function (player,enemy) { //determines what actions the enemy should take
  console.log(enemy.actionSequence);
  if (enemy.state === "ready to act") { // decide on an action or sequence of actions
    let actionVariable = Math.random()
    if(player.state === "idle"){
      if(actionVariable > (0.8 - skill *0.05)){
        enemy.actionSequence = ["high attack"];
      }
      if(actionVariable > (0.55  - skill *0.1)&& actionVariable <=(0.8 - skill *0.05)){
        enemy.actionSequence = ["low attack"];
      }
      if(actionVariable > (0.3 - skill *0.05) && actionVariable <= (0.55 - skill*0.1)){
        enemy.actionSequence = ["high block"];
      }
      if(actionVariable <= (0.3 - skill *0.05)){
        enemy.actionSequence = ["low block"];
      }
    }
    else if(player.state === "high attack"){
      if(actionVariable > (0.8+0.05*skill)){
        enemy.actionSequence = ["high attack"];
      }
        if(actionVariable > (0.6 * 0.1 *skill) && actionVariable <= (0.8+0.05*skill)){
        enemy.actionSequence = ["low attack"];
      }
      if(actionVariable > (0.3 + 0.05 * skill) && actionVariable <= (0.6 * 0.1 *skill)){
        enemy.actionSequence = ["high block"];
      }
      if(actionVariable <= 0.(0.3 + 0.05 * skill)){
        enemy.actionSequence = ["low block"];
      }
    }
    else if(player.state === "low attack"){
      if(actionVariable > (0.8+0.05*skill)){
        enemy.actionSequence = ["high attack"];
      }
      if(actionVariable > (0.6 * 0.1 *skill) && actionVariable <= (0.8+0.05*skill)){
        enemy.actionSequence = ["low attack"];
      }
      if(actionVariable > (0.3 + 0.05 * skill) && actionVariable <= (0.6 * 0.1 *skill)){
        enemy.actionSequence = ["high block"];
      }
      if(actionVariable <= 0.(0.3 + 0.05 * skill)){
        enemy.actionSequence = ["low block"];
      }
    }
    else if(player.state === "high block"){
      if(actionVariable > (0.8 - 0.15 * skill)){
        enemy.actionSequence = ["low attack"];
      }
      if(actionVariable > (0.4-0.1*skill) && actionVariable <= (0.8 - 0.15 * skill)){
        enemy.actionSequence = ["high attack"];
      }
      if(actionVariable > (0.4-0.1*skill) && actionVariable <= (0.2 - 0.05*skill)){
        enemy.actionSequence = ["high block"];
      }
      if(actionVariable <= (0.2 - 0.05*skill)){
        enemy.actionSequence = ["low block"];
      }
    }
    else if(player.state === "low block"){
      if(actionVariable > (0.8 - 0.15 * skill)){
        enemy.actionSequence = ["high attack"];
      }
      if(actionVariable > (0.4-0.1*skill) && actionVariable <= (0.8 - 0.15 * skill)){
        enemy.actionSequence = ["low attack"];
      }
      if(actionVariable > (0.4-0.1*skill) && actionVariable <= (0.2 - 0.05*skill)){
        enemy.actionSequence = ["high block"];
      }
      if(actionVariable <= (0.2 - 0.05*skill)){
        enemy.actionSequence = ["low block"];
      }
    }
    enemy.state = "mid action";
    enemy.actionTimer = 0;
  }
  else if (enemy.state === "mid action") { // ensure the enemy carries out the decided upon actions
    if (enemy.actionSequence.length>0){
      enemy.actionTimer++;
      if(enemy.actionTimer>75){
        enemy.actionSequence.shift();
        enemy.actionTimer = 0;
      }
      if (enemy.actionSequence[0]=="high attack"){
        if (actionTimer>15 && actionTimer < 45) {
          enemy.action = "high attack";
        }
        else{
          enemy.action = "null";
        }
      }
      else if (enemy.actionSequence[0]=="low attack"){
        if (actionTimer>15 && actionTimer < 45) {
          enemy.action = "low attack";
        }
        else{
          enemy.action = "null";
        }
      }
      else if (enemy.actionSequence[0]=="high block"){
        if (actionTimer>15 && actionTimer < 45) {
          enemy.action = "high block";
        }
        else{
          enemy.action = "null";
        }
      }
      else if (enemy.actionSequence[0]=="low block"){
        if (actionTimer>15 && actionTimer < 45) {
          enemy.action = "low block";
        }
        else{
          enemy.action = "null";
        }
      }
    }
    else{
      enemy.state === "cooling down";
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
