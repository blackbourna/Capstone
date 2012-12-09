goog.provide('HelpScene');
/*
I Andrew Blackbourn, 000129408 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
Source code licensed under 2-clause license ("Simplified BSD License" or "FreeBSD License"). See README.md for details.
*/

/**
 * Container for the Help Screen
 */
HelpScene = function(director) {
    this.show = function() {
        var scene = new lime.Scene();
		Utils.addBackgroundToScene(scene);
		var rect = new lime.RoundedRect()
			.setFill("#5f6f7f")
            .setAnchorPoint(0, 0)
            .setPosition(10, 20)
            .setSize(1000, 735)
			.setRadius(30);
		scene.appendChild(rect);
		var fill = Constants.Assets.IMAGE_PATH + (Globals.easyMode ? 'easy_mode.png' : 'hard_mode.png');
        var helpSprite = new lime.Sprite()
            .setFill(fill)
            .setAnchorPoint(0, 0)
            .setPosition(75, 50)
            .setSize(850, 485);
        scene.appendChild(helpSprite);
        var costMenuSprite = new lime.Sprite()
            .setFill(Constants.Assets.IMAGE_PATH + 'costmenu.png')
            .setAnchorPoint(0, 0)
            .setPosition(100, 490)
            .setSize(327, 265);
		scene.appendChild(costMenuSprite);
        goog.events.listen(scene, ['mousedown', 'keydown'], function() {
            director.popScene();
        });
        return scene;
    }
}
