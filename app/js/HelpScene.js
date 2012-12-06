goog.provide('HelpScene');
/*
I Andrew Blackbourn, 000129408 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
Source code licensed under 2-clause license ("Simplified BSD License" or "FreeBSD License"). See README.md for details.
*/
HelpScene = function(director) {
    this.show = function() {
        var scene = new lime.Scene();
		Utils.addBackgroundToScene(scene);
		var fill = Constants.Assets.IMAGE_PATH + (Globals.easyMode ? 'easy_mode.png' : 'hard_mode.png');
        var helpSprite = new lime.Sprite()
            .setFill(fill)
            .setAnchorPoint(0, 0)
            .setPosition(0, 0)
            .setSize(1014, 585);
        scene.appendChild(helpSprite);
        goog.events.listen(scene, ['mousedown', 'keydown'], function() {
            director.popScene();
        });
        return scene;
    }
}
