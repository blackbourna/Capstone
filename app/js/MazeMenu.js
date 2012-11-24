goog.provide('MazeMenu');
goog.require('MazeLoader');
/*
I Andrew Blackbourn, 000129408 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
Source code licensed under 2-clause license ("Simplified BSD License" or "FreeBSD License"). See README.md for details.
*/
MazeMenu=function(director) {
	var director = director;
	this.showMenu = function() {
		var scene = new lime.Scene();
		
		var CBButton = new lime.GlossyButton('Circuit Board').setPosition(500, 100).setSize(500, 50).setColor('#ABCDEF');
		goog.events.listen(CBButton, ['mousedown','touchstart'], function(e) {
			new MazeLoader(director).getMaze('CB');
		});
		scene.appendChild(CBButton);

		var GRButton = new lime.GlossyButton('Grid of Rooms').setPosition(500, 200).setSize(500, 50).setColor('#89ABCD');
		goog.events.listen(GRButton, ['mousedown','touchstart'], function(e) {
			new MazeLoader(director).getMaze('GR');
		});
		scene.appendChild(GRButton);

		var CBButton = new lime.GlossyButton('Nested Squares').setPosition(500, 300).setSize(500, 50).setColor('#56789A');
		goog.events.listen(CBButton, ['mousedown','touchstart'], function(e) {
			new MazeLoader(director).getMaze('NS');
		});
		scene.appendChild(CBButton);
		
		var RGButton = new lime.GlossyButton('Recursive Growth').setPosition(500, 400).setSize(500, 50).setColor('#345678');
		goog.events.listen(RGButton, ['mousedown','touchstart'], function(e) {
			new MazeLoader(director).getMaze('RG');
		});
		scene.appendChild(RGButton);
		
		var PRButton = new lime.GlossyButton('Pure Random').setPosition(500, 500).setSize(500, 50).setColor('#56789A');
		goog.events.listen(PRButton, ['mousedown','touchstart'], function(e) {
			new MazeLoader(director).getMaze('PR');
		});
		scene.appendChild(PRButton);
		
		var FMButton = new lime.GlossyButton('Frilly Mondrian').setPosition(500, 600).setSize(500, 50).setColor('#89ABCD');
		goog.events.listen(FMButton, ['mousedown','touchstart'], function(e) {
			new MazeLoader(director).getMaze('FM');
		});
		scene.appendChild(FMButton);
		
		var goBack = new lime.GlossyButton('Go Back').setPosition(500, 700).setSize(500, 50).setColor('#FF0000');
		goog.events.listen(goBack, ['mousedown','touchstart'], function(e) {
			director.replaceScene(new GameMenu(director).showMenu(), Globals.transition);
		});
		scene.appendChild(goBack);
		
		return scene;
	}
}
