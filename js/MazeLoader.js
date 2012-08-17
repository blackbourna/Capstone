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
				maze.width = Constants.MAZE_W;
				maze.height = Constants.MAZE_H;
				maze.maze = null;
				maze.goal = null;
				maze.recharger = null;
				maze.start = null;
				this.director.replaceScene(new Game(data));
				//self.start = new Point(data.start.x, data.start.y);
				//// parse goog.math.Vec2
				//self.start.dir = data.start.dir;
				//console.log(self);
				//self.setupAfterAjaxMazeLoad();
			} else {
				//error
			}
		});
		request.send('./mazeloader.php');
	};
}
