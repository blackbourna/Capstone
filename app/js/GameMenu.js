goog.provide('GameMenu');
goog.require('MazeLoader');
goog.require('MazeMenu');
//goog.inherits(rb.Button, lime.GlossyButton);// look into inherits!

GameMenu=function(director) {
	var director = director;
	var self = this;
	this.showMenu = function() {
		var scene = new lime.Scene();
		scene.setRenderer(lime.Renderer.CANVAS);
		
		var startGameButton = new lime.GlossyButton('Start Game').setPosition(500, 300).setSize(500, 50);
		goog.events.listen(startGameButton, ['mousedown','touchstart'], function(e) {
			new MazeMenu(director).showMenu();
		});
		scene.appendChild(startGameButton);
		
		var startEasyGameButton = new lime.GlossyButton('Start Game - Easy Mode').setPosition(500, 400).setSize(500, 50);
		goog.events.listen(startEasyGameButton, ['mousedown','touchstart'], function(e) {
			Globals.easyMode = true;
			new MazeMenu(director).showMenu();
		});
		scene.appendChild(startEasyGameButton);

		var helpButton = new lime.GlossyButton('Instructions').setPosition(500, 500).setSize(500, 50);
		goog.events.listen(helpButton, ['mousedown','touchstart'], function(e) {
			
		});
		scene.appendChild(helpButton);

		var highscoreButton = new lime.GlossyButton('High Scores').setPosition(500, 600).setSize(500, 50);
		goog.events.listen(highscoreButton, ['mousedown','touchstart'], function(e) {

		});
		scene.appendChild(highscoreButton);

		director.replaceScene(scene);
	}
}
