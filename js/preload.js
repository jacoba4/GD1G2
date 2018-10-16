let preloadSate = function(){};

preloadSate.prototype.preload = function () {
  game.load.image("title","assets/backgrounds/titleScreen_bg.png");
  game.load.image("shop","assets/backgrounds/shop.png");
  game.load.image("fight","assets/backgrounds/fight_bg.png");
  game.load.image("victory","assets/backgrounds/victory_bg.png");
  game.load.image("playbutton","assets/playbutton.png");
  game.load.image("loss", "assets/storyScreens/storyDefeat.png");
  game.load.image("story1", "assets/storyScreens/storyScreen1.png")
  game.load.image("story2", "assets/storyScreens/storyScreen2.png")
  game.load.image("story3", "assets/storyScreens/storyScreen3.png")
  game.load.image("story4", "assets/storyScreens/storyScreen4.png")
  game.load.image("story5", "assets/storyScreens/storyScreen5.png")
  game.load.image("Victory", "assets/storyScreens/storyVictory.png")
};

preloadSate.prototype.create = function () {
  game.state.start("MainMenu");
};
