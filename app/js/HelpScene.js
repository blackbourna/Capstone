goog.provide('HelpScene');
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
