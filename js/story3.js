let story3State = function(){};

story3State.prototype.create = function(){
	 game.add.sprite(0,0,"story3");
}

story3State.prototype.update = function(){
	if(game.input.activePointer.leftButton.isDown){
		justclicked = true;
	}

	if(justclicked){
		justclicked = false;
		game.state.start("Fight",true,false,2);
	}
}