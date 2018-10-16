let preloadSate = function(){};

preloadSate.prototype.preload = function () {
  game.load.image("title","assets/backgrounds/titleScreen_bg.png");
  game.load.image("shop","assets/backgrounds/shop.png");
  game.load.image("fight","assets/backgrounds/fight_bg.png");
  game.load.image("victory","assets/backgrounds/victory_bg.png");
  game.load.image("playbutton","assets/playbutton.png");
  game.load.bitmapFont('ancientFont', 'assets/fonts/ancientFont.png', 'assets/fonts/ancientFont.fnt');
  game.load.audio('menuMusic', 'assets/music/MenuMusic.wav');
};

preloadSate.prototype.create = function () {
  game.state.start("MainMenu");
};
