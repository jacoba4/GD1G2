let lossState = function(){};

lossState.prototype.create = function(){
	 game.add.sprite(0,0,"loss");
	 game.add.sprite(0,0,"losstext");
}

lossState.prototype.update = function(){
	if(game.input.activePointer.leftButton.isDown){
		game.state.start("MainMenu");
	}
}
