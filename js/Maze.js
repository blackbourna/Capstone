goog.provide('CapstoneProject_BlackbournA.Maze');

//ajax stuff
goog.require('goog.net.XhrIo');
goog.require('goog.json');
function Maze(setupAfterAjaxMazeLoad) {
    // need to make callback when maze is done loading
    this.setupAfterAjaxMazeLoad = setupAfterAjaxMazeLoad;
    var self = this; //  private functions lose THIS reference - see http://css.dzone.com/news/object-oriented-javascript-und
    this.width = MAZE_W;
    this.height = MAZE_H;
	this.maze = null;
	this.goal = null;
	this.recharger = null;
    this.start = null;
    this.get = function(x, y) {
        return this.maze[x][y];
    }
    var parseMaze = function() {
		var request = new goog.net.XhrIo();

		goog.events.listen(request, 'complete', function(){
		//request complete
		if(request.isSuccess()){
			var data = request.getResponseJson();
            self.start = new Point(data.start.x, data.start.y);
            // parse goog.math.Vec2
            self.start.dir = data.start.dir;
			console.log(self);
            self.setupAfterAjaxMazeLoad();
		} else {
			//error
		}
		});
		request.send('./mazeloader.php');
    }
	
	parseMaze();
}
