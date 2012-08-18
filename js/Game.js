//set main namespace
goog.provide('Game');

goog.require('KeyEvents');

Game = function(maze) {
// Setup visuals
    var scene = new lime.Scene();
    // Background
    var backgroundGradient = new lime.fill.LinearGradient();
    backgroundGradient.addColorStop(0, '#ABCDEF');
    backgroundGradient.addColorStop(Constants.APP_W_PX, '#BADA55');
    var background = new lime.Sprite().setSize(Constants.APP_W_PX + 100, Constants.APP_H_PX + 100).setFill(backgroundGradient).setAnchorPoint(0, 0)
    scene.appendChild(background);
    
    // HUD
    
    // Eternal Darkness
    var seeminglyEndlessUndiscoveredBlackness = new lime.Sprite()
		.setSize(Constants.MAZE_W_PX, Constants.MAZE_H_PX)
		.setFill('#000000').setAnchorPoint(0, 0)
		.setPosition(Constants.Graphics.TOP_CORNER);
    scene.appendChild(seeminglyEndlessUndiscoveredBlackness);
    // there's an issue here while loading the maze via ajax- need to 
    // Add Bot
    var bot = new Bot(maze.start, maze.startDir);
    scene.appendChild(bot.sprite);

    goog.events.listen(new goog.events.KeyHandler(document), 'key', KeyEvents);

    // set current scene active
    return scene;
}
