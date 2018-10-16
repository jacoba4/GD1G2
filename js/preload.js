let preloadSate = function(){};

preloadSate.prototype.preload = function () {
  game.load.image("title","assets/backgrounds/titleScreen_bg.png");
  game.load.image("shop","assets/backgrounds/shop.png");
  game.load.image("fight","assets/backgrounds/fight_bg.png");
  game.load.image("victory","assets/backgrounds/victory_bg.png");
  //game.load.image("playbutton","assets/playbutton.png");
  game.load.image("loss", "assets/storyScreens/storyDefeat.png");
  game.load.image("story1", "assets/storyScreens/storyScreen1.png")
  game.load.image("story2", "assets/storyScreens/storyScreen2.png")
  game.load.image("story3", "assets/storyScreens/storyScreen3.png")
  game.load.image("story4", "assets/storyScreens/storyScreen4.png")
  game.load.image("story5", "assets/storyScreens/storyScreen5.png")
  game.load.image("Victory", "assets/storyScreens/storyVictory.png")
  game.load.audio('fightmusic', ['assets/music/CombatSong.wav']);
  game.load.audio('losemusic', ['assets/sounds/DefeatSound.wav']);
  game.load.audio('winmusic', ['assets/sounds/VictorySound.wav']);
  game.load.spritesheet("playeridle", "assets/sprites/Elephants/elephant1_all.png",1150,825);
  game.load.spritesheet("enemy1idle", "assets/sprites/Elephants/elephant2_all.png",1150,825);
  game.load.spritesheet("enemy2idle", "assets/sprites/Elephants/elephant3_all.png",1150,825);
  game.load.spritesheet("enemy3idle", "assets/sprites/Elephants/elephant4_all.png",1150,825);
  game.load.spritesheet("enemy4idle", "assets/sprites/Elephants/elephant5_all.png",1150,825);
  game.load.bitmapFont('ancientFont', 'assets/fonts/ancientFont.png', 'assets/fonts/ancientFont.fnt');
  game.load.image('cloud', 'assets/cloud-overlays-png.png');
  game.load.audio('menuMusic', 'assets/music/MenuMusic.wav');
};
preloadSate.prototype.create = function () {
  game.state.start("Fight");
};
