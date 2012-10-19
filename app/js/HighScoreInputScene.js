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
    director.replaceScene(scene);
    // have to use  google editor field, limejs has no proper text input
    // https://groups.google.com/forum/?fromgroups=#!topic/limejs/txaxgK3eXQg
    //function makeTextBox(idString) {
    //textBox = new goog.editor.Field(idString);
    //textBox.setHtml(false, "Enter Text...");
    //textBox.makeEditable();
    //}
    //
    //var titleInput = new lime.Label().setAnchorPoint(0.5,0).setPosition(0,0).setFill('#fff').setSize(200,50).setText('Click here to enter text');
    //titleInput.getDeepestDomElement().setAttribute('id','titleInput');
    //
    //goog.events.listen(titleInput, lime.Button.Event.CLICK, function() {  makeTextBox(titleInput.getDeepestDomElement().getAttribute('id'));
    //});
}
