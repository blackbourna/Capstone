goog.require('Game');
goog.provide('MazeLoader');

goog.require('Directions');
/*
I Andrew Blackbourn, 000129408 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
Source code licensed under 2-clause license ("Simplified BSD License" or "FreeBSD License"). See README.md for details.
*/

/**
 * Used for loading the maze via ajax
 */
MazeLoader = function(director) {
	this.director = director;
	var self = this;
	this.getMaze = function(type){
		var request = new goog.net.XhrIo();

		goog.events.listen(request, 'complete', function(){
			//request complete
			if (request.isSuccess()){
				var data = request.getResponseJson();
				maze = new Maze(new Point(parseInt(data.recharger.x), parseInt(data.recharger.y))); // pass recharger to constructor, keep this var private
				maze.width = data.maze.length;
				maze.height = data.maze[0].length;
				maze.maze = data.maze;
				maze.goal = new Point(parseInt(data.goal.x), parseInt(data.goal.y));
				maze.start = new Point(parseInt(data.start.x), parseInt(data.start.y));
				maze.startDir = Directions.get(data.start.dir);
				maze.type = data.type;
                maze.seed = data.seed;
                
				self.director.replaceScene(new Game(maze, self.director), Globals.transition);
			} else {
				//error
			}
		});
		request.send('./mazeloader.php?type='+type);
	};
}
