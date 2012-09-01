goog.provide('Maze');

goog.require('Constants');
goog.require('Utils');

// Cell states
Maze.OPEN = '-';
Maze.BLOCKED = '#';
Maze.GOAL = '@';

Maze = function(energyPt) {
    var self = this;
    this.width = Constants.MAZE_W;
    this.height = Constants.MAZE_H;
	this.maze = null;
	this.goal = null;
    this.start = null;
    this.startDir = null;

	var radar1 = new Audio(Constants.Assets.AUDIO_PATH + 'radar1.wav');
	var radar2 = new Audio(Constants.Assets.AUDIO_PATH + 'radar2.wav');
	
	var recharger = energyPt;
	
    this.get = function(x, y) {
		if (typeof x == 'object') {
			return (Utils.validatePoint(x)) ? this.maze[x.y][x.x] : '#';
		} else {
			return (Utils.validatePoint(x)) ? this.maze[y][x] : '#';
		}
    }
    this.drawMaze = function(mazeSprite, bot, debug) {
		var mazeString = '';
		for (var x = 0; x < this.maze.length; x++) {
			for (var y = 0; y < this.maze[0].length; y++) {
				var wall = new goog.math.Coordinate(y, x);
				if (bot.getPosition().x == y && bot.getPosition().y == x) {
					mazeString += '@';
				} else {
					mazeString += this.maze[x][y];
				}
				if (!debug)
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
		console.log(mazeString);
    }
    this.init = function(mazeSprite) {
        // set maze size constants
		for (var x = this.goal.y; x < this.goal.y + 4; x++) {
			for (var y = this.goal.x; y < this.goal.x + 4; y++) {
				this.maze[x][y] = '@';
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
    
    this.scanForRecharger = function(position, mazeSprite) {
		//(int)Math.round(Math.sqrt(dx * dx + dy * dy));
		for (var i = 1; i < 12 && !foundEnergy; i++) { // work outward 12 cells from bot position
			var sprites = [];
			var foundEnergy = false;
			for (var x = 0; x < this.maze.length; x++) { // iterate maze
				for (var y = 0; y < this.maze[0].length; y++) {
					var pt = new Point(y, x);
					var distance = parseInt(Math.round(Math.sqrt(Point.squaredDistance(position, pt))));
					if (distance == i) {
						//var sequence = new lime.animation.Sequence();
						var scanSprite = new lime.Sprite()
							.setFill(Constants.Assets.IMAGE_PATH + 'scan.png')
							.setAnchorPoint(0, 0)
							.setOpacity(0.0)
							.setPosition(Utils.getScreenPositionRelativeToCoordinates(pt));
						sprites.push(scanSprite);
						if (Point.equals(recharger, pt)) {
							foundEnergy = true;
						}
					}
				}
			}
			for (var s in sprites) {
				mazeSprite.appendChild(sprites[s]);
				var sequence = null;
				if (!foundEnergy) {
					sequence = new lime.animation.Sequence(
						new lime.animation.Delay().setDuration((i - 1)/4),
						new lime.animation.FadeTo(1).setDuration(0.125), 
						new lime.animation.FadeTo(0).setDuration(0.125)
					);
					lime.scheduleManager.scheduleWithDelay(function (dt) {
						radar1.currentTime = 0;
						radar1.play(); // use raw HTML5 for audio, limejs has terrible audio support
					}, null, 250 * i, 1);
				} else {
					sequence = new lime.animation.Sequence(
						// flash 3 times. limejs doesn't have any list-style animation collections,
						// and javascript doesn't support tuples... ugly stuff
						new lime.animation.Delay().setDuration((i - 1)/4),
						new lime.animation.FadeTo(1).setDuration(0.125), 
						new lime.animation.FadeTo(0).setDuration(0.125),
						
						new lime.animation.FadeTo(1).setDuration(0.125), 
						new lime.animation.FadeTo(0).setDuration(0.125),
						
						new lime.animation.FadeTo(1).setDuration(0.125), 
						new lime.animation.FadeTo(0).setDuration(0.125)
					);
					lime.scheduleManager.scheduleWithDelay(function (dt) {
						radar1.currentTime = 0;
						radar1.play();
						lime.scheduleManager.scheduleWithDelay(function (dt) {
							radar2.currentTime = 0;
							radar2.play();
						}, null, 250, 3);
					}, null, 250 * i, 1);
				}
				sprites[s].runAction(sequence);
			}
		}
    }
}
