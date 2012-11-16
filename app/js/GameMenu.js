goog.provide('GameMenu');
goog.require('MazeLoader');
goog.require('MazeMenu');

GameMenu=function(director) {
	var director = director;
	var self = this;
	this.showMenu = function() {
		var scene = new lime.Scene();
		scene.setRenderer(lime.Renderer.CANVAS);
		
		var startGameButton = new lime.GlossyButton('Start Game').setPosition(500, 300).setSize(500, 50);
		goog.events.listen(startGameButton, ['mousedown','touchstart'], function(e) {
            Globals.easyMode = false;
			director.replaceScene(new MazeMenu(director).showMenu(), Globals.transition);
		});
		scene.appendChild(startGameButton);
		
		var startEasyGameButton = new lime.GlossyButton('Start Game - Easy Mode').setPosition(500, 400).setSize(500, 50);
		goog.events.listen(startEasyGameButton, ['mousedown','touchstart'], function(e) {
			Globals.easyMode = true;
			director.replaceScene(new MazeMenu(director).showMenu(), Globals.transition);
		});
		scene.appendChild(startEasyGameButton);

		var helpButton = new lime.GlossyButton('Instructions').setPosition(500, 500).setSize(500, 50);
		goog.events.listen(helpButton, ['mousedown','touchstart'], function(e) {
			
		});
		scene.appendChild(helpButton);

		var highscoreButton = new lime.GlossyButton('View High Scores').setPosition(500, 600).setSize(500, 50);
		goog.events.listen(highscoreButton, ['mousedown','touchstart'], function(e) {
			new HighScoreScene(director);
		});
		scene.appendChild(highscoreButton);
        
		//var optionsButton = new lime.GlossyButton('Options').setPosition(500, 700).setSize(500, 50);
		//goog.events.listen(highscoreButton, ['mousedown','touchstart'], function(e) {
		//	new OptionsScene(director);
		//});
		//scene.appendChild(optionsButton);
        
		var highscoretestButton = new lime.GlossyButton('Enter Highscore').setPosition(500, 700).setSize(500, 50);
		goog.events.listen(highscoretestButton, ['mousedown','touchstart'], function(e) {
			new HighScoreInputScene(director);
		});
		scene.appendChild(highscoretestButton);

		return scene;
	}
}
