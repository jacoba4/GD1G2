let shopState = function(){};

let shopMusic;
let sacred_t;
let spear_;
let shield_;
let shop_text;
let continue_button;
let button_enabled;


shopState.prototype.create = function () {
  //add menu buttons, animations, and shop music
  game.add.sprite(0,0,"shop");
  shop_text = game.add.bitmapText(550, 250, 'ancientFont', 'CHOOSE A POWERUP', 45);
  shop_text.aplha = 0;
  game.add.tween(shop_text).to( { alpha: 2 }, 5000, Phaser.Easing.Linear.None, true);

  //adding the relics
  sacred_t = game.add.sprite(410, 550, 'sacred_tooth');
  spear_ = game.add.sprite(750, 680, 'spear');
  shield_ = game.add.sprite(1220, 430, 'shield');
  entering_shop = true;
  if(entering_shop == true){
    shopMusic = game.sound.play('menuMusic');
  }
//if the relics had been used, they will be dulled
  if(tooth_used == true){
    sacred_t.alpha = 0.3;
  }else{
    sacred_t.alpha = 1;
  }
  if(spear_used == true){
    spear_.alpha = 0.3;
  }else{
    spear_.alpha = 1;
  }
  if(shield_used == true){
    shield_.alpha = 0.3;
  }else{
    shield_.alpha = 1;
  }

  button_enabled = false;
  continue_button = game.add.bitmapText(1985, 520, 'ancientFont', 'CONTINUE', 35);
  continue_button.alpha = 0;

};
//functions for which relics you have chosen
function chose_tooth () {

  sacred_t.alpha = 1; //change the alpha of the selected relic to 1
  //everything else will be dulled slightly; if it has been used, will have more dullness
  spear_.alpha = 0.7;
  shield_.alpha = 0.7;
  if(spear_used == true){
    spear_.alpha = 0.3;
  }
  if(shield_used == true){
    shield_.alpha = 0.3;
  }

  button_enabled = true;

}
function chose_shield () {

  shield_.alpha = 1;
  sacred_t_.alpha = 0.7;
  spear_.alpha = 0.7;
  if(tooth_used == true){
    sacred_t.alpha = 0.3;
  }
  if(spear_used == true){
    spear_.alpha = 0.3;
  }

  button_enabled = true;

}
function chose_spear () {

  spear_.alpha = 1;
  shield_.alpha = 0.7;
  sacred_t.alpha = 0.7;

  if(shield_used == true){
    shield_.alpha = 0.3;
  }
  if(tooth_used == true){
    sacred_t.alpha = 0.3;
  }

  button_enabled = true;

}
//function for continuing. when the continue button is pushed, whichever relic that was selected (whichever one has an alpha of 1)
//is changed to used and will be dulled more so the next time the shop is visited
function checkAndChange() {

  if(sacred_t.alpha == 1){
    tooth_used = true;
  }
  if(spear_.alpha == 1){
    spear_used = true;
  }
  if(shield_.alpha == 1){
    shield_used = true;
  }
  entering_shop = false;
  if(entering_shop == false){
    shopMusic.pause();
  }

  this.NextLevel();


}

shopState.prototype.update = function () {
  //display animations if we want them / check for clicks and stuff
  //relics can only be selected if they have not been used

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
  if(button_enabled == true){

    continue_button.alpha = 1;
    continue_button.inputEnabled = true;
    continue_button.events.onInputDown.add(checkAndChange, this);
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
