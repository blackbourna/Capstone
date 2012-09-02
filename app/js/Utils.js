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
		// note that this requires that the object have an AnchorPoint of (0, 0)!
		if (typeof x == 'object') {
			return new goog.math.Coordinate(Constants.Graphics.CELL_W * x.x, Constants.Graphics.CELL_W * x.y);
		} else {
			return new goog.math.Coordinate(Constants.Graphics.CELL_W * x, Constants.Graphics.CELL_W * y);
		}
	}
}
