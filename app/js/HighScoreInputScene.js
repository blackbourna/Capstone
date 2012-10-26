goog.provide('HighScoreInputScene');
HighScoreInputScene = function(director) {
    var scene = new lime.Scene();
    var highScoreLabel = new lime.Label().setPosition(50, 50).setText('Enter your name');
    scene.appendChild(highScoreLabel);
    var highScoreInputLabel = new lime.Label().setPosition(50, 100).setText('');
    scene.appendChild(highScoreInputLabel);
    
    var keyevents = function(e) {
        var txt = highScoreInputLabel.getText();
        if (e.keyCode == goog.events.KeyCodes.BACKSPACE) {
            if (txt.length > 0) {
                txt = txt.substring(0, txt.length - 2);
            }
        } else if (/^[A-Z0-9 ]$/.test(String.fromCharCode(e.keyCode))) { // http://stackoverflow.com/questions/2450641/validating-alphabetic-only-string-in-javascript
            txt = txt + String.fromCharCode(e.keyCode);
        }
        highScoreInputLabel.setText(txt);
    }
    var keyhandler = new goog.events.KeyHandler(document);
	goog.events.listen(keyhandler, 'key', keyevents);
    
    var startGameButton = new lime.GlossyButton('Submit').setPosition(500, 300).setSize(500, 50);
    goog.events.listen(startGameButton, ['mousedown','touchstart'], function(e) {
        new MazeMenu(director).showMenu();
    });
    scene.appendChild(startGameButton);
    
    director.replaceScene(scene);
}
