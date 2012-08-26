goog.provide('Bot');
goog.require('Constants');
goog.require('MOVE');
goog.require('TURN');
goog.require('LOOK');
goog.require('Utils');
goog.require('Compass');

Bot = function (maze, mazeSprite) {
	// private variables
    var self = this;
    var position = maze.start;
    var direction = Directions.get('NORTH');
    var energy = Constants.Bot.ENERGY;
    var maze = maze;
	var mazeSprite = mazeSprite;
    // for lazy typists    
    var sum = goog.math.Coordinate.sum;
    var difference = goog.math.Coordinate.difference;
    
    // public variables
	this.sprite = new lime.Sprite().setFill(Constants.Graphics.IMG_ASSETS + 'bot.png');
	
    // private functions
    updateDirection = function(x) {
		var sequence = 	new lime.animation.Sequence(
			new lime.animation.ScaleTo(1.2).setDuration(.1),
			new lime.animation.RotateBy(-x),
			new lime.animation.ScaleTo(1).setDuration(.1)
		);
		Globals.waitForAnimationEndEvent(sequence);
		
		self.sprite.runAction(sequence);
    }
    updatePosition = function() {
		var moveTo = new lime.animation.MoveTo(getScreenPosition()).setSpeed(0.5);
		Globals.waitForAnimationEndEvent(moveTo);
		self.sprite.runAction(moveTo);
    }
    getScreenPosition = function() {
		// for whatever reason the position.coord vars are detected as strings here... stupid JS
		var width = self.sprite.getSize().width;
		var height = self.sprite.getSize().height;
        var coord = new goog.math.Coordinate(width * position.x*1 + width/2, height * position.y*1 + height/2);
        //alert(coord);
        //var coord = goog.math.Coordinate.sum(position, Constants.Graphics.TOP_CORNER);
        return coord;
    }
    
    hitWall = function(wall) {
		if (!Utils.validatePoint(wall)) return;
		var wallSprite = new lime.Sprite().setFill(Constants.Graphics.IMG_ASSETS + 'wall.png');
		var width = wallSprite.getSize().width;
		var height = wallSprite.getSize().height;		
		var coord = new goog.math.Coordinate(width * wall.x*1 + width/2, height * wall.y*1 + height/2);
		wallSprite.setPosition(coord);
		mazeSprite.appendChild(wallSprite);
		
    }
    
    // public functions
    this.getPosition = function() {return position;}
    
	this.move = function(dir) {
		switch(dir) {
			case MOVE.FORWARD:
				if (maze.get(sum(position, direction)) == Constants.Maze.OPEN) {
					position = sum(position, direction);
					updatePosition();
				} else { // hit wall
					hitWall(sum(position, direction));
				}
			break;
			case MOVE.BACKWARD:
				if (maze.get(difference(position, direction)) == Constants.Maze.OPEN) {
					position = difference(position, direction);
					updatePosition();
				} else { // hit wall
					hitWall(difference(position, direction));
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
				direction = Compass.rotate(TURN.RIGHT, direction);
			break;
			case TURN.LEFT:
				rotate = -90;
				direction = Compass.rotate(TURN.LEFT, direction);
			break;
		}
		//direction = direction.rotate(rotate*Math.PI/180);
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
    var attempt=0;
    console.log(direction.equals);
	while (attempt++< 5 && !direction.equals(maze.startDir)) { // sprite starts facing north
	
		var rotate = 90;
		console.log(direction);
		direction = Compass.rotate(TURN.RIGHT, direction);
		updateDirection(rotate);
    }
    updatePosition();

	// from old code - move this to new style
	//bot.sprite.runAction(new lime.animation.Sequence(
	//	new lime.animation.ScaleTo(1.2).setDuration(.2),
	//	new lime.animation.RotateBy(-90),
	//	new lime.animation.ScaleTo(1).setDuration(.2)
	//));
	//bot.sprite.setPosition(sum(bot.sprite.getPosition(), DIR_RIGHT));
}
