goog.provide('HighScoreInputScene');
/*
I Andrew Blackbourn, 000129408 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
Source code licensed under 2-clause license ("Simplified BSD License" or "FreeBSD License"). See README.md for details.
*/
HighScoreInputScene = function(director, maze, energy, timer, history) {
    var scene = new lime.Scene();
	Utils.addBackgroundToScene(scene);
    var self = this;
    self.btnEnabled = true;
    
    var highScoreLabel = new lime.Label()
		.setAnchorPoint(0, 0)
		.setPosition(0, 64)
		.setText('Enter your name')
		.setFontWeight('bold')
		.setFontSize(36)
		.setSize(1024, 128);
    scene.appendChild(highScoreLabel);
    var highScoreInputLabel = new lime.Label()
		.setAnchorPoint(0, 0)
		.setPosition(0, 128)
		.setText('')
		.setFontWeight('bold')
		.setFontSize(72)
		.setSize(1024, 256);
	
	// remove this test obj!
	if (!maze) {
		timer = 123;
		history = ['test'];
		var name='abc';
		energy= 650;
		maze = {};
		maze.seed = 123;
		maze.type='gr';
	}
    scene.appendChild(highScoreInputLabel);
    var stats = "Maze Id: " + " " + maze.seed + "\n";
    stats += "Maze Type: " + " " + maze.type + "\n";
    stats += "Final Energy: " + " " + energy + " " +  "\n";
    stats += "Time: " + " " + Utils.getFormattedTime(timer) + " ";
    var statsLabel = new lime.LabelMulti()
		.setAnchorPoint(0, 0)
		.setPosition(360, 256)
		.setText(stats)
		.setFontWeight('bold')
		.setFontSize(36)
		.setSize(1024, 128);
	scene.appendChild(statsLabel);
    var keyevents = function(e) {
        var txt = highScoreInputLabel.getText();
        if (e.keyCode == goog.events.KeyCodes.BACKSPACE) {
            if (txt.length > 0) {
                txt = txt.substring(0, txt.length - 1);
            }
        } else if (/^[A-Z0-9 ]$/.test(String.fromCharCode(e.keyCode)) && txt.length < 20) { // http://stackoverflow.com/questions/2450641/validating-alphabetic-only-string-in-javascript
            txt = txt + String.fromCharCode(e.keyCode);
        }
        highScoreInputLabel.setText(txt);
    }
    var keyhandler = new goog.events.KeyHandler(document);
	goog.events.listen(keyhandler, 'key', keyevents);
    
    var startGameButton = new lime.GlossyButton('Submit').setPosition(500, 512).setSize(500, 50);
    goog.events.listen(startGameButton, ['mousedown','touchstart'], function(e) {
        var name = highScoreInputLabel.getText().trim();
		if (name.length > 0 && self.btnEnabled) {
            Utils.submitHighScore(name, maze, energy, timer, history, director, self)
		}
    });
    scene.appendChild(startGameButton);
    
    director.replaceScene(scene, Globals.transition);
}
