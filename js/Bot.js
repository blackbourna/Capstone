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
    
    var sfx_step = new Audio(Constants.Assets.AUDIO_PATH + 'step.wav');
    var sfx_look = new Audio(Constants.Assets.AUDIO_PATH + 'look.wav');
    var sfx_turn = null;
    
    // public variables
	this.sprite = new lime.Sprite().setFill(Constants.Assets.IMAGE_PATH + 'bot.png');
	
    // private functions
    updateDirection = function(x) {
		var sequence = 	new lime.animation.Sequence(
			new lime.animation.ScaleTo(1.2).setDuration(.1),
			new lime.animation.RotateBy(x),
			new lime.animation.ScaleTo(1).setDuration(.1)
		);
		Globals.waitForAnimationEndEvent(sequence);
		
		self.sprite.runAction(sequence);
    }
    updatePosition = function(speed) {
		addOpen(position);
		var moveTo = new lime.animation.MoveTo(getScreenPosition()).setSpeed(speed ? speed : 0.5);
		Globals.waitForAnimationEndEvent(moveTo);
		self.sprite.runAction(moveTo);
		console.log(Directions.getName(direction));
    }
    getScreenPosition = function() {
		var width = self.sprite.getSize().width;
		var height = self.sprite.getSize().height;
        var coord = new goog.math.Coordinate(width * position.x*1 + width/2, height * position.y*1 + height/2);
        //alert(coord);
        //var coord = goog.math.Coordinate.sum(position, Constants.Graphics.TOP_CORNER);
        return coord;
    }

	/*
	 * Adds a wall
	 * @params wall - the cell to add the wall
	 * */
	addWall = function(cell) {
		addCell(cell, Constants.Assets.IMAGE_PATH + 'wall.png');
	}
	
    addOpen = function(cell) {
		addCell(cell, Constants.Assets.IMAGE_PATH + 'open.png');
    }
    
    addCell = function(cell, img) {
		if (!Utils.validatePoint(cell)) return;
		var sprite = new lime.Sprite().setFill(img);
		var width = sprite.getSize().width;
		var height = sprite.getSize().height;		
		var coord = new goog.math.Coordinate(width * cell.x*1 + width/2, height * cell.y*1 + height/2);
		sprite.setPosition(coord);
		mazeSprite.appendChild(sprite);
		mazeSprite.setChildIndex(self.sprite, mazeSprite.getNumberOfChildren() - 1);
    }
    
    hitWall = function(cell) {
		addWall(cell);
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
		Globals.Audio.stopThenPlay(sfx_step);
	}
	this.turn = function(dir) {
		var rotate = 0;
		switch(dir) {
			case TURN.RIGHT:
				rotate = -90;
				direction = Compass.rotate(TURN.RIGHT, direction);
			break;
			case TURN.LEFT:
				rotate = 90;
				direction = Compass.rotate(TURN.LEFT, direction);
			break;
			case TURN.AROUND:
				rotate = 180;
				direction = Compass.rotate(TURN.LEFT, direction);
				direction = Compass.rotate(TURN.LEFT, direction);
			break;
		}
		updateDirection(rotate);
	}
	this.look = function(dir) {
		switch(dir) {
			case LOOK.AHEAD:
				if (maze.get(sum(position, direction)) == Constants.Maze.OPEN) {
					addOpen(sum(position, direction));
				} else { // hit wall
					addWall(sum(position, direction));
				}
			break;
			case LOOK.RIGHT:
				var dir = Compass.rotate(TURN.RIGHT, direction);
				if (maze.get(sum(position, dir)) == Constants.Maze.OPEN) {
					addOpen(sum(position, dir));
				} else { // hit wall
					addWall(sum(position, dir));
				}
			break;
			case LOOK.LEFT:
				var dir = Compass.rotate(TURN.LEFT, direction);
				if (maze.get(sum(position, dir)) == Constants.Maze.OPEN) {
					addOpen(sum(position, dir));
				} else { // hit wall
					addWall(sum(position, dir));
				}
			break;
		}
		sfx_look.play();
	}
	this.lookFarAhead = function() {
		var cell = sum(position, direction);
		while (maze.get(cell) == Constants.Maze.OPEN) {
			addOpen(cell);
			cell = sum(cell, direction);
		}
		addWall(cell);
	}
	
	
	this.sprint = function() {
		for (var x = 0; x < 5; x++) {
			if (maze.get(sum(position, direction)) == Constants.Maze.OPEN) {
					position = sum(position, direction);
			}
		}
		updatePosition(0.25);
	}
	
	// 3
	this.scanForRecharger = function() {
		maze.scanForRecharger(position, mazeSprite);
	}
	// 1
	this.pickUpRecharger = function() {}
    this.drawMaze = function() {
		maze.drawMaze(mazeSprite, self, false);
    }
    // set up initial position
    var attempt=0;
    var rotateCt = 0;
	while (!direction.equals(maze.startDir)) { // sprite starts facing north
		var rotate = -90;
		rotateCt++;
		direction = Compass.rotate(TURN.RIGHT, direction);
		self.sprite.runAction(new lime.animation.RotateBy(90));
    }
    addOpen(position);
    updatePosition(0.1);
}
