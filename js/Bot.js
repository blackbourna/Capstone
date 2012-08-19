goog.provide('Bot');
goog.require('Constants');
goog.require('MOVE');
goog.require('TURN');
goog.require('LOOK');
Bot = function (maze) {
	// private variables
    var self = this;
    var position = maze.start;
    var direction = maze.startDir;
    var energy = Constants.Bot.ENERGY;
    var maze = maze;
    // public variables
	this.sprite = new lime.Sprite().setFill(Constants.Graphics.IMG_ASSETS + 'bot.png');
	
    // private functions
    
    getScreenPosition = function() {
		// for whatever reason the position.coord vars are detected as strings here... stupid JS
        var coord = new goog.math.Coordinate(Constants.Graphics.CELL_W * position.x*1 + Constants.Graphics.TOP_CORNER.x, Constants.Graphics.CELL_H * position.y*1 + Constants.Graphics.TOP_CORNER.y);
        alert(coord);
        //var coord = goog.math.Coordinate.sum(position, Constants.Graphics.TOP_CORNER);
        return coord;
    }
    
    // public functions
	this.move = function(dir) {
		switch(dir) {
			case MOVE.FORWARD:
			break;
			case MOVE.BACKWARD:
			break;
		}
	}
	this.turn = function(dir) {
		switch(dir) {
			case TURN.RIGHT:
			break;
			case TURN.LEFT:
			break;
		}
	}
	this.look = function(die) {
		switch(dir) {
			case LOOK.AHEAD:
			break;
			case LOOK.RIGHT:
			break;
			case LOOK.LEFT:
			break;
		}
	}
	this.lookFarAhead = function() {}
	
	
	this.sprint = function() {}
	
	// 3
	this.scanForRecharger = function() {}
	// 1
	this.pickUpRecharger = function() {}
    
    // set up initial position
    
    //AnchorPoint is defined with ‘setAnchorPoint()’ method. The parameters are vector points in 0 to 1 range where (0,0) means top-left and (1,1) bottom right corner. By default all elements are positioned from the center and so have anchor point set to (0.5,0.5).
	//this.sprite.setAnchorPoint(Constants.Graphics.TOP_CORNER);
    this.sprite.setPosition(getScreenPosition());

	// from old code - move this to new style
	//bot.sprite.runAction(new lime.animation.Sequence(
	//	new lime.animation.ScaleTo(1.2).setDuration(.2),
	//	new lime.animation.RotateBy(-90),
	//	new lime.animation.ScaleTo(1).setDuration(.2)
	//));
	//bot.sprite.setPosition(sum(bot.sprite.getPosition(), DIR_RIGHT));
}
