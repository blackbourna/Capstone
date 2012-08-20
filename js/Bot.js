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
    var sum = goog.math.Coordinate.sum;
    var difference = goog.math.Coordinate.difference;
    // public variables
	this.sprite = new lime.Sprite().setFill(Constants.Graphics.IMG_ASSETS + 'bot.png');
	
    // private functions
    updateDirection = function(x) {
		//self.sprite.setAnchorPoint(0.5, 0.5);
		self.sprite.runAction(
			new lime.animation.Sequence(
				new lime.animation.ScaleTo(1.2).setDuration(.2),
				new lime.animation.RotateBy(x),
				new lime.animation.ScaleTo(1).setDuration(.2)
			)
		);
		//self.sprite.setAnchorPoint(0, 0);
		//updatePosition();
		//lime.scheduleManager.callAfter(function() {self.sprite.setAnchorPoint(0, 0);}, null, 1)
    }
    updatePosition = function() {
		self.sprite.runAction(new lime.animation.MoveTo(getScreenPosition()).setSpeed(0.5));
    }
    getScreenPosition = function() {
		// for whatever reason the position.coord vars are detected as strings here... stupid JS
		var width = self.sprite.getSize().width;
		var height = self.sprite.getSize().height;
        var coord = new goog.math.Coordinate(Constants.Graphics.CELL_W * position.x*1 + width/2, Constants.Graphics.CELL_H * position.y*1 + height/2);
        //alert(coord);
        //var coord = goog.math.Coordinate.sum(position, Constants.Graphics.TOP_CORNER);
        return coord;
    }
    
    // public functions
	this.move = function(dir) {
		switch(dir) {
			case MOVE.FORWARD:
				if (maze.get(sum(position, direction)) == Constants.Maze.OPEN) {
					position = sum(position, direction);
					updatePosition();
				}
			break;
			case MOVE.BACKWARD:
				if (maze.get(difference(position, direction)) == Constants.Maze.OPEN) {
					position = difference(position, direction);
					updatePosition();
				}
			break;
		}
	}
	this.turn = function(dir) {
		var rotate = 0;
		console.log(direction);
		switch(dir) {
			case TURN.RIGHT:
				rotate = 90;
			break;
			case TURN.LEFT:
				rotate = -90;
			break;
		}
		direction = direction.rotate(rotate*Math.PI/180);
		updateDirection(rotate);
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
	//this.sprite.setAnchorPoint(0, 0);
    updatePosition();

	// from old code - move this to new style
	//bot.sprite.runAction(new lime.animation.Sequence(
	//	new lime.animation.ScaleTo(1.2).setDuration(.2),
	//	new lime.animation.RotateBy(-90),
	//	new lime.animation.ScaleTo(1).setDuration(.2)
	//));
	//bot.sprite.setPosition(sum(bot.sprite.getPosition(), DIR_RIGHT));
}
