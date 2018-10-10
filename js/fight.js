let fightState = function(){};

fightState.prototype.create = function () {
  //add player and enemies, ground, music, ui
  game.add.sprite(0,0,"fight");
  this.player = game.add.sprite(800, 500, "player"); // 845 X 560 elephant size
  this.enemy = game.add.sprite(1600, 500, "enemy");
  this.enemy.state = "ready to act";
  this.enemy.attack = 1;
  this.enemy.defense = 1;
  this.enemy.appliedDefense = 0;
  this.enemy.speed = 1;
  this.enemy.health = 10;
  this.enemy.skill = 1;
};

fightState.prototype.update = function () {
  //fighting and stuff
  this.enemyBehavior(this.player,this.enemy);
};

fightState.prototype.enemyBehavior = function (player,enemy) {
  if (enemy.state === "ready to act") {
    let actionVariable = Math.random()
    if(player.state === "idle"){
      if(actionVariable > (0.8 - skill *0.05){
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
      if(actionVariable > 0.85){
        enemy.actionSequence = ["high attack"];
      }
      if(actionVariable > 0.7 && actionVariable <= 0.85){
        enemy.actionSequence = ["low attack"];
      }
      if(actionVariable > 0.35 && actionVariable <= 0.7){
        enemy.actionSequence = ["high block"];
      }
      if(actionVariable <= 0.35){
        enemy.actionSequence = ["low block"];
      }
    }
    else if(player.state === "low attack"){
      if(actionVariable > 0.85){
        enemy.actionSequence = ["high attack"];
      }
      if(actionVariable > 0.7 && actionVariable <= 0.85){
        enemy.actionSequence = ["low attack"];
      }
      if(actionVariable > 0.35 && actionVariable <= 0.7){
        enemy.actionSequence = ["high block"];
      }
      if(actionVariable <= 0.35){
        enemy.actionSequence = ["low block"];
      }
    }
    else if(player.state === "high block"){
      if(actionVariable > 0.65){
        enemy.actionSequence = ["high attack"];
      }
      if(actionVariable > 0.3 && actionVariable <= 0.65){
        enemy.actionSequence = ["low attack"];
      }
      if(actionVariable > 0.3 && actionVariable <= 0.15){
        enemy.actionSequence = ["high block"];
      }
      if(actionVariable <= 0.15){
        enemy.actionSequence = ["low block"];
      }
    }
    else if(player.state === "low block"){
      if(actionVariable > 0.65){
        enemy.actionSequence = ["high attack"];
      }
      if(actionVariable > 0.3 && actionVariable <= 0.65){
        enemy.actionSequence = ["low attack"];
      }
      if(actionVariable > 0.3 && actionVariable <= 0.15){
        enemy.actionSequence = ["high block"];
      }
      if(actionVariable <= 0.15){
        enemy.actionSequence = ["low block"];
      }
    }
    enemy.state = "mid action";
    enemy.actionTimer = 0;
  }
  else if (enemy.state === "mid action") {
    if (enemy.actionSequence.length>0){
      enemy.actionTimer++;
      if(enemy.actionTimer>75){
        enemy.actionSequence.shift();
        enemy.actionTimer = 0;
      }
      if (enemy.actionSequence[0]=="high attack"){
        if (actionTimer>15 && actionTimer < 45) {
          //hight attack
        }
      }
      else if (enemy.actionSequence[0]=="low attack"){
        if (actionTimer>15 && actionTimer < 45) {
          //low attack
        }
      }
      else if (enemy.actionSequence[0]=="high block"){
        if (actionTimer>15 && actionTimer < 45) {
          // high block
        }
      }
      else if (enemy.actionSequence[0]=="low block"){
        if (actionTimer>15 && actionTimer < 45) {
          //low block
        }
      }
    }
    else{
      enemy.state === "cooling down";
      enemy.cooldown = 30 + Math.random()*60;
    }

  }
  else if (enemy.state === "cooling down") {
    enemy.cooldown -= enemy.speed;
  }
};
