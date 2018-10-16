let story1State = function(){};

story1State.prototype.create = function(){
	 game.add.sprite(0,0,"story1");
}

story1State.prototype.update = function(){
	if(game.input.activePointer.leftButton.isDown){
		justclicked = true;
	}

	if(justclicked){
		justclicked = false;
		game.state.start("Story2");
	}
}
