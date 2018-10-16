let story5State = function(){};

story5State.prototype.create = function(){
	 game.add.sprite(0,0,"story5");
}

story5State.prototype.update = function(){
	if(game.input.activePointer.leftButton.isDown){
		game.state.start("Fight",true,false,4);
	}
}