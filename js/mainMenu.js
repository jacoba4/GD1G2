let mainMenuState = function(){};

let ancientText;
let style;
let tapText;
let menu_music;
let cloud;
let pink_cloud;

mainMenuState.prototype.create = function () {
  //add menu buttons, animations, and title music
  game.add.sprite(0,0,"title");
  cloud = game.add.sprite(0, 0, 'cloud'); //first cloud instance
  pink_cloud = game.add.sprite(5, 20, 'pinkCloud');
  //editing transparency and scale
  cloud.scale.setTo(0.8,0.5);
  cloud.alpha = 0.4;
  //adding physics so cloud can move across screen
  game.physics.enable(cloud, Phaser.Physics.ARCADE);
  cloud.body.velocity.x = 20;
  menu_music = game.sound.play('menuMusic'); //adding theme music
  ancientText = game.add.bitmapText(300, 150, 'ancientFont', 'The Kingphant of Anuradhapura', 75); //load the title
  ancientText.alpha = 1;
  game.add.tween(ancientText).to( { alpha: 2 }, 5000, Phaser.Easing.Linear.None, true);
  style = {font: '65px Arial', fill: '#ffffff'};
  tapText = game.add.text(1050, 970, 'tap to begin', style); //font for tap to begin
  tapText.alpha = 0;
  game.add.tween(tapText).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 2000, true);



};

mainMenuState.prototype.update = function () {
  //display animations if we want them / check for clicks and stuff
  ancientText.text = 'The Kingphant of Anuradhapura';
  tapText = 'tap to begin';
  if(game.input.activePointer.leftButton.isDown){

    justclicked = true;
    game_starting = true;

  }
  if(game_starting == true){
    menu_music.pause();
  }
  if(justclicked){

    justclicked = false;
    game.state.start('Story1');

  }

};
