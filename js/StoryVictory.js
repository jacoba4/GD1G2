let VictoryState = function(){};

VictoryState.prototype.create = function(){
	 game.add.sprite(0,0,"Victory");
}

VictoryState.prototype.update = function(){
	if(game.input.activePointer.leftButton.isDown){
		game.state.start("MainMenu");
	}
}