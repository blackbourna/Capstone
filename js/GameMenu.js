goog.require('MazeLoader');
goog.provide('GameMenu');
//goog.inherits(rb.Button, lime.GlossyButton);// look into inherits!

GameMenu=function(director) {
	this.director = director;
	this.showMenu = function() {
		var scene = new lime.Scene();
		var startGameButton = new lime.GlossyButton('Start Game').setPosition(500, 500).setSize(500, 50);
		goog.events.listen(startGameButton, ['mousedown','touchstart'], function(e) {
			new MazeLoader(this.director).getMaze();
		});
		scene.appendChild(startGameButton);
		this.director.replaceScene(scene);
	}
}
