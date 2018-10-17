let VictoryState = function(){};

VictoryState.prototype.create = function(){
	 game.add.sprite(0,0,"Victory");
	 game.add.sprite(0,0,"VictoryText");
}

VictoryState.prototype.update = function(){
	if(game.input.activePointer.leftButton.isDown){
		game.state.start("MainMenu");
	}
}