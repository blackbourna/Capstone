goog.provide('Maze');

goog.require('Constants');

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
        return this.maze[x][y];
    }
}
