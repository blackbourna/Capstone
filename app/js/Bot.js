goog.provide('Bot');
goog.require('Constants');
goog.require('MOVE');
goog.require('TURN');
goog.require('LOOK');
goog.require('Utils');
goog.require('Compass');

// my key handler
goog.require('KeyEvents');
goog.require('KeyEventsAlternative');

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
    var autolook = new Array();
    
    // public variables
	this.sprite = new lime.Sprite().setFill(Constants.Assets.IMAGE_PATH + 'bot.png');
	
    // private functions
    var updateDirection = function(x, speed) {
		var rotate = new lime.animation.RotateBy(x);
        if (speed) rotate.setDuration(speed);
		Globals.waitForAnimationEndEvent(rotate);
		
		self.sprite.runAction(rotate);
    }
    var updatePosition = function(speed) {
		addOpen(position);
		var moveTo = new lime.animation.MoveTo(getScreenPosition()).setDuration(speed ? speed : 0.1);
		Globals.waitForAnimationEndEvent(moveTo);
		self.sprite.runAction(moveTo);
    }
    var getScreenPosition = function() {
		var width = self.sprite.getSize().width;
		var height = self.sprite.getSize().height;
		if (width == 0) width = Constants.Graphics.CELL_DIMENSIONS.x;
		if (height == 0) width = Constants.Graphics.CELL_DIMENSIONS.y;
        var coord = new goog.math.Coordinate(width * position.x*1 + width/2, height * position.y*1 + height/2);
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
        if (maze.get(cell) == Cell.GOAL) return; // don't overwrite goal cells
		if (cellHasBeenMarked(cell, true)) return;
		var sprite = new lime.Sprite().setFill(img);
		var width = sprite.getSize().width;
		var height = sprite.getSize().height;		
		var coord = new goog.math.Coordinate(width * cell.x*1 + width/2, height * cell.y*1 + height/2);
		sprite.setPosition(coord);
		mazeSprite.appendChild(sprite);
		mazeSprite.setChildIndex(self.sprite, mazeSprite.getNumberOfChildren() - 1);
    }
    
    var cellHasBeenMarked = function(cell, doMark) {
		var alreadyMarked = false;
		for (var c in markedCells) {
			if (Point.equals(cell, markedCells[c])) {
				alreadyMarked = true;
				break;
			}
		}
		if (doMark)
			markedCells.push(cell);
		return alreadyMarked;
    }
    
    var hitWall = function(cell) {
		var topCornerPlus5 = new Point(Constants.Graphics.TOP_CORNER.x + 5, Constants.Graphics.TOP_CORNER.y +5)
		var durTime = 0.05;
		// this is why javascript could use a tuple type!
		var sequence = 	new lime.animation.Sequence(
			new lime.animation.MoveTo(topCornerPlus5).setDuration(durTime),
			new lime.animation.MoveTo(Constants.Graphics.TOP_CORNER).setDuration(durTime),
			new lime.animation.MoveTo(topCornerPlus5).setDuration(durTime),
			new lime.animation.MoveTo(Constants.Graphics.TOP_CORNER).setDuration(durTime),
			new lime.animation.MoveTo(topCornerPlus5).setDuration(durTime),
			new lime.animation.MoveTo(Constants.Graphics.TOP_CORNER).setDuration(durTime)
		);
		mazeSprite.runAction(sequence);
		addWall(cell);
    }
    
    var isOpen = function(cell) {
		var cellState = maze.get(cell);
		return cellState == Cell.OPEN || cellState == Cell.GOAL;
    }
    
    var doAutoLook = function() {
		for (var key in autolook) {
			var cell = null;
			switch (key) {
				case LOOK.AHEAD:
					cell = sum(position, direction);
				break;
				case LOOK.RIGHT:
					var dir = Compass.rotate(TURN.RIGHT, direction);
					cell = sum(position, dir);
				break;
				case LOOK.LEFT:
					var dir = Compass.rotate(TURN.LEFT, direction);
					cell = sum(position, dir);
				break;
			}
			if (!cellHasBeenMarked(cell, false)) {
				self.look(autolook[key]);
			}
		}
	}
	
	var addHistory = function(move) {
		history.push({action: move, time: timer});
	}
    
    // public functions
    this.getPosition = function() {return position;}
    
    // @dir = e.g. MOVE.FORWARD, MOVE.BACKWARD
	this.move = function(dir) {
		addHistory(dir);
		blocked = false;
		switch(dir) {
			case MOVE.FORWARD:
				if (isOpen(sum(position, direction))) {
					position = sum(position, direction);
					updatePosition();
					doAutoLook();
				} else { // hit wall
					hitWall(sum(position, direction));
					blocked = true;
				}
			break;
			case MOVE.BACKWARD:
				if (isOpen(difference(position, direction))) {
					position = difference(position, direction);
					updatePosition();
					doAutoLook();
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
	// @dir = e.g. TURN.RIGHT
	this.turn = function(dir) {
		addHistory(dir);
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
		updateDirection(rotate, null);
		return true;
	}
	// @dir = LOOK.AHEAD, etc.
	this.look = function(dir) {
		addHistory(dir);
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
		addHistory('LOOKFAR');
		energy -= Constants.EnergyCosts.LOOK_AHEAD;
		var cell = sum(position, direction);
		var ct = 0;
		while (isOpen(cell)) {
			ct++;
			cell = sum(cell, direction);
		}
		addWall(cell);
		return ct;
	}
	
	
	this.sprint = function() {
		addHistory('SPRINT');
		var blocked = false;
		for (var x = 0; x < Constants.Bot.SPRINT_DISTANCE; x++) {
			if (isOpen(sum(position, direction))) {
					position = sum(position, direction);
					addOpen(position);
			} else {
				blocked = true;
                hitWall(sum(position, direction));
				break;
			}
		}
		energy -= (blocked) ? Constants.EnergyCosts.SPRINT_BLOCKED : Constants.EnergyCosts.SPRINT;
		updatePosition(0.25);
		return x;
	}
	
	this.scanForRecharger = function() {
		addHistory('SCAN');
		energy -= Constants.EnergyCosts.ENERGY_SCAN;
		return maze.scanForRecharger(position, mazeSprite);
	}
	this.pickUpRecharger = function() {
		addHistory('PICKUP');
		energy -= Constants.EnergyCosts.ENERGY_PICKUP;
		var foundIt = maze.pickUpRecharger(position);
		if (foundIt) {
			energy += Constants.EnergyCosts.ENERGY_GAINED;
			var sequence = 	new lime.animation.Sequence(
				// add sound
				new lime.animation.ScaleTo(1.5).setDuration(.5),
				new lime.animation.ScaleTo(1).setDuration(.5)
			);
			Globals.waitForAnimationEndEvent(sequence);
			self.sprite.runAction(sequence);
		}
		return foundIt;
	}
	
	this.getEnergy = function() {
		return energy;
	}
    this.drawMaze = function() {
		maze.drawMaze(mazeSprite);
    }
    
    this.zoom = function(zoomIn) {
		if (zoomIn) {
		} else {
		}
    }
    
    this.getDirection = function() {
        return direction;
    }
    
	this.updateOutput = function (){
		Globals.hudLabel.setText('Bot Energy: ' + this.getEnergy() + '\n' +
			'Direction: ' + Directions.getName(direction) + '\n' + 
			'Position: ' + position.x + ', ' + position.y + '\n' +
			'Time: ' + Utils.getFormattedTime(timer) //(timer/1000.0).toFixed(3)
		);
	}
	
	this.toggleAutoLookDirection = function(dir) {
		var dirName = dir.substring(5).toLowerCase();
		var msg = 'Autolook ' + dirName + ' set to';
		if (!autolook[dir]) {
			addHistory('autolook.off.'+dir);
			autolook[dir] = dir;
			msg += ' on';
		} else {
			addHistory('autolook.on.'+dir);
			delete autolook[dir];
			msg += ' off';
		}
		return msg;
	}
	
	this.dispose = function(doPop) {
		lime.scheduleManager.unschedule(mazeEvents, null);
        lime.scheduleManager.unschedule(updateTimer, null);
        Globals.logLabel = null;
		goog.events.unlisten(keyhandler, 'key', keyevents);
		console.log(history);
	}
	
    // setup keyhandler and game events
	var mazeEvents = function (dt) {
		var gameDone = false;
		if (energy <= 0) {
			alert('noooo!');
			lime.scheduleManager.scheduleWithDelay(function() {
                self.dispose(true);
            }, null, 1000);
			gameDone = true;
		}
		if (maze.get(position) == Cell.GOAL) { // maze solved!
			lime.scheduleManager.scheduleWithDelay(function() {
                self.dispose(false);
                new HighScoreInputScene(director, maze, energy, timer, history);
            }, null, 1000);
			gameDone = true;
		}
		if (gameDone) {
			self.dispose(true);
		}
	};
	
	var updateTimer = function(dt) {
		timer += dt;
		self.updateOutput();
	}

    lime.scheduleManager.schedule(mazeEvents, null);
    lime.scheduleManager.schedule(updateTimer, null);
    
    var keyhandler = new goog.events.KeyHandler(document);
    var keyevents = null;
    switch (Globals.ControlScheme) {
		case 0:
			keyevents = new KeyEvents(self, maze).events;
			break;
		case 1:
			keyevents = new KeyEventsAlternative(self, maze).events;
			break;
	}
	goog.events.listen(keyhandler, 'key', keyevents);

    // set up initial position
    {
		var rotate = 0;
		do { // sprite starts facing north
			rotate += 90;
			direction = Compass.rotate(TURN.LEFT, direction);
		} while (!direction.equals(maze.startDir));
		self.sprite.runAction(new lime.animation.RotateBy(rotate).setDuration(0));
    }

    addOpen(position);
    updatePosition(0.0001);
    mazeSprite.appendChild(this.sprite);
	
	// initial set up of HUD and Log
	Globals.logLabel.setText('Welcome!');
	this.updateOutput();
}
