goog.provide('Utils');

Utils = {
	validatePoint: function(x, y) {
		if (typeof x == 'object') {
			return (x.x > -1 && x.x < Constants.Maze.MAZE_W && x.y > -1 && x.y < Constants.Maze.MAZE_H);
		} else {
			return (x > -1 && x < Constants.Maze.MAZE_W && y > -1 && y < Constants.Maze.MAZE_H);
		}
	},
	getScreenPositionRelativeToCoordinates: function(x, y) {
		if (typeof x == 'object') {
			return new goog.math.Coordinate(Constants.Graphics.CELL_W * position.x.x*1 + width/2, Constants.Graphics.CELL_W * position.x.y*1 + height/2);
		} else {
			return new goog.math.Coordinate(Constants.Graphics.CELL_W * position.x*1 + width/2, Constants.Graphics.CELL_W * position.y*1 + height/2);
		}
	}
}
