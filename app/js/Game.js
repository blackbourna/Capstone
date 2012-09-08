//set main namespace
goog.provide('Game');

goog.require('Constants');
goog.require('Globals');
// fill effects
goog.require('lime.fill.LinearGradient');
goog.require('lime.Sprite');

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
	Globals.logLabel = new lime.Label('test\nWorldtestaet asdfg sdgasd gasd gasdg sd!')
        .setAnchorPoint(0, 0)
        .setPosition(50, 50);
    botStats.appendChild(Globals.logLabel);
    
    var hudContainer = new lime.RoundedRect()
		.setSize(225, 100)
		.setFill('#DEFFFF')
		.setPosition(10, 550)
		.setAnchorPoint(0, 0)
		.setRadius(30);
    Globals.hudLabel = new lime.Label('Hello!')
        .setAnchorPoint(0, 0)
        .setPosition(50, 50);
    hudContainer.appendChild(Globals.hudLabel);
    
	background.appendChild(hudContainer);
    
    // Eternal Darkness
    var mazeContainer = new lime.Sprite()
		.setSize(Constants.Graphics.MAZE_DIMENSIONS.x, Constants.Graphics.MAZE_DIMENSIONS.y)
		.setFill('#000000')
	    .setAnchorPoint(0, 0)
		.setPosition(Constants.Graphics.TOP_CORNER);
    background.appendChild(mazeContainer);
    
    maze.init(mazeContainer);
    
    // Add Bot
    var bot = new Bot(maze, mazeContainer, director);
    mazeContainer.appendChild(bot.sprite);
    // set current scene active
    return scene;
}
