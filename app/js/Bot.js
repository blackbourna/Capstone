goog.provide('Bot');
goog.require('Constants');
goog.require('MOVE');
goog.require('TURN');
goog.require('LOOK');
goog.require('Utils');
goog.require('Compass');

// my key handler
goog.require('KeyEvents');

Bot = function (maze, mazeSprite, director) {
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
    
    var sfx_step = new Audio(Constants.Assets.AUDIO_PATH + 'step.wav');
    var sfx_look = new Audio(Constants.Assets.AUDIO_PATH + 'look.wav');
    var sfx_turn = null;
    var markedCells = new Array();
    var history = new Array();
    var timer = 0.0;
    
    // public variables
	this.sprite = new lime.Sprite().setFill(Constants.Assets.IMAGE_PATH + 'bot.png');
	
    // private functions
    var updateDirection = function(x) {
		var sequence = 	new lime.animation.Sequence(
			new lime.animation.ScaleTo(1.2).setDuration(.1),
			new lime.animation.RotateBy(x),
			new lime.animation.ScaleTo(1).setDuration(.1)
		);
		Globals.waitForAnimationEndEvent(sequence);
		
		self.sprite.runAction(sequence);
    }
    var updatePosition = function(speed) {
		addOpen(position);
		var moveTo = new lime.animation.MoveTo(getScreenPosition()).setSpeed(speed ? speed : 0.5);
		Globals.waitForAnimationEndEvent(moveTo);
		self.sprite.runAction(moveTo);
    }
    var getScreenPosition = function() {
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
	var addWall = function(cell) {
		addCell(cell, Constants.Assets.IMAGE_PATH + 'wall.png');
	}
	
    var addOpen = function(cell) {
		addCell(cell, Constants.Assets.IMAGE_PATH + 'open.png');
    }
    
    var addCell = function(cell, img) {
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
    
    var cellHasBeenMarked = function(cell) {
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
    
    var hitWall = function(cell) {
		addWall(cell);
    }
    
    var isOpen = function(cell) {
		var cellState = maze.get(cell);
		return cellState == Cell.OPEN || cellState == Cell.GOAL;
    }
    
    // public functions
    this.getPosition = function() {return position;}
    
	this.move = function(dir) {
		history.push(dir);
		blocked = false;
		switch(dir) {
			case MOVE.FORWARD:
				if (isOpen(sum(position, direction))) {
					position = sum(position, direction);
					updatePosition();
				} else { // hit wall
					hitWall(sum(position, direction));
					blocked = true;
				}
			break;
			case MOVE.BACKWARD:
				if (isOpen(difference(position, direction))) {
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
		return !blocked;
	}
	this.turn = function(dir) {
		history.push(dir);
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
		history.push(dir);
		switch(dir) {
			case LOOK.AHEAD:
				if (isOpen(sum(position, direction))) {
					addOpen(sum(position, direction));
				} else { // hit wall
					addWall(sum(position, direction));
				}
			break;
			case LOOK.RIGHT:
				var dir = Compass.rotate(TURN.RIGHT, direction);
				if (isOpen(sum(position, dir))) {
					addOpen(sum(position, dir));
				} else { // hit wall
					addWall(sum(position, dir));
				}
			break;
			case LOOK.LEFT:
				var dir = Compass.rotate(TURN.LEFT, direction);
				if (isOpen(sum(position, dir))) {
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
		Globals.Audio.stopThenPlay(sfx_look);
		return true;
	}
	this.lookFarAhead = function() {
		history.push('lookfar');
		energy -= Constants.EnergyCosts.LOOK_AHEAD;
		var cell = sum(position, direction);
		//while (maze.get(cell) == Cell.OPEN) {
		while (isOpen(cell)) { 
			if (maze.get(cell) != Cell.GOAL) // don't overwrite goal sprites
				addOpen(cell);
			cell = sum(cell, direction);
		}
		addWall(cell);
		return true;
	}
	
	
	this.sprint = function() {
		history.push('SPRINT');
		if (!hasEnergy(Constants.EnergyCosts.SPRINT)) return false;
		var blocked = false;
		for (var x = 0; x < 5; x++) {
			if (isOpen(sum(position, direction))) {
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
		history.push('SCAN');
		if (!hasEnergy(Constants.EnergyCosts.ENERGY_SCAN)) return false;
		energy -= Constants.EnergyCosts.ENERGY_SCAN;
		maze.scanForRecharger(position, mazeSprite);
	}
	this.pickUpRecharger = function() {
		history.push('PICKUP');
		if (!hasEnergy(Constants.EnergyCosts.ENERGY_PICKUP)) return false;
		energy -= Constants.EnergyCosts.ENERGY_PICKUP;
		var foundIt = maze.pickUpRecharger(position);
		if (foundIt) energy += Constants.EnergyCosts.ENERGY_GAINED;
		if (foundIt) alert("TEST");
	}
	
	this.getEnergy = function() {
		return energy;
	}
    this.drawMaze = function() {
		maze.drawMaze(mazeSprite, self, false);
    }
    
    this.zoom = function(zoomIn) {
		if (zoomIn) {
		} else {
		}
    }
    
	this.updateOutput = function (){
		Globals.hudLabel.setText('Bot Energy: ' + this.getEnergy() + '\n' +
			'Direction: ' + Directions.getName(direction) + '\n' + 
			'Position: ' + position.x + ', ' + position.y + '\n' +
			'Time: ' + (timer/1000.0).toFixed(3)
		);
	}
    
    // set up initial position
    {
		var rotate = 0;
		do { // sprite starts facing north
			rotate += 90;
			direction = Compass.rotate(TURN.LEFT, direction);
		} while (!direction.equals(maze.startDir));
		self.sprite.runAction(new lime.animation.RotateBy(rotate));
    }
    // setup keyhandler and game events
	var mazeEvents = function (dt) {
		var gameDone = false;
		if (energy <= 0) {
			alert('noooo!');
			lime.scheduleManager.scheduleWithDelay(endGame, null, 1000);
			gameDone = true;
		}
		if (maze.get(position) == Cell.GOAL) {
			alert('you win!!');
			lime.scheduleManager.scheduleWithDelay(endGame, null, 1000);
			gameDone = true;
		}
		if (gameDone) {
			lime.scheduleManager.unschedule(mazeEvents, this);
			goog.events.unlisten(keyhandler, 'key', keyevents);
			console.log(history);
			director.popScene();
		}
		//console.log('running!' + energy);
	};
	
	var updateTimer = function(dt) {
		timer += dt;
		self.updateOutput();
	}
	var endGame = function() {
		director.popScene();
	}
	
	// move these to constants!
	var TIMER_INTERVAL = 1;
	var MAZE_EVENTS_INTERVAL = 250;
	
    lime.scheduleManager.scheduleWithDelay(mazeEvents, null, MAZE_EVENTS_INTERVAL);
    lime.scheduleManager.scheduleWithDelay(updateTimer, null, TIMER_INTERVAL);
    
    addOpen(position);
    updatePosition(0.1);
    var keyhandler = new goog.events.KeyHandler(document);
    var keyevents = new KeyEvents(self, maze).events;
	goog.events.listen(keyhandler, 'key', keyevents);
	
	// initial set up of HUD and Log
	Globals.logLabel.setText('Welcome!');
	this.updateOutput();
}
