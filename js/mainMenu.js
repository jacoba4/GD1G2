 let mainMenuState = function(){};

let text;

mainMenuState.prototype.create = function () {
  //add menu buttons, animations, and title music
  game.add.sprite(0,0,"title");
  text = game.add.bitmapText(100, 100, 'ancientFont', 'Kingphant of Anuradhapura', 50);
};

mainMenuState.prototype.update = function () {
  //display animations if we want them / check for clicks and stuff
  text.setText('Kingphant of Anuradhapura');
};                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
