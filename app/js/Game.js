//set main namespace
goog.provide('Game');

goog.require('lime.fill.Frame');
/*
I Andrew Blackbourn, 000129408 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
Source code licensed under 2-clause license ("Simplified BSD License" or "FreeBSD License"). See README.md for details.
*/
goog.require('Constants');
goog.require('Globals');

Game = function(maze, director) {
    // Setup visuals
    var scene = new lime.Scene();
    var director = director;
    scene.setRenderer(lime.Renderer.DOM); // lime.Renderer.CANVAS/lime.Renderer.DOM
    // Background
    //var backgroundGradient = new lime.fill.LinearGradient();
    //backgroundGradient.addColorStop(0, '#ABCDEF');
    //backgroundGradient.addColorStop(Constants.Graphics.APP_DIMENSIONS.x, '#BADA55');

	Utils.addBackgroundToScene(scene);
    
    // BotStats & HUD
    Globals.logContainer = new lime.RoundedRect()
		.setSize(225, 450)
		.setFill(new lime.fill.LinearGradient()
			.addColorStop(0, '#2d3f4f')
			.addColorStop(450, '#4f8adb'))
		.setPosition(10, 50)
		.setAnchorPoint(0, 0)
		.setRadius(30);
	scene.appendChild(Globals.logContainer);
	Globals.logLabel = new lime.LabelMulti('')
        .setAnchorPoint(0, 0)
        .setPosition(10, 10)
        .setAlign('left');
    Globals.logContainer.appendChild(Globals.logLabel);
    
    hudContainer = new lime.RoundedRect()
		.setSize(225, 100)
		.setFill(new lime.fill.LinearGradient()
			.addColorStop(0, '#2d3f4f')
			.addColorStop(100, '#4f8adb'))
		.setPosition(10, 550)
		.setAnchorPoint(0, 0)
		.setRadius(30);
	scene.appendChild(hudContainer);
    Globals.hudLabel = new lime.LabelMulti('Hello!')
        .setAnchorPoint(0, 0)
        .setPosition(10, 10)
        .setAlign('left');
    hudContainer.appendChild(Globals.hudLabel);
    
    // Go back button
	var goBack = new lime.GlossyButton('Go Back')
		.setPosition(125, 700)
		.setSize(200, 40)
		.setColor('#ed4753');
	goog.events.listen(goBack, ['mousedown','touchstart'], function(e) {
		bot.dispose();
        director.replaceScene(new GameMenu(director).showMenu(), Globals.transition);
	});
	scene.appendChild(goBack);
	
    // Eternal Darkness
    var mazeContainer = new lime.Sprite()
		.setSize(Constants.Graphics.MAZE_DIMENSIONS.x, Constants.Graphics.MAZE_DIMENSIONS.y)
		.setFill('#0b1d2e')
	    .setAnchorPoint(0, 0)
		.setPosition(Constants.Graphics.TOP_CORNER);
    scene.appendChild(mazeContainer);

    maze.init(mazeContainer);
    
	if (Globals.easyMode) {
		maze.drawMaze(mazeContainer);
	}
    
    // Add Bot
    var bot = new Bot(maze, mazeContainer, director, maze.getRechargerSprite());

    // set current scene active
    return scene;
}
