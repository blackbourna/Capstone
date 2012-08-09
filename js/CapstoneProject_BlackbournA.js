//set main namespace
goog.provide('CapstoneProject_BlackbournA');

//get requirements

// my classes
goog.require('Bot');
goog.require('Maze');
goog.require('Constants');

// basics
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.GlossyButton');

//goog.require('lime.Layer');
//goog.require('lime.Label');

// animations
goog.require('lime.animation.Spawn');
goog.require('lime.animation.Sequence');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');
goog.require('lime.animation.RotateBy');

// fill effects
goog.require('lime.fill.LinearGradient');

//events/keyhandlers
goog.require('goog.events');
goog.require('goog.events.KeyCodes');
goog.require('goog.events.KeyHandler');
goog.require('goog.math.Coordinate');

//ajax stuff
goog.require('goog.net.XhrIo');
goog.require('goog.json');

// Game entrypoint
CapstoneProject_BlackbournA.start = function(){
    Point = goog.math.Coordinate;

    alert('wtf');
    var director = new lime.Director(document.body, 100, 100);
    var scene = new lime.Scene();
    director.replaceScene(scene);
};

CapstoneProject_BlackbournA.loadMaze = function(){
    var request = new goog.net.XhrIo();

    goog.events.listen(request, 'complete', function(){
        //request complete
        if (request.isSuccess()){
            var data = request.getResponseJson();
            //self.start = new Point(data.start.x, data.start.y);
            //// parse goog.math.Vec2
            //self.start.dir = data.start.dir;
            //console.log(self);
            //self.setupAfterAjaxMazeLoad();
        } else {
            //error
        }
    });
    request.send('./mazeloader.php');
};

CapstoneProject_BlackbournA.startGame = function() {
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
    
    // key events    
    var key_event = function (e) {
        var sum = goog.math.Coordinate.sum;
        var keyCodes = goog.events.KeyCodes;
        var msg = '';
        switch (e.keyCode) {
            // Bot Directions
            // Forward
            case keyCodes.UP:
                msg = 'Moved forward.';
                bot.sprite.setPosition(sum(bot.sprite.getPosition(), Constants.DIR_UP));
            break;
            // Back
            case keyCodes.DOWN:
                msg = 'Moved back.';
                bot.sprite.setPosition(sum(bot.sprite.getPosition(), Constants.DIR_DOWN));
            break;
            // Turn Right
            case keyCodes.RIGHT:
                if (e.event_.shiftKey) {
                    msg = 'Looked right.';
                } else {
                    msg = 'Turned right.';
                    bot.sprite.runAction(new lime.animation.Sequence(
                        new lime.animation.ScaleTo(1.2).setDuration(.2),
                        new lime.animation.RotateBy(-90),
                        new lime.animation.ScaleTo(1).setDuration(.2)
                    ));
                    bot.sprite.setPosition(sum(bot.sprite.getPosition(), Constants.DIR_RIGHT));
                }
            break;
            // Turn Left
            case keyCodes.LEFT:
                msg = 'Turned left.';
                bot.sprite.runAction(new lime.animation.Sequence(
                    new lime.animation.ScaleTo(1.2).setDuration(.2),
                    new lime.animation.RotateBy(90),
                    new lime.animation.ScaleTo(1).setDuration(.2)
                ));
                bot.sprite.setPosition(sum(bot.sprite.getPosition(), Constants.DIR_LEFT));
                //new lime.animation.ScaleTo(1),
            break;
            // Camera zoom
            case keyCodes.A:
                scene.runAction(new lime.animation.ScaleTo(scene.getScale().x * 2));
            break;
            case keyCodes.Z:
                console.log("Z");
                scene.runAction(new lime.animation.ScaleTo(scene.getScale().x / 2));
            break;
            // Sprint forward
            case keyCodes.SPACE:
                msg = 'Sprinted forward.';
            break;
            // Rotate
            case keyCodes.CTRL:
                msg = 'Turned 180 degrees.';
            break;
            // Scan
            case keyCodes.ENTER:
                msg = 'Scanned for energy.';
            break;
            case keyCodes.MAC_ENTER:
                msg = 'Scanned for energy.';
            break;
            // Pick up recharger
            case keyCodes.BACKSLASH:
                msg = 'Picked up energy.';
            break;
        }
        console.log(
            'keyCode: ' + e.keyCode +
            ', charCode: ' + e.charCode +
            ', repeat: ' + e.repeat +
            ', target: ' + e.target +
            ', native event: ' + e.getBrowserEvent().type);
        console.log(e);
    }
    goog.events.listen(new goog.events.KeyHandler(document), 'key', key_event);

    // set current scene active
    director.replaceScene(scene);
};

//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('CapstoneProject_BlackbournA.start', CapstoneProject_BlackbournA.start);
