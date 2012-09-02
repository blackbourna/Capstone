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
    backgroundGradient.addColorStop(Constants.Graphics.APP_W_PX, '#BADA55');
    var background = new lime.Sprite()
		.setSize(Constants.Graphics.APP_W_PX, Constants.Graphics.APP_H_PX)
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
    
    // Eternal Darkness
    var mazeContainer = new lime.Sprite()
		.setSize(Constants.Graphics.MAZE_W_PX, Constants.Graphics.MAZE_H_PX)
		.setFill('#000000')
	    .setAnchorPoint(0, 0)
		.setPosition(Constants.Graphics.TOP_CORNER)
    background.appendChild(mazeContainer);

    // Add Bot
    var bot = new Bot(maze, mazeContainer, director);
    mazeContainer.appendChild(bot.sprite);
    //maze.drawMaze(mazeContainer, bot, false);
    maze.init(mazeContainer);
    // set current scene active
    return scene;
}
