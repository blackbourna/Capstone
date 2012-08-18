goog.require('Game');
goog.provide('MazeLoader');

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
				maze.maze = data.mazemaze;
				maze.goal = new Point(data.goal.x, data.goal.y);
				maze.recharger = new Point(data.recharger.x, data.recharger.y);
				maze.start = new Point(data.start.x, data.start.y);
				maze.startDir = data.start.dir;
				
				self.director.replaceScene(new Game(maze));
			} else {
				//error
			}
		});
		request.send('./mazeloader.php');
	};
}
