let preloadSate = function(){};

preloadSate.prototype.preload = function () {
  game.load.image("title","assets/backgrounds/titleScreen_bg.png");
  game.load.image("shop","assets/backgrounds/shop_bg.png");
  game.load.image("fight","assets/backgrounds/fight_bg.png");
  game.load.image("victory","assets/backgrounds/victory_bg.png");
};

preloadSate.prototype.create = function () {
  game.state.start("Fight");
};
