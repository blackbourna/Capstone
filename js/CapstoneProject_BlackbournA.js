//set main namespace
goog.provide('CapstoneProject_BlackbournA');

//get requirements

// basics
goog.require('lime.Director');
goog.require('lime.Scene');
//goog.require('lime.Layer');
//goog.require('lime.Label');

// animations
goog.require('lime.animation.Spawn');
goog.require('lime.animation.Sequence');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');
goog.require('lime.animation.RotateBy');

// fill efects
goog.require('lime.fill.LinearGradient');

//events/keyhandlers
goog.require('goog.events');
goog.require('goog.events.KeyCodes');
goog.require('goog.events.KeyHandler');
goog.require('goog.math.Coordinate');

//ajax stuff
goog.require('goog.net.XhrIo');
goog.require('goog.json');

function Maze() {
    var self = this; //  private functions lose THIS reference - see http://css.dzone.com/news/object-oriented-javascript-und
    self.width = MAZE_W;
    self.height = MAZE_H;
	self.maze = null;
	self.goal = null;
	self.recharger = null;
    self.get = function(x, y) {
        return self.maze[x][y];
    }
    var parseMaze = function() {
		var request = new goog.net.XhrIo();

		goog.events.listen(request, 'complete', function(){
		//request complete
		if(request.isSuccess()){
			var data = request.getResponseJson();
			console.log(data);
		} else {
			//error
		}
		});
		request.send('./mazeloader.php');
    }
	
	parseMaze();
}

function Bot() {
    var self = this;
    this.initializeSprite = function(x, y) {
        self.position =  new goog.math.Coordinate(x, y);
        self.sprite = new lime.Sprite().setFill(IMG_ASSETS + 'bot.png').setAnchorPoint(0, 0);
        alert(self.getScreenPosition());
        self.sprite.setPosition(this.getScreenPosition());
    }
    this.getScreenPosition = function() {
        var coord = new goog.math.Coordinate(TOP_CORNER.x + this.position.x, TOP_CORNER.y + this.position.y);
        return coord;
    }
	this.goForward = function() {}
	this.goBack = function() {}
	this.goRight = function() {}
	this.goLeft = function() {}
	
	this.lookForward = function() {}
	this.lookBack = function() {}
	this.lookRight = function() {}
	this.lookLeft = function() {}
	
	this.lookFar = function() {}
	
	this.sprint = function() {}
	this.oneEighty = function() {}
	
	this.scan = function() {}
	this.pickUp = function() {}
}

// Game entrypoint
CapstoneProject_BlackbournA.start = function(){

    // Define global constants
    
    IMG_ASSETS = 'assets/sprites/';
    MAZE_ASSETS = 'assets/mazes/';
    SFX_ASSETS = 'assets/sfx/';
    
    CELL_W = 16;
    CELL_H = 16;

    MAZE_W = 44;
    MAZE_H = 44;

    MAZE_W_PX = CELL_W * MAZE_W;
    MAZE_H_PX = CELL_H * MAZE_H;
    
    MAZE_CORNER = null;

    DIR_UP = new goog.math.Coordinate(0, -CELL_H);
    DIR_DOWN = new goog.math.Coordinate(0, CELL_H);
    DIR_LEFT = new goog.math.Coordinate(-CELL_W, 0);
    DIR_RIGHT = new goog.math.Coordinate(CELL_W, 0);

    APP_W_PX = 1024;
    APP_H_PX = 768;
    
    TOP_CORNER = new goog.math.Coordinate(APP_W_PX - MAZE_W_PX - 25, 35);
    
    // Define globals
    bot = new Bot();
    
    // Setup visuals
	var director = new lime.Director(document.body, APP_W_PX, APP_H_PX);
	var scene = new lime.Scene();
    
    // Background
    var backgroundGradient = new lime.fill.LinearGradient();
    backgroundGradient.addColorStop(0, '#ABCDEF');
    backgroundGradient.addColorStop(APP_W_PX, '#BADA55');
    var background = new lime.Sprite().setSize(APP_W_PX, APP_H_PX).setFill(backgroundGradient).setAnchorPoint(0, 0)
    scene.appendChild(background);
    
    
    // HUD
    
    // Eternal Darkness
    var seeminglyEndlessUndiscoveredBlackness = new lime.Sprite().setSize(MAZE_W_PX, MAZE_H_PX).setFill('#000000').setAnchorPoint(0, 0).setPosition(TOP_CORNER);
    scene.appendChild(seeminglyEndlessUndiscoveredBlackness);
    // Read maze via Ajax
    maze = new Maze();
	
    // Add Bot
    bot.initializeSprite(0, 0);
	
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
				bot.sprite.setPosition(sum(bot.sprite.getPosition(), DIR_UP));
			break;
            // Back
			case keyCodes.DOWN:
                msg = 'Moved back.';
				bot.sprite.setPosition(sum(bot.sprite.getPosition(), DIR_DOWN));
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
					bot.sprite.setPosition(sum(bot.sprite.getPosition(), DIR_RIGHT));
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
				bot.sprite.setPosition(sum(bot.sprite.getPosition(), DIR_LEFT));
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

}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('CapstoneProject_BlackbournA.start', CapstoneProject_BlackbournA.start);
