let mainMenuState = function(){};

let ancientText;
let style;
let tapText;
let menu_music;
let cloud;
let pink_cloud;
let sanddust1;
let sd2;
let sd3;
let sd4;

mainMenuState.prototype.create = function () {
  //add menu buttons, animations, and title music
  game.add.sprite(0,0,"title");
  game.physics.startSystem(Phaser.Physics.ARCADE);
  //assign all images
   //first cloud instance

  sanddust1 = game.add.sprite(0, 1000, 'sand_dust');
  sd2 = game.add.sprite(1000, 950, 'sand_dust');
  sd3 = game.add.sprite(1600, 1000, 'sand_dust');
  //editing transparency and scale

  sanddust1.scale.setTo(2, 0.7);
  sd2.scale.setTo(2, 0.9);
  sd3.scale.setTo(2, 0.7);

  sanddust1.alpha = 0;
  //adding physics so cloud/sand can move across screen

  game.physics.enable(sanddust1, Phaser.Physics.ARCADE);

  sanddust1.body.velocity.x = 40;
  game.add.tween(sanddust1).to( { alpha: 1 }, 5000, Phaser.Easing.Linear.None, true, 0, 100, true);
  menu_music = game.sound.play('menuMusic'); //adding theme music
  ancientText = game.add.bitmapText(300, 150, 'ancientFont', 'The Kingphant of Anuradhapura', 75); //load the title
  ancientText.alpha = 1;
  game.add.tween(ancientText).to( { alpha: 2 }, 5000, Phaser.Easing.Linear.None, true);
  style = {font: '65px Arial', fill: '#ffffff'};
  tapText = game.add.text(1050, 970, 'tap to begin', style); //font for tap to begin
  tapText.alpha = 0;
  game.add.tween(tapText).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 2000, true);
  game.time.events.repeat(Phaser.Timer.SECOND * 5, 20, this.createClouds, this);


}
mainMenuState.prototype.createClouds = function () {

  cloud = game.add.sprite(0, 0, 'cloud');
  cloud.scale.setTo(0.8,0.5);
  pink_cloud = game.add.sprite(300, 40, 'pinkcloud');
  game.physics.enable(cloud, Phaser.Physics.ARCADE);
  game.physics.enable(pink_cloud, Phaser.Physics.ARCADE);
  cloud.alpha = 0.4;
  pink_cloud.alpha = 0.3;
  cloud.body.velocity.x = 20;
  pink_cloud.body.velocity.x = 20;


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
