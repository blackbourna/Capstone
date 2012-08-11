//set main namespace
goog.provide('CapstoneProject_BlackbournA.Game');

Game.getScene = function() {
// Setup visuals
    var director = new lime.Director(document.body, Constants.APP_W_PX, Constants.APP_H_PX);
    var scene = new lime.Scene();
    
    // Background
    var backgroundGradient = new lime.fill.LinearGradient();
    backgroundGradient.addColorStop(0, '#ABCDEF');
    backgroundGradient.addColorStop(Constants.APP_W_PX, '#BADA55');
    var background = new lime.Sprite().setSize(Constants.APP_W_PX + 100, Constants.APP_H_PX + 100).setFill(backgroundGradient).setAnchorPoint(0, 0)
    scene.appendChild(background);
    
    // HUD
    
    // Eternal Darkness
    var seeminglyEndlessUndiscoveredBlackness = new lime.Sprite().setSize(Constants.MAZE_W_PX, Constants.MAZE_H_PX).setFill('#000000').setAnchorPoint(0, 0).setPosition(Constants.TOP_CORNER);
    scene.appendChild(seeminglyEndlessUndiscoveredBlackness);
    // there's an issue here while loading the maze via ajax- need to 
    // Add Bot
    var bot = new Bot(maze.start);
    scene.appendChild(bot.sprite);

    goog.events.listen(new goog.events.KeyHandler(document), 'key', key_event);

    // set current scene active
    director.replaceScene(scene);
}