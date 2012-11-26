goog.provide('GameMenu');
goog.require('MazeLoader');
goog.require('MazeMenu');
/*
I Andrew Blackbourn, 000129408 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
Source code licensed under 2-clause license ("Simplified BSD License" or "FreeBSD License"). See README.md for details.
*/
GameMenu=function(director) {
	var director = director;
	var self = this;
	this.showMenu = function() {
		var scene = new lime.Scene();
		
		var startEasyGameButton = new lime.GlossyButton('Start Game - Easy Mode').setPosition(500, 300).setSize(500, 50);
		goog.events.listen(startEasyGameButton, ['mousedown','touchstart'], function(e) {
			Globals.easyMode = true;
			director.replaceScene(new MazeMenu(director).showMenu(), Globals.transition);
		});
		scene.appendChild(startEasyGameButton);
        
		var startGameButton = new lime.GlossyButton('Start Game').setPosition(500, 400).setSize(500, 50);
		goog.events.listen(startGameButton, ['mousedown','touchstart'], function(e) {
            Globals.easyMode = false;
			director.replaceScene(new MazeMenu(director).showMenu(), Globals.transition);
		});
		scene.appendChild(startGameButton);

		var helpButton = new lime.GlossyButton('Instructions').setPosition(500, 500).setSize(500, 50);
		goog.events.listen(helpButton, ['mousedown','touchstart'], function(e) {
			
		});
		scene.appendChild(helpButton);

		var highscoreButton = new lime.GlossyButton('View High Scores').setPosition(500, 600).setSize(500, 50);
		goog.events.listen(highscoreButton, ['mousedown','touchstart'], function(e) {
			new HighScoreScene(director);
		});
		scene.appendChild(highscoreButton);
        
		var highscoretestButton = new lime.GlossyButton('Sound is ' + (Globals.Audio.enabled ? "on":"off")).setPosition(500, 700).setSize(500, 50);
		goog.events.listen(highscoretestButton, ['mousedown','touchstart'], function(e) {
            Globals.Audio.enabled = !Globals.Audio.enabled;
			highscoretestButton.setText('Sound is ' + (Globals.Audio.enabled ? "on":"off"));
		});
		scene.appendChild(highscoretestButton);

		return scene;
	}
}
