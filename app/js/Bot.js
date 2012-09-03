goog.provide('Bot');
goog.require('Constants');
goog.require('MOVE');
goog.require('TURN');
goog.require('LOOK');
goog.require('Utils');
goog.require('Compass');

// my key handler
goog.require('KeyEvents');

Bot = function (maze, mazeSprite, director, layer) {
	// private variables
    var self = this;
    var position = maze.start;
    var direction = Directions.get('NORTH');
    var energy = Constants.EnergyCosts.START_ENERGY;
    var maze = maze;
	var mazeSprite = mazeSprite;
	var director = director;
    // for lazy typists    
    var sum = goog.math.Coordinate.sum;
    var difference = goog.math.Coordinate.difference;
    
    // sound effects
    var sfx_step = new Audio(Constants.Assets.AUDIO_PATH + 'step.wav');
    var sfx_look = new Audio(Constants.Assets.AUDIO_PATH + 'look.wav');
    var sfx_turn = null;
    
    // list of cells that are already drawn
    var markedCells = new Array();
    
    // the mazeContainer layer for zooming
    var layer = layer;
    
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
		if (cellHasBeenMarked(cell)) return;
		var sprite = new lime.Sprite().setFill(img);
		var width = sprite.getSize().width;
		var height = sprite.getSize().height;		
		var coord = new goog.math.Coordinate(width * cell.x*1 + width/2, height * cell.y*1 + height/2);
		sprite.setPosition(coord);
		mazeSprite.appendChild(sprite);
		mazeSprite.setChildIndex(self.sprite, mazeSprite.getNumberOfChildren() - 1);
    }
    
    cellHasBeenMarked = function(cell) {
		var alreadyMarked = false;
		for (var c in markedCells) {
			if (Point.equals(cell, markedCells[c])) {
				alreadyMarked = true;
				break;
			}
		}
		markedCells.push(cell)
		return alreadyMarked;
    }
    
    hitWall = function(cell) {
		addWall(cell);
    }
    
    hasEnergy = function(cost) {
		return (energy >= cost)
    }
    
    // public functions
    this.getPosition = function() {return position;}
    
	this.move = function(dir) {
		if (!hasEnergy(Constants.EnergyCosts.MOVE)) return false;
		blocked = false;
		switch(dir) {
			case MOVE.FORWARD:
				if (maze.get(sum(position, direction)) == Cell.OPEN) {
					position = sum(position, direction);
					updatePosition();
				} else { // hit wall
					hitWall(sum(position, direction));
					blocked = true;
				}
			break;
			case MOVE.BACKWARD:
				if (maze.get(difference(position, direction)) == Cell.OPEN) {
					position = difference(position, direction);
					updatePosition();
				} else { // hit wall
					hitWall(difference(position, direction));
					blocked = true;
				}
			break;
		}
		energy -= (blocked) ? Constants.EnergyCosts.MOVE_BLOCKED : Constants.EnergyCosts.MOVE;
		Globals.Audio.stopThenPlay(sfx_step);
		return true;
	}
	this.turn = function(dir) {
		if (dir == TURN.AROUND && !hasEnergy(Constants.EnergyCosts.TURN_AROUND)) return false;
		if (!hasEnergy(Constants.EnergyCosts.TURN)) return false;
		var rotate = 0;
		switch(dir) {
			case TURN.RIGHT:
				rotate = -90;
				direction = Compass.rotate(TURN.RIGHT, direction);
				energy -= Constants.EnergyCosts.TURN;
			break;
			case TURN.LEFT:
				rotate = 90;
				direction = Compass.rotate(TURN.LEFT, direction);
				energy -= Constants.EnergyCosts.TURN;
			break;
			case TURN.AROUND:
				rotate = 180;
				direction = Compass.rotate(TURN.LEFT, direction);
				direction = Compass.rotate(TURN.LEFT, direction);
				energy -= Constants.EnergyCosts.TURN_AROUND;
			break;
		}
		updateDirection(rotate);
		return true;
	}
	this.look = function(dir) {
		if (!hasEnergy(Constants.EnergyCosts.LOOK)) return false;
		switch(dir) {
			case LOOK.AHEAD:
				if (maze.get(sum(position, direction)) == Cell.OPEN) {
					addOpen(sum(position, direction));
				} else { // hit wall
					addWall(sum(position, direction));
				}
			break;
			case LOOK.RIGHT:
				var dir = Compass.rotate(TURN.RIGHT, direction);
				if (maze.get(sum(position, dir)) == Cell.OPEN) {
					addOpen(sum(position, dir));
				} else { // hit wall
					addWall(sum(position, dir));
				}
			break;
			case LOOK.LEFT:
				var dir = Compass.rotate(TURN.LEFT, direction);
				if (maze.get(sum(position, dir)) == Cell.OPEN) {
					addOpen(sum(position, dir));
				} else { // hit wall
					addWall(sum(position, dir));
				}
			break;
			default: // fixes some redraw issues for some reason
				energy -= Constants.EnergyCosts.LOOK;
				return true;
		}
		energy -= Constants.EnergyCosts.LOOK;
		sfx_look.play();
		return true;
	}
	this.lookFarAhead = function() {
		if (!hasEnergy(Constants.EnergyCosts.LOOK_AHEAD)) return false;
		energy -= Constants.EnergyCosts.LOOK_AHEAD;
		var cell = sum(position, direction);
		while (maze.get(cell) == Cell.OPEN) {
			addOpen(cell);
			cell = sum(cell, direction);
		}
		addWall(cell);
		return true;
	}
	
	
	this.sprint = function() {
		if (!hasEnergy(Constants.EnergyCosts.SPRINT)) return false;
		var blocked = false;
		for (var x = 0; x < 5; x++) {
			if (maze.get(sum(position, direction)) == Cell.OPEN) {
					position = sum(position, direction);
					addOpen(position);
			} else {
				blocked = true;
			}
		}
		energy -= (blocked) ? Constants.EnergyCosts.SPRINT_BLOCKED : Constants.EnergyCosts.SPRINT;
		updatePosition(0.25);
		return true;
	}
	
	this.scanForRecharger = function() {
		if (!hasEnergy(Constants.EnergyCosts.ENERGY_SCAN)) return false;
		energy -= Constants.EnergyCosts.ENERGY_SCAN;
		maze.scanForRecharger(position, mazeSprite);
	}
	this.pickUpRecharger = function() {
		if (!hasEnergy(Constants.EnergyCosts.ENERGY_PICKUP)) return false;
		energy -= Constants.EnergyCosts.ENERGY_PICKUP;
	}
    this.drawMaze = function() {
		maze.drawMaze(mazeSprite, self, false);
    }
    
    this.zoom = function(zoomIn) {
		if (zoomIn) {
			var zoom = layer.getScale().scale(1.1);
			zoom = zoom.x > 2.5 ? new Vec2(2.5, 2.5) : zoom;
		} else {
			var zoom = layer.getScale().scale(0.9);
			zoom = zoom.x < 1 ? new Vec2(1, 1) : zoom;
		}
		layer.setScale(zoom);
		mazePos = mazeSprite.getPosition();
		
		mazePos.x -= Constants.Graphics.MAZE_DIMENSIONS.x / 2;
		mazePos.y -= Constants.Graphics.MAZE_DIMENSIONS.y / 2;
		var length = maze.maze.length;
		if (position.x > length / 2)
			mazePos.x += ((position.x + 1) / length) * Constants.Graphics.MAZE_DIMENSIONS.x;
		else
			mazePos.x -= ((position.x + 1) / length) * Constants.Graphics.MAZE_DIMENSIONS.x;
		if (position.y > length / 2)
			mazePos.y += ((position.y + 1) / length) * Constants.Graphics.MAZE_DIMENSIONS.y;
		else
			mazePos.y -= ((position.y + 1) / length) * Constants.Graphics.MAZE_DIMENSIONS.y;
		
		console.log("TEST: " + mazePos);
		
		mazeSprite.setPosition(mazePos);
		//layer.setPosition(position.);
		//var relativePos = position;
		
		//mazeSprite.runAction(new lime.animation.MoveTo());
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
    var energyCheckEvent = function (dt) {
		if (energy <= 0) {
			alert("OUT OF ENERGY");
			lime.scheduleManager.unschedule(energyCheckEvent, this);
			goog.events.unlisten(keyhandler, 'key', keyevents);
			director.popScene();
		}
    };
    lime.scheduleManager.scheduleWithDelay(energyCheckEvent, 0.25);
    addOpen(position);
    updatePosition(0.1);
    var keyhandler = new goog.events.KeyHandler(document);
    var keyevents = new KeyEvents(self, maze).events;
	goog.events.listen(keyhandler, 'key', keyevents);
}
