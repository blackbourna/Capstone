goog.provide('Bot');
goog.require('Constants');
Bot = function (startPos, startDir) {
	// private variables
    var self = this;
    var position = startPos;
    console.log(position);
    var direction = startDir;
    var energy = Constants.Bot.ENERGY;
    
    // public variables
	this.sprite = new lime.Sprite().setFill(Constants.Graphics.IMG_ASSETS + 'bot.png');
	
    // private functions
    
    getScreenPosition = function() {
		// for whatever reason the position.coord vars are detected as strings here... stupid JS
        var coord = new goog.math.Coordinate(Constants.Graphics.TOP_CORNER.x + position.x*1, Constants.Graphics.TOP_CORNER.y + position.y*1);
        //var coord = goog.math.Coordinate.sum(position, Constants.Graphics.TOP_CORNER);
        return coord;
    }
    
    // USE ENUM STYLE FOR THIS
    // public functions
	this.move = function() {}
	this.turn = function() {}
	this.look = function() {}
	this.lookFarAhead = function() {}
	
	
	this.Sprint = function() {}
	
	// 3
	this.scanForRecharger = function() {}
	// 1
	this.pickUpRecharger = function() {}
    
    // set up initial position
    this.sprite.setPosition(getScreenPosition());
}
