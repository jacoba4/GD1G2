let mainMenuState = function(){};

let ancientText;
let style;
let tapText;
let menu_music;
let cloud;

mainMenuState.prototype.create = function () {
  //add menu buttons, animations, and title music
//  game.add.sprite(10, 10, 'cloud');
  game.add.sprite(0,0,"title");
  game.add.sprite(20, 20, 'cloud');
  ancientText = game.add.bitmapText(300, 150, 'ancientFont', 'The Kingphant of Anuradhapura', 75); //load the title
  ancientText.alpha = 1;
  game.add.tween(ancientText).to( { alpha: 2 }, 5000, Phaser.Easing.Linear.None, true);
  style = {font: '65px Arial', fill: '#ffffff'};
  tapText = game.add.text(1050, 970, 'tap to begin', style); //font for tap to begin
  tapText.alpha = 0;
  game.add.tween(tapText).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 2000, true);

  menu_music = game.sound.play('menuMusic');

};

mainMenuState.prototype.update = function () {
  //display animations if we want them / check for clicks and stuff
  ancientText.text = 'The Kingphant of Anuradhapura';
  tapText = 'tap to begin';
  if(game.input.activePointer.leftButton.isDown){

    justclicked = true;

  }
  if(justclicked){
    justclicked = false;
    game.state.start('Story1');
  }

};

function ButtonClick(){
	//game.state.start("Fight");
}
