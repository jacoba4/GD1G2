let story4State = function(){};

story4State.prototype.create = function(){
	 game.add.sprite(0,0,"story4");
}

story4State.prototype.update = function(){
	if(game.input.activePointer.leftButton.isDown){
		game.state.start("Shop");
	}
}