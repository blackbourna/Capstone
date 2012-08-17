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
				console.log(data);
				this.director.replaceScene(new Game());
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
