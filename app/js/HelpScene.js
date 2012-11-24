goog.provide('HelpScene');
/*
I Andrew Blackbourn, 000129408 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
Source code licensed under 2-clause license ("Simplified BSD License" or "FreeBSD License"). See README.md for details.
*/
HelpScene = function(director) {
    this.show = function() {
        var scene = new lime.Scene();
        var helpSprite = new lime.Sprite()
            .setFill(Constants.Assets.IMAGE_PATH + 'help.png')
            .setAnchorPoint(0, 0)
            .setPosition(0, 0)
            .setSize(1026, 768);
        scene.appendChild(helpSprite);
        goog.events.listen(scene, ['mousedown', 'keydown'], function() {
            director.popScene();
        });
        return scene;
    }
}
