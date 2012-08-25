goog.require('Game');
goog.provide('MazeLoader');

goog.require('Directions');

MazeLoader = function(director) {
	this.director = director;
	var self = this;
	this.getMaze = function(){
		var request = new goog.net.XhrIo();

		goog.events.listen(request, 'complete', function(){
			//request complete
			if (request.isSuccess()){
				var data = request.getResponseJson();
				maze = new Maze();
				maze.width = data.maze.length;
				maze.height = data.maze[0].length;
				maze.maze = data.maze;
				console.log(data.maze);
				maze.goal = new Point(parseInt(data.goal.x), parseInt(data.goal.y));
				maze.recharger = new Point(parseInt(data.recharger.x), parseInt(data.recharger.y));
				maze.start = new Point(parseInt(data.start.x), parseInt(data.start.y));
				maze.startDir = Directions.get(data.start.dir);
				
				self.director.pushScene(new Game(maze));
			} else {
				//error
			}
		});
		request.send('./mazeloader.php');
	};
}
