goog.require('MazeLoader');
goog.provide('GameMenu');
//goog.inherits(rb.Button, lime.GlossyButton);// look into inherits!

GameMenu=function(director) {
	var director = director;
	this.showMenu = function() {
		var scene = new lime.Scene();
		var startGameButton = new lime.GlossyButton('Start Game').setPosition(500, 500).setSize(500, 50);
		goog.events.listen(startGameButton, ['mousedown','touchstart'], function(e) {
			new MazeLoader(director).getMaze();
		});
		scene.appendChild(startGameButton);
		director.replaceScene(scene);
	}
}
