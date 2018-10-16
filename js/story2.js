let story2State = function(){};

story2State.prototype.create = function(){
	 game.add.sprite(0,0,"story2");
}

story2State.prototype.update = function(){
	if(game.input.activePointer.leftButton.isDown){
		justclicked = true;
	}

	if(justclicked){
		justclicked = false;
		game.state.start("Fight",true,false);
	}
}