goog.provide('Utils');

Utils = {
	validatePoint: function(x, y) {
		if (typeof x == 'object') {
			return (x.x > -1 && x.x < Constants.Maze.MAZE_DIMENSIONS.x && x.y > -1 && x.y < Constants.Maze.MAZE_DIMENSIONS.y);
		} else {
			return (x > -1 && x < Constants.Maze.MAZE_DIMENSIONS.x && y > -1 && y < Constants.Maze.MAZE_DIMENSIONS.y);
		}
	},
	getScreenPositionRelativeToCoordinates: function(x, y) {
		// note that this requires that the object have an AnchorPoint of (0, 0)!
		if (typeof x == 'object') {
			return new goog.math.Coordinate(Constants.Graphics.CELL_DIMENSIONS.x * x.x, Constants.Graphics.CELL_DIMENSIONS.x * x.y);
		} else {
			return new goog.math.Coordinate(Constants.Graphics.CELL_DIMENSIONS.x * x, Constants.Graphics.CELL_DIMENSIONS.x * y);
		}
	}
}
