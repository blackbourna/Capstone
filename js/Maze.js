goog.provide('Maze');

goog.require('Constants');
goog.require('Utils');

// Cell states
Maze.OPEN = '-';
Maze.BLOCKED = '#';
Maze.GOAL = '@';

Maze = function(maze) {
    var self = this; //  private functions lose THIS reference - see http://css.dzone.com/news/object-oriented-javascript-und
    this.width = Constants.MAZE_W;
    this.height = Constants.MAZE_H;
	this.maze = null;
	this.goal = null;
	this.recharger = null;
    this.start = null;
    this.startDir = null;
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
			for (var y = 0; y < this.maze.length; y++) {
				var wall = new goog.math.Coordinate(y, x);
				if (bot.getPosition().x == y && bot.getPosition().y == x) {
					mazeString += '@';
				} else {
					mazeString += this.maze[x][y];
				}
				if (!debug)
				if (this.maze[x][y] == '#') {
					var wallSprite = new lime.Sprite().setFill(Constants.Graphics.IMG_ASSETS + 'wall.png');
					var width = wallSprite.getSize().width;
					var height = wallSprite.getSize().height;		
					//var coord = new goog.math.Coordinate(width * wall.x*1 + width/2, height * wall.y*1 + height/2);
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
				var sprite = new lime.Sprite().setFill(Constants.Graphics.IMG_ASSETS + 'goal.png');
				var width = sprite.getSize().width;
				var height = sprite.getSize().height;		
				var coord = new goog.math.Coordinate(width * cell.x*1 + width/2, height * cell.y*1 + height/2);
				sprite.setPosition(coord);
				mazeSprite.appendChild(sprite);
			}
		}
    }
}
