//set main namespace
goog.provide('Game');

goog.require('Constants');
goog.require('Globals');
// fill effects
goog.require('lime.fill.LinearGradient');
goog.require('lime.Sprite');

goog.require('lime.Layer');

Game = function(maze, director) {
// Setup visuals
    var scene = new lime.Scene();
	
    // Background
    var backgroundGradient = new lime.fill.LinearGradient();
    backgroundGradient.addColorStop(0, '#ABCDEF');
    backgroundGradient.addColorStop(Constants.Graphics.APP_DIMENSIONS.x, '#BADA55');
    var background = new lime.Sprite()
		.setSize(Constants.Graphics.APP_DIMENSIONS.x, Constants.Graphics.APP_DIMENSIONS.y)
		.setFill(backgroundGradient)
		.setAnchorPoint(0, 0)
		.setPosition(0, 0);
    scene.appendChild(background);
    
    // BotStats & HUD
    var botStats = new lime.RoundedRect()
		.setSize(225, 450)
		.setFill('#DEFFFF')
		.setPosition(10, 50)
		.setAnchorPoint(0, 0)
		.setRadius(30);
	background.appendChild(botStats);
	
    var hudContainer = new lime.RoundedRect()
		.setSize(225, 100)
		.setFill('#DEFFFF')
		.setPosition(10, 550)
		.setAnchorPoint(0, 0)
		.setRadius(30);
	background.appendChild(hudContainer);
    
	var mazeLayer = new lime.Layer()
		.setSize(Constants.Graphics.MAZE_DIMENSIONS.x, Constants.Graphics.MAZE_DIMENSIONS.y)
	    .setAnchorPoint(0, 0)
		.setPosition(Constants.Graphics.TOP_CORNER);
    background.appendChild(mazeLayer);
    
	var mazeMask = new lime.Layer()
		.setSize(Constants.Graphics.MAZE_DIMENSIONS.x, Constants.Graphics.MAZE_DIMENSIONS.y)
	    .setAnchorPoint(0, 0)
		.setPosition(Constants.Graphics.TOP_CORNER);
    background.appendChild(mazeMask);
    
    mazeLayer.setMask(mazeMask);
    
    // Eternal Darkness
    var mazeContainer = new lime.Sprite()
		.setSize(Constants.Graphics.MAZE_DIMENSIONS.x, Constants.Graphics.MAZE_DIMENSIONS.y)
	    .setAnchorPoint(0, 0)
	    .setFill('#000000')
		.setPosition(0, 0);
    mazeLayer.appendChild(mazeContainer);
	
    // Add Bot
    var bot = new Bot(maze, mazeContainer, director, mazeLayer);
    mazeContainer.appendChild(bot.sprite);
    //maze.drawMaze(mazeContainer, bot, false);
    maze.init(mazeContainer);
    // set current scene active
    return scene;
}
