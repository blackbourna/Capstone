goog.provide('Maze');

goog.require('Constants');
goog.require('Utils');

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
			return (Utils.validatePoint(x)) ? this.maze[x.x][x.y] : '#';
		} else {
			return (Utils.validatePoint(x)) ? this.maze[x][y] : '#';
		}
    }
    this.drawMaze = function(mazeSprite, bot, debug) {
		var mazeString = '';
		for (var x = 0; x < this.maze.length; x++) {
			for (var y = 0; y < this.maze.length; y++) {
				var wall = new goog.math.Coordinate(y, x);
				if (bot.getPosition().x == x && bot.getPosition().y == y) {
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
}

Maze.OPEN = '-';
Maze.BLOCKED = '#';
Maze.GOAL = '@';
