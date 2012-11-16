goog.provide('Maze');

goog.require('Constants');
goog.require('Utils');

Maze = function(energyPt) {
    var self = this;
    this.width = Constants.Maze.MAZE_DIMENSIONS.x;
    this.height = Constants.Maze.MAZE_DIMENSIONS.y;
	this.maze = null;
	this.goal = null;
    this.start = null;
    this.startDir = null;

	var radarSpeed = 0.25;
	var sfx_scan1 = new Audio(Constants.Assets.AUDIO_PATH + 'scan1.wav');
	var sfx_scan2 = new Audio(Constants.Assets.AUDIO_PATH + 'scan2.wav');
	
	var recharger = energyPt;
	
    this.init = function(mazeSprite) {
        // set maze size constants
		for (var x = this.goal.y; x < this.goal.y + 4; x++) {
			for (var y = this.goal.x; y < this.goal.x + 4; y++) {
				this.maze[x][y] = Cell.GOAL;
				var cell = new goog.math.Coordinate(y, x);
				var sprite = new lime.Sprite().setFill(Constants.Assets.IMAGE_PATH + 'goal.png');
				var width = sprite.getSize().width;
				var height = sprite.getSize().height;		
				var coord = new goog.math.Coordinate(width * cell.x*1 + width/2, height * cell.y*1 + height/2);
				sprite.setPosition(coord);
				mazeSprite.appendChild(sprite);
			}
		}
    }
	
    this.get = function(x, y) {
		if (typeof x == 'object') {
			return (Utils.validatePoint(x)) ? this.maze[x.y][x.x] : '#';
		} else {
			return (Utils.validatePoint(x)) ? this.maze[y][x] : '#';
		}
    }
    
    // draw entire maze for easy mode/debugging
    this.drawMaze = function(mazeSprite) {
		if (!Globals.easyMode) return;
		var mazeString = '';
		for (var x = 0; x < this.maze.length; x++) {
			for (var y = 0; y < this.maze[0].length; y++) {
				var wall = new goog.math.Coordinate(y, x);
				if (this.maze[x][y] == '#') {
					var wallSprite = new lime.Sprite().setFill(Constants.Assets.IMAGE_PATH + 'wall.png');
					var width = wallSprite.getSize().width;
					var height = wallSprite.getSize().height;		
					var coord = new goog.math.Coordinate(width * wall.x*1 + width/2, height * wall.y*1 + height/2);
					wallSprite.setPosition(coord);
					mazeSprite.appendChild(wallSprite);
				}
			}
			mazeString += '\n';
		}
        // add recharger
        var rechargerSprite = new lime.Sprite().setFill(Constants.Assets.IMAGE_PATH + 'energy.png');
        var width = rechargerSprite.getSize().width;
        var height = rechargerSprite.getSize().height;		
        var coord = new goog.math.Coordinate(width * recharger.x*1 + width/2, height * recharger.y*1 + height/2);
        rechargerSprite.setPosition(coord);
        mazeSprite.appendChild(rechargerSprite);
    }
    
    this.scanForRecharger = function(position, mazeSprite) {
		//(int)Math.round(Math.sqrt(dx * dx + dy * dy));
		Globals.animationPlaying = true;
		if (Point.equals(recharger, position)) { // play some notifier
			foundEnergy = true;
		}
		var allSprites = []; // collect all sprites for GC
		for (var i = 1; i < 12 && !foundEnergy; i++) { // work outward 12 cells from bot position
			var foundEnergy = false;
			var sprites = []; // sprites of points of circle that match the distance of i
			for (var x = 0; x < this.maze.length; x++) { // iterate maze
				for (var y = 0; y < this.maze[0].length; y++) {
					var pt = new Point(y, x);
					var distance = parseInt(Math.round(Math.sqrt(Point.squaredDistance(position, pt))));
					if (distance == i) { // current cell matches the distance reported by the scan so add it to the collection
						var scanSprite = new lime.Sprite()
							.setFill(Constants.Assets.IMAGE_PATH + 'scan.png')
							.setAnchorPoint(0, 0)
							.setOpacity(0.0)
							.setPosition(Utils.getScreenPositionRelativeToCoordinates(pt));
						sprites.push(scanSprite);
						allSprites.push(scanSprite);
						if (Point.equals(recharger, pt)) { // only continue to scan outward until energy is found
							foundEnergy = true;
						}
					}
				}
			}
			for (var s in sprites) {
				mazeSprite.appendChild(sprites[s]);
				var sequence = null;
				var sequenceSpeed = radarSpeed/3;
				if (!foundEnergy) {
					sequence = new lime.animation.Sequence(
						new lime.animation.Delay().setDuration((i - 1)*radarSpeed), 		
										
						new lime.animation.FadeTo(1).setDuration(sequenceSpeed), 
						new lime.animation.FadeTo(0).setDuration(sequenceSpeed)
					);
					lime.scheduleManager.scheduleWithDelay(function (dt) {
						Globals.Audio.stopThenPlay(sfx_scan1); // use raw HTML5 for audio, limejs has terrible audio support
					}, null, radarSpeed * 1000 * i, 1);
				} else {
					// flash 3 times. limejs doesn't have any list-style animation collections,
					// and javascript doesn't support tuples... ugly stuff
					sequence = new lime.animation.Sequence(
						new lime.animation.Delay().setDuration((i - 1)*radarSpeed),
						
						new lime.animation.FadeTo(1).setDuration(sequenceSpeed), 
						new lime.animation.FadeTo(0).setDuration(sequenceSpeed),
						
						new lime.animation.FadeTo(1).setDuration(sequenceSpeed), 
						new lime.animation.FadeTo(0).setDuration(sequenceSpeed),
						
						new lime.animation.FadeTo(1).setDuration(sequenceSpeed), 
						new lime.animation.FadeTo(0).setDuration(sequenceSpeed)
					);
					lime.scheduleManager.scheduleWithDelay(function (dt) {
						Globals.Audio.stopThenPlay(sfx_scan1);
						lime.scheduleManager.scheduleWithDelay(function (dt) { // high pitched "you've found it" notification
							Globals.Audio.stopThenPlay(sfx_scan2);
						}, null, radarSpeed * 1000, 3);
					}, null, radarSpeed * 1000 * i, 1);
				}
				sprites[s].runAction(sequence);
			}
		}
		// re-enable keyboard input
		lime.scheduleManager.scheduleWithDelay(function (dt) {
			Globals.animationPlaying = false;
			for (var s in sprites) {
				sprites[s].removeDomElement(); // garbage collection, these sprites seem to cause browser slowdown
				delete sprites[s];
			}
		}, null, i * radarSpeed * 1000, 1);
		
		// add label to cell
		var distance = (foundEnergy) ? i - 1 : -1;
		var label = new lime.Label(distance)
			.setAnchorPoint(0, 0)
			.setPosition(Utils.getScreenPositionRelativeToCoordinates(position));
		mazeSprite.appendChild(label);
		label.runAction(new lime.animation.FadeTo(1).setDuration(i * radarSpeed));
		return distance;
    }
    
    this.pickUpRecharger = function(position) {
		var foundIt = Point.equals(position, recharger);
		if (foundIt)
			recharger = null;
		return foundIt;
    }
}
