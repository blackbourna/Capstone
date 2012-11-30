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
		Utils.addBackgroundToScene(scene);
		
		var splash = new lime.Sprite()
			.setFill(Constants.Assets.IMAGE_PATH + "splash.png")
			.setSize(840, 434)
			.setAnchorPoint(0, 0)
			.setPosition(75, 0);
		scene.appendChild(splash);
		
		var btnSize = {x: 500, y: 50};
		var btnPos = {x: 500, y: 425};
		var btnInterval = 75;
		
		var startEasyGameButton = new lime.GlossyButton('Start Game - Easy Mode')
			.setPosition(btnPos.x, btnPos.y)
			.setSize(btnSize.x, btnSize.y)
			.setColor("#4e5e6e");
		goog.events.listen(startEasyGameButton, ['mousedown','touchstart'], function(e) {
			Globals.easyMode = true;
			director.replaceScene(new MazeMenu(director).showMenu(), Globals.transition);
		});
		scene.appendChild(startEasyGameButton);
        
        btnPos.y += btnInterval;
        
		var startGameButton = new lime.GlossyButton('Start Game')
			.setPosition(btnPos.x, btnPos.y)
			.setSize(btnSize.x, btnSize.y)
			.setColor("#3e4e5e");
		goog.events.listen(startGameButton, ['mousedown','touchstart'], function(e) {
            Globals.easyMode = false;
			director.replaceScene(new MazeMenu(director).showMenu(), Globals.transition);
		});
		scene.appendChild(startGameButton);

		btnPos.y += btnInterval;

		var helpButton = new lime.GlossyButton('Instructions')
			.setPosition(btnPos.x, btnPos.y)
			.setSize(btnSize.x, btnSize.y)
			.setColor("#2d3e4e");
		goog.events.listen(helpButton, ['mousedown','touchstart'], function(e) {
			new HelpScene(director).show();
		});
		scene.appendChild(helpButton);
		
		btnPos.y += btnInterval;
		
		var highscoreButton = new lime.GlossyButton('View High Scores')
			.setPosition(btnPos.x, btnPos.y)
			.setSize(btnSize.x, btnSize.y)
			.setColor("#1c2e3e");
		goog.events.listen(highscoreButton, ['mousedown','touchstart'], function(e) {
			new HighScoreScene(director);
		});
		scene.appendChild(highscoreButton);
        
        btnPos.y += btnInterval;
        
		var highscoretestButton = new lime.GlossyButton('Sound is ' + (Globals.Audio.enabled ? "on":"off"))
			.setPosition(btnPos.x, btnPos.y)
			.setSize(btnSize.x, btnSize.y)
			.setColor("#0b1d2e");
		goog.events.listen(highscoretestButton, ['mousedown','touchstart'], function(e) {
            Globals.Audio.enabled = !Globals.Audio.enabled;
			highscoretestButton.setText('Sound is ' + (Globals.Audio.enabled ? "on":"off"));
		});
		scene.appendChild(highscoretestButton);

		return scene;
	}
}
