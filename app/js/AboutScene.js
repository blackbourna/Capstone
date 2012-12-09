goog.provide('AboutScene');
/*
I Andrew Blackbourn, 000129408 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
Source code licensed under 2-clause license ("Simplified BSD License" or "FreeBSD License"). See README.md for details.
*/

/**
 * Scene for displaying the About Screen
 */

AboutScene = function(director) {
    var scene = new lime.Scene();
	Utils.addBackgroundToScene(scene);
    var self = this;
    self.btnEnabled = true;
    
    var bgRect = new lime.RoundedRect()
		.setSize(Constants.Graphics.APP_DIMENSIONS.x - 100, Constants.Graphics.APP_DIMENSIONS.y - 250)
		.setFill(new lime.fill.LinearGradient()
			.addColorStop(0, '#3e4e5e')
			.addColorStop(Constants.Graphics.APP_DIMENSIONS.y - 100, '#4f8adb'))
		.setPosition(50, 50)
		.setAnchorPoint(0, 0)
		.setRadius(30);
	scene.appendChild(bgRect);

	var addLabel = function(text, yPos, fontSize) {
		return new lime.Label(text)
			.setPosition(100, yPos)
			.setAlign('left')
			.setFontSize((fontSize) ? fontSize : 36)
			.setFontWeight(700)
			.setAnchorPoint(0, 0)
			.setSize(Constants.Graphics.APP_DIMENSIONS.x, 50)
	}
	
	scene.appendChild(addLabel("Programmed by Andrew Blackbourn", 100));
	scene.appendChild(addLabel("Graphics by Kai Lui", 150));
	
	scene.appendChild(addLabel("Original Java version by Aravin Duraikannan", 250));
	scene.appendChild(addLabel("Based on an original concept by Mark Yendt", 300));
	
	scene.appendChild(addLabel("Developed as a sixth semester capstone project", 400, 24));
	scene.appendChild(addLabel("For Mohawk College's Software Development program", 450, 24));
	
	scene.appendChild(addLabel('Source code licensed under 2-clause license ("Simplified BSD License" or "FreeBSD License").', 500, 18));
	
	var goBack = new lime.GlossyButton('Go Back').setAnchorPoint(0, 0).setPosition(500, Constants.Graphics.APP_DIMENSIONS.y - 50).setSize(550, 50).setColor('#ed4753');
	goog.events.listen(goBack, ['mousedown','touchstart'], function(e) {
		director.replaceScene(new GameMenu(director).showMenu(), Globals.transition);
	});
	scene.appendChild(goBack);
	
	return scene;
}
