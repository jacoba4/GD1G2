let shopState = function(){};

let shopMusic;
let sacred_t;
let spear_;
let shield_;
let shop_text;
let continue_button;

shopState.prototype.create = function () {
  //add menu buttons, animations, and shop music
  game.add.sprite(0,0,"shop");
  shop_text = game.add.bitmapText(550, 250, 'ancientFont', 'CHOOSE A POWERUP', 45);
  shop_text.aplha = 0;
  game.add.tween(shop_text).to( { alpha: 2 }, 5000, Phaser.Easing.Linear.None, true);
  shopMusic = game.sound.play('menuMusic');
  //adding the relics
  sacred_t = game.add.sprite(410, 550, 'sacred_tooth');
  spear_ = game.add.sprite(750, 680, 'spear');
  shield_ = game.add.sprite(1220, 430, 'shield');
//  continue_button = game.add.button()



};
function chose_tooth () {

  sacred_t.alpha = 1;
  spear_.alpha = 0.7;
  shield_.alpha = 0.7;

}
function chose_shield () {

  sacred_t.alpha = 0.7;
  spear_.alpha = 0.7;
  shield_.alpha = 1;

}
function chose_spear () {

  sacred_t.alpha = 0.7;
  spear_.alpha = 1;
  shield_.alpha = 0.7;

}

shopState.prototype.update = function () {
  //display animations if we want them / check for clicks and stuff
  if(game.input.activePointer.leftButton.isDown){
		this.NextLevel();
	}
  if(tooth_used == false){
    sacred_t.inputEnabled = true;
    sacred_t.events.onInputDown.add(chose_tooth, this);
  }
  if(shield_used == false){
    shield_.inputEnabled = true;
    shield_.events.onInputDown.add(chose_shield, this);
  }
  if(spear_used == false){
    spear_.inputEnabled = true;
    spear_.events.onInputDown.add(chose_spear, this);
  }
};

shopState.prototype.NextLevel = function(){
	if(currentLevel === 2){
		game.state.start("Fight",true,false);
	}
	else if(currentLevel === 3){
		game.state.start("Fight",true,false);
	}
	else if(currentLevel === 4){
		game.state.start("Fight",true,false);
	}
}
