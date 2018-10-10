let mainMenuState = function(){};


mainMenuState.prototype.create = function () {
  //add menu buttons, animations, and title music
  game.add.sprite(0,0,"title");
  button = game.add.button(game.world.centerX, game.world.centerY, "playbutton", ButtonClick,this);
};

mainMenuState.prototype.update = function () {
  //display animations if we want them / check for clicks and stuff
};

function ButtonClick(){
	game.state.start("Fight");
}
