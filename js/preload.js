let preloadSate = function(){};

preloadSate.prototype.preload = function () {
  game.load.image("title","assets/backgrounds/titleScreen_bg.png");
  game.load.image("shop","assets/backgrounds/shop.png");
  game.load.image("fight","assets/backgrounds/fight_bg.png");
  game.load.image("victory","assets/backgrounds/victory_bg.png");
  game.load.image("playbutton","assets/playbutton.png");
  game.load.bitmapFont('ancientFont', 'assets/fonts/ancientFont.png', 'assets/fonts/ancientFont.fnt');
  game.load.image('cloud', 'assets/cloud-overlays-png.png');
  game.load.audio('menuMusic', 'assets/music/MenuMusic.wav');
  game.load.image('story1', 'assets/storyScreens/storyScreen1.png');
  game.load.image('story2', 'assets/storyScreens/storyScreen2.png');
  game.load.image('story3', 'assets/storyScreens/storyScreen3.png');
  game.load.image('story4', 'assets/storyScreens/storyScreen4.png');
  game.load.image('story5', 'assets/storyScreens/storyScreen5.png');
  game.load.audio('fightmusic', 'assets/music/CombatSong.wav')
};

preloadSate.prototype.create = function () {
  game.state.start("MainMenu");
};
