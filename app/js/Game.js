//set main namespace
goog.provide('Game');

goog.require('Constants');
goog.require('Globals');

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
    Globals.logContainer = new lime.RoundedRect()
		.setSize(225, 450)
		.setFill('#DEFFFF')
		.setPosition(10, 50)
		.setAnchorPoint(0, 0)
		.setRadius(30);
	background.appendChild(Globals.logContainer);
	Globals.logLabel = new lime.LabelMulti('')
        .setAnchorPoint(0, 0)
        .setPosition(10, 10)
        .setAlign('left');
    Globals.logContainer.appendChild(Globals.logLabel);
    
    hudContainer = new lime.RoundedRect()
		.setSize(225, 100)
		.setFill('#DEFFFF')
		.setPosition(10, 550)
		.setAnchorPoint(0, 0)
		.setRadius(30);
	background.appendChild(hudContainer);
    Globals.hudLabel = new lime.LabelMulti('Hello!')
        .setAnchorPoint(0, 0)
        .setPosition(10, 10)
        .setAlign('left');
    hudContainer.appendChild(Globals.hudLabel);
    
    // Go back button
	var goBack = new lime.GlossyButton('Go Back')
		.setPosition(125, 700)
		.setSize(200, 40)
		.setColor('#FF0000');
	goog.events.listen(goBack, ['mousedown','touchstart'], function(e) {
		bot.dispose();
	});
	scene.appendChild(goBack);
	
    // Eternal Darkness
    var mazeContainer = new lime.Sprite()
		.setSize(Constants.Graphics.MAZE_DIMENSIONS.x, Constants.Graphics.MAZE_DIMENSIONS.y)
		.setFill('#000000')
	    .setAnchorPoint(0, 0)
		.setPosition(Constants.Graphics.TOP_CORNER);
    background.appendChild(mazeContainer);

    maze.init(mazeContainer);
    
	if (Globals.easyMode) {
		maze.drawMaze(mazeContainer);
	}
    
    // Add Bot
    var bot = new Bot(maze, mazeContainer, director);

    // set current scene active
    return scene;
}
