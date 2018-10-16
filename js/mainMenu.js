let mainMenuState = function(){};

let ancientText;
//let style;
let tapText;
let menu_music;

mainMenuState.prototype.create = function () {
  //add menu buttons, animations, and title music
  //let style = {font: '65px Arial', fill: '#ffffff', align: 'center'};
  //game.add.text(game.world.centerX, game.world.centerY, 'tap to begin', style);
  game.add.sprite(0,0,"title");
  tapText = game.add.bitmapText(200, 300, 'ancientFont', 'here here here ', 55);
  ancientText = game.add.bitmapText(300, 150, 'ancientFont', 'The Kingphant of Anuradhapura', 75);
  //ancientText.anchor.set(1);
  ancientText.aplha = 1;
  game.add.tween(ancientText).to( { alpha: 2 }, 5000, Phaser.Easing.Linear.None, true);


  menu_music = game.sound.play('menuMusic');
  //tapText = game.add.text(300, 500, 'tap anywhere to start', {font: '65px Arial,', fill: '#ffffff'});
  //button = game.add.button(game.world.centerX, game.world.centerY, "playbutton", ButtonClick,this);
};

mainMenuState.prototype.update = function () {
  //display animations if we want them / check for clicks and stuff
  ancientText.text = 'The Kingphant of Anuradhapura';
  tapText.text = 'here here here';
//  tapText.text = 'tap anywhere to start';

};

function ButtonClick(){
	//game.state.start("Fight");
}
