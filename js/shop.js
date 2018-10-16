let shopState = function(){};


shopState.prototype.create = function () {
  //add menu buttons, animations, and shop music
  game.add.sprite(0,0,"shop");
  //
};

shopState.prototype.update = function () {
  //display animations if we want them / check for clicks and stuff
  if(game.input.activePointer.leftButton.isDown){
		this.NextLevel();
	}
};

shopState.prototype.NextLevel = function(){
	if(currentLevel === 2){
		game.state.start("Fight",true,false);
	}
	else if(currentLevel === 3){
		game.state.start("Fight",true,false);
	}
	else if(currentLevel === 4){
		game.state.start("Fight",true,false);
	}
}