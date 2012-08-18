goog.provide('Bot');
goog.require('Constants');
Bot = function (startPos, startDir) {
	// private variables
    var self = this;
    var position = startPos;
    var direction = startDir;
    var energy = Constants.Bot.ENERGY;
    
    // public variables
	this.sprite = new lime.Sprite().setFill(Constants.Graphics.IMG_ASSETS + 'bot.png').setAnchorPoint(0, 0);    
	
    // private functions
    
    getScreenPosition = function() {
        var coord = new goog.math.Coordinate(Constants.Graphics.TOP_CORNER.x + position.x, Constants.Graphics.TOP_CORNER.y + position.y);
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
