//set main namespace
goog.provide('Game');

// my key handler
goog.require('KeyEvents');

goog.require('Constants');
// fill effects
goog.require('lime.fill.LinearGradient');
goog.require('lime.Sprite');

Game = function(maze) {
// Setup visuals
    var scene = new lime.Scene();
    
    // Background
    var backgroundGradient = new lime.fill.LinearGradient();
    backgroundGradient.addColorStop(0, '#ABCDEF');
    backgroundGradient.addColorStop(Constants.Graphics.APP_W_PX, '#BADA55');
    var background = new lime.Sprite()
		.setSize(Constants.Graphics.APP_W_PX, Constants.Graphics.APP_H_PX)
		.setFill(backgroundGradient)
		.setAnchorPoint(0, 0)
		.setPosition(0, 0);
    scene.appendChild(background);
    
    // HUD
    
    // Eternal Darkness
    var mazeContainer = new lime.Sprite()
		.setSize(Constants.Graphics.MAZE_W_PX, Constants.Graphics.MAZE_H_PX)
		.setFill('#000000')
	    .setAnchorPoint(0, 0)
		.setPosition(Constants.Graphics.TOP_CORNER);
    scene.appendChild(mazeContainer);

    // Add Bot
    var bot = new Bot(maze);
    mazeContainer.appendChild(bot.sprite);
    goog.events.listen(new goog.events.KeyHandler(document), 'key', new KeyEvents(bot, maze, scene, mazeContainer).events);
    // set current scene active
    return scene;
}
