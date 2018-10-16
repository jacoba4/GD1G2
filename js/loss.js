let lossState = function(){};

lossState.prototype.create = function(){
	 game.add.sprite(0,0,"loss");
}

lossState.prototype.update = function(){
	if(game.input.activePointer.leftButton.isDown){
		game.state.start("MainMenu");
	}
}
