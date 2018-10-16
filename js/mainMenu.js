let mainMenuState = function(){};

let ancientText;
let menu_music;
mainMenuState.prototype.create = function () {
  //add menu buttons, animations, and title music
  game.add.sprite(0,0,"title");
  ancientText = game.add.bitmapText(300, 150, 'ancientFont', 'The Kingphant of Anuradhapura', 75);
  //ancientText.anchor.set(1);
  ancientText.aplha = 1;
  game.add.tween(ancientText).to( { alpha: 2 }, 5000, Phaser.Easing.Linear.None, true);
  menu_music = game.sound.play('menuMusic');
  //button = game.add.button(game.world.centerX, game.world.centerY, "playbutton", ButtonClick,this);
};

mainMenuState.prototype.update = function () {
  //display animations if we want them / check for clicks and stuff
  ancientText.text = 'The Kingphant of Anuradhapura';

};

function ButtonClick(){
	//game.state.start("Fight");
}
