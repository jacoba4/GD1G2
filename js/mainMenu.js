let mainMenuState = function(){};

let ancientText;
let style;
let tapText;
let menu_music;
let cloud;
let c1;
let tween_cloud;
let pink_cloud;
let p1;
let sand1;

mainMenuState.prototype.create = function () {
  //add menu buttons, animations, and title music
  game.add.sprite(0,0,"title");
  game.physics.startSystem(Phaser.Physics.ARCADE);
  //assign all images
  cloud = game.add.sprite(0, 0, 'cloud');
  sand1 = game.add.sprite(50, 1100, 'sand_wave');
  cloud.scale.setTo(0.8,0.5);
  c1 = game.add.sprite(690, 30, 'cloud');
  c1.scale.setTo(0.9, 0.6);
  pink_cloud = game.add.sprite(300, 40, 'pinkcloud');
  p1 = game.add.sprite(890, 25, 'pinkcloud');
  cloud.alpha = 0.4;
  pink_cloud.alpha = 0.3;
  c1.alpha = 0.4;
  p1.alpha = 0.35;
  game.physics.enable(cloud, Phaser.Physics.ARCADE);
  game.physics.enable(pink_cloud, Phaser.Physics.ARCADE);
  game.physics.enable(c1, Phaser.Physics.ARCADE);
  game.physics.enable(p1, Phaser.Physics.ARCADE);
  cloud.body.velocity.x = 20;
  pink_cloud.body.velocity.x = 20;
  c1.body.velocity.x = 20;
  p1.body.velocity.x = 20;

  //tween_cloud = game.add.tween(cloud);
  //tween_cloud.repeat(10, 4000);
  //editing transparency and scale
  menu_music = game.sound.play('menuMusic'); //adding theme music
  ancientText = game.add.bitmapText(300, 150, 'ancientFont', 'The Kingphant of Anuradhapura', 75); //load the title
  ancientText.alpha = 1;
  game.add.tween(ancientText).to( { alpha: 2 }, 5000, Phaser.Easing.Linear.None, true);
  style = {font: '65px Arial', fill: '#ffffff'};
  tapText = game.add.text(1050, 970, 'tap to begin', style); //font for tap to begin
  tapText.alpha = 0;
  game.add.tween(tapText).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 2000, true);

}

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
