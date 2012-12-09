goog.provide('Bot');
/*
I Andrew Blackbourn, 000129408 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
Source code licensed under 2-clause license ("Simplified BSD License" or "FreeBSD License"). See README.md for details.
*/

/**
 * Class representing the bot. Contains the majority of gameplay functionality
 */
goog.require('Constants');
goog.require('MOVE');
goog.require('TURN');
goog.require('LOOK');
goog.require('Utils');
goog.require('Compass');

// my key handler
goog.require('KeyEvents');
goog.require('KeyEventsAlternative');

Bot = function (maze, mazeSprite, director, rechargerSprite) {
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
    
    // audio resources
    var sfx_180 =           new Audio(Constants.Assets.AUDIO_PATH + '180.wav');
    var sfx_goal =          new Audio(Constants.Assets.AUDIO_PATH + 'goal.wav');
    var sfx_look_f =        new Audio(Constants.Assets.AUDIO_PATH + 'look_f.wav');
    var sfx_lookfar =       new Audio(Constants.Assets.AUDIO_PATH + 'lookfar.wav');
    var sfx_look_l =        new Audio(Constants.Assets.AUDIO_PATH + 'look_l.wav');
    var sfx_look_r =        new Audio(Constants.Assets.AUDIO_PATH + 'look_r.wav');
    var sfx_outofenergy =   new Audio(Constants.Assets.AUDIO_PATH + 'outofenergy.wav');
    var sfx_pickupfail =    new Audio(Constants.Assets.AUDIO_PATH + 'pickupfail.wav');
    var sfx_pickupsuccess = new Audio(Constants.Assets.AUDIO_PATH + 'pickupsuccess.wav');
    var sfx_sprint =        new Audio(Constants.Assets.AUDIO_PATH + 'sprint.wav');
    var sfx_step =          new Audio(Constants.Assets.AUDIO_PATH + 'step.wav');
    var sfx_turn =          new Audio(Constants.Assets.AUDIO_PATH + 'turn.wav');
    var sfx_wallhit =       new Audio(Constants.Assets.AUDIO_PATH + 'wallhit.wav');
    var sfx_music =         new Audio(Constants.Assets.AUDIO_PATH + 'music.wav');

    var markedCells = new Array();
    var history = [];
    var timer = 0.0;
    var autolook = new Array();
    var ANIM_SPEED = self.controlScheme == 1 ? 0.00001 : Constants.Bot.ANIMATION_SPEED;
    // public variables
	this.sprite = new lime.Sprite().setFill(Constants.Assets.IMAGE_PATH + 'bot.png');
	
    // private functions
    /*
     * Update direction after bot turn
     */
    var updateDirection = function(x, speed) {
		var rotate = new lime.animation.RotateBy(x);
        if (speed) {
			rotate.setDuration(speed)
		} else {
			rotate.setDuration(ANIM_SPEED);
		}
		Globals.waitForAnimationEndEvent(rotate, function() {
			if (!self.sprite.getRotation() % 90 == 0 ) {
				//console.log('attempt to fix angle: ' + self.sprite.getRotation());
				new lime.animation.RotateTo(
					Directions.getAngle(direction)
				);
			}
		});
		
		Globals.Audio.play(sfx_turn);
		self.sprite.runAction(rotate);
    }
    /*
     * Update position after bot move
     */
    var updatePosition = function(speed) {
		addOpen(position);
		var moveTo = new lime.animation.MoveTo(getScreenPosition());
		
        if (speed) {
			moveTo.setDuration(speed)
		} else {
			moveTo.setDuration(ANIM_SPEED);
		}
		Globals.waitForAnimationEndEvent(moveTo);
		Globals.Audio.play(sfx_step);
		self.sprite.runAction(moveTo);
    }
    /*
     * @returns the bot's position in pixels
     */
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
	 * @params cell - the cell to add the wall
	 * */
	var addWall = function(cell) {
		addCell(cell, Constants.Assets.IMAGE_PATH + 'wall.png');
	}
	/*
	 * Adds an open cell
	 * @params cell - the cell to add the open cell
	 * */
    var addOpen = function(cell) {
		addCell(cell, Constants.Assets.IMAGE_PATH + 'open.png');
    }
	/*
	 * Adds a cell
	 * @params cell - the cell to add
	 * */
    var addCell = function(cell, img) {
		if (!Utils.validatePoint(cell)) return;
        if (maze.get(cell) == Cell.GOAL) return; // don't overwrite goal cells
		if (cellHasBeenMarked(cell, true)) return;
		var sprite = new lime.Sprite().setFill(img);
		var width = Constants.Graphics.CELL_DIMENSIONS.x;
		var height = Constants.Graphics.CELL_DIMENSIONS.y;
		var coord = new goog.math.Coordinate(width * cell.x*1 + width/2, height * cell.y*1 + height/2);
		sprite.setPosition(coord);
        sprite.setOpacity(0);
        sprite.runAction(new lime.animation.FadeTo(1).setDuration(ANIM_SPEED));
		mazeSprite.appendChild(sprite);
        fixZIndex();
        //console.log(rechargerSprite);
    }
    /*
     * Moves a sprite to the front of the DOM to avoid sprites being overlapped
     */
    var fixZIndex = function() {
        if (rechargerSprite) // only shown in easy mode
            mazeSprite.setChildIndex(rechargerSprite, mazeSprite.getNumberOfChildren() - 2);
		mazeSprite.setChildIndex(self.sprite, mazeSprite.getNumberOfChildren() - 1);
    }
    /*
     * Checks whether a cell has already been drawn to avoid redrawing cells to the DOM
     */
    var cellHasBeenMarked = function(cell, doMark) {
		if (!Utils.validatePoint(cell)) return true;
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
    /*
     * Called when a bot runs into a wall
     */
    var hitWall = function(cell) {
		Globals.Audio.play(sfx_wallhit);
		var topCornerPlus5 = new Point(Constants.Graphics.TOP_CORNER.x + 10, Constants.Graphics.TOP_CORNER.y + 10)
		var durTime = Constants.Bot.ANIMATION_SPEED/2;
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
		
		// add hit circle
		if (!Utils.validatePoint(cell)) return;
		var width = Constants.Graphics.CELL_DIMENSIONS.x;
		var height = Constants.Graphics.CELL_DIMENSIONS.y;
		
		{
			var circle = new lime.Circle().setFill("#FF0000").setSize(width/2, height/2).setOpacity(0.33);
			var coord = new goog.math.Coordinate(width * cell.x*1 + width/2, height * cell.y*1 + height/2);
			circle.setPosition(coord);
			mazeSprite.appendChild(circle);
			fixZIndex();
		}
    }
    // @returns true if cell is open, false otherwise
    var isOpen = function(cell) {
		var cellState = maze.get(cell);
		return cellState == Cell.OPEN || cellState == Cell.GOAL;
    }
    // autolooks in any directions that are currently toggled to ON
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
	// add a move to the bot's history
	var addHistory = function(move) {
		history.push([move, timer]);
		//history.push({action: move, time: timer});
	}
    
    // public functions
    // @returns the bot's position
    this.getPosition = function() {return position;}
    
    // Makes a move forward/back
    // @dir = e.g. MOVE.FORWARD, MOVE.BACKWARD
    // @returns true if the move was successful, false if blocked
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
		Globals.Audio.play(sfx_step);
		return !blocked;
	}
	// @dir = e.g. TURN.RIGHTAWS
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
		updateDirection(rotate);
		return true;
	}
	// @dir = LOOK.AHEAD, etc.
	this.look = function(dir) {
		addHistory(dir);
		switch(dir) {
			case LOOK.AHEAD:
				Globals.Audio.play(sfx_look_f);
				if (isOpen(sum(position, direction))) {
					addOpen(sum(position, direction));
				} else { // hit wall
					addWall(sum(position, direction));
				}
			break;
			case LOOK.RIGHT:
				var dir = Compass.rotate(TURN.RIGHT, direction);
				Globals.Audio.play(sfx_look_r);
				if (isOpen(sum(position, dir))) {
					addOpen(sum(position, dir));
				} else { // hit wall
					addWall(sum(position, dir));
				}
			break;
			case LOOK.LEFT:
				var dir = Compass.rotate(TURN.LEFT, direction);
				Globals.Audio.play(sfx_look_l);
				if (isOpen(sum(position, dir))) {
					addOpen(sum(position, dir));
				} else { // hit wall
					addWall(sum(position, dir));
				}
			break;
			default: // fixes some redraw issues for some reason
				//energy -= Constants.EnergyCosts.LOOK;
				return true;
		}
		energy -= Constants.EnergyCosts.LOOK;
		return true;
	}
    /*
     * Marks cells as open as far as bot can see forward
     */
	this.lookFarAhead = function() {
		addHistory('LOOKFAR');
		energy -= Constants.EnergyCosts.LOOK_AHEAD;
		var cell = sum(position, direction);
		var ct = 0;
		while (isOpen(cell)) {
			ct++;
			addOpen(cell);
			cell = sum(cell, direction);
		}
		addWall(cell);
		Globals.Audio.play(sfx_lookfar);
		return ct;
	}
	
	/*
     * Moves the bot up to 5 cells ahead unless a wall is hit
     */
	this.sprint = function() {
		addHistory('SPRINT');
		var blocked = false;
		Globals.Audio.play(sfx_sprint);
		for (var x = 0; x < Constants.Bot.SPRINT_DISTANCE; x++) {
			if (isOpen(sum(position, direction))) {
					position = sum(position, direction);
					addOpen(position);
			} else {
				blocked = true;
                hitWall(sum(position, direction));
				break;
			}
			if (mazeEvents()) break;
		}
		energy -= (blocked) ? Constants.EnergyCosts.SPRINT_BLOCKED : Constants.EnergyCosts.SPRINT;
        updatePosition(Constants.Bot.ANIMATION_SPEED * x / 2);
		return x;
	}
	/*
     * Scan around the bot for the recharger
     */
	this.scanForRecharger = function() {
		addHistory('SCAN');
		energy -= Constants.EnergyCosts.ENERGY_SCAN;
		return maze.scanForRecharger(position, mazeSprite);
	}
    /*
     * Bot pick up event
     */
	this.pickUpRecharger = function() {
		addHistory('PICKUP');
		energy -= Constants.EnergyCosts.ENERGY_PICKUP;
		var foundIt = maze.pickUpRecharger(position);
		if (foundIt) {
			energy += Constants.EnergyCosts.ENERGY_GAINED;
			var speed = Constants.Bot.ANIMATION_SPEED * 5;
			var sequence = 	new lime.animation.Sequence(
				// add sound
				new lime.animation.ScaleTo(1.5).setDuration(speed),
				new lime.animation.ScaleTo(1).setDuration(speed)
			);
			Globals.waitForAnimationEndEvent(sequence);
			Globals.Audio.play(sfx_pickupsuccess);
			if (rechargerSprite)
				rechargerSprite.runAction(new lime.animation.FadeTo(0).setDuration(Constants.Bot.ANIMATION_SPEED));
			self.sprite.runAction(sequence);
		} else {
			Globals.Audio.play(sfx_pickupfail);
		}
		return foundIt;
	}
	/*
     * @returns the bot's remaining energy
     */
	this.getEnergy = function() {
		return energy;
	}
    /*
     * Used for debugging, draws the entire maze
     */
    this.drawMaze = function() {
		maze.drawMaze(mazeSprite);
    }
    /*
     * Not implemented
     */
    //this.zoom = function(zoomIn) {
	//	if (zoomIn) {
	//	} else {
	//	}
    //}
    /*
     * @returns The bot's current direction
     */
    this.getDirection = function() {
        return direction;
    }
    /*
     * Updates the Bot's heads up display
     */
	this.updateOutput = function (){
		Globals.hudLabel.setText('Bot Energy: ' + this.getEnergy() + ' \n' +
			'Direction: ' + Directions.getName(direction) + ' \n' + 
			'Position: ' + position.x + ', ' + position.y + ' \n' +
			'Time: ' + Utils.getFormattedTime(timer) //(timer/1000.0).toFixed(3)
		);
	}
	/*
     * Toggle autolooking on/off
     */
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
	/*
     * Unbinds bot events when game has ended
     */
	this.dispose = function() {
		lime.scheduleManager.unschedule(mazeEvents, this);
        lime.scheduleManager.unschedule(updateTimer, this);
        lime.scheduleManager.unschedule(musicLoopEvent, this);
        Globals.logLabel = null;
		goog.events.unlisten(keyhandler, 'key', keyevents);
		//console.log(history);
	}
	
    /**
     * Used for debugging, ends game with 0 energy
     */
	this.suicide = function() {
		energy = 0;
	}
    /*
     * Displays the Help Screen
     */
    this.showHelp = function() {
        director.pushScene(new HelpScene(director).show());
    };
	
    // setup keyhandler and game events, returns true if game has ended
	var mazeEvents = function (dt) {
		var gameDone = false;
		if (energy <= 0) {
			Globals.Audio.play(sfx_outofenergy);
			self.dispose();
			noty({
				text: 'Out of energy<br />Click here to return to the main menu!', 
				layout: 'center',
                type: 'error',
                modal: true,
				callback: {
					onClose: function() {
						director.replaceScene(new GameMenu(director).showMenu(), Globals.transition);
					}
				}
			});
			return true;
		}
		if (maze.get(position) == Cell.GOAL) { // maze solved!
			Globals.Audio.play(sfx_goal);
			self.dispose();
			noty({
				text: 'Solved! Good job!<br />Click here to continue', 
				layout: 'center',
                type: 'success',
                modal: true,
				callback: {
					onClose: function() {
						new HighScoreInputScene(director, maze, energy, timer, history);
					}
				}
			});
			return true;
		}
		return false;
	};
	/*
     * 
     */
	var updateTimer = function(dt) {
		timer += dt;
		self.updateOutput();
	}

    lime.scheduleManager.schedule(mazeEvents, this);
    lime.scheduleManager.schedule(updateTimer, this);
    
    var keyhandler = new goog.events.KeyHandler(document);
    var keyevents = null;
    // select control scheme
    this.controlScheme = Globals.ControlScheme.hardcoded;
    if (!Globals.ControlScheme.useHardcoded) {
		this.controlScheme = Globals.easyMode ? 1 : 0;
	}
	switch (this.controlScheme) {
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
		self.sprite.runAction(new lime.animation.RotateTo(rotate).setDuration(0));
    }

	// wait for audio resources to preload
	$(sfx_outofenergy).bind('canplaythrough', function() {
		$(sfx_outofenergy).unbind('canplaythrough');
		addOpen(position);
		updatePosition(0.0001);
		mazeSprite.appendChild(self.sprite);
	});
	
	var musicLoopEvent = function() {
		Globals.Audio.play(sfx_music);
	};
	//
	//$(sfx_music).bind('canplaythrough', function() {
	//	lime.scheduleManager.scheduleWithDelay(musicLoopEvent, this, 1700);
	//});
	
	// initial set up of HUD and Log
	Globals.logLabel.setText('Welcome!');
	this.updateOutput();
}
