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
	},
    getFormattedTime: function (timer) {    
		// modified version of http://stackoverflow.com/questions/6312993/javascript-seconds-to-time-with-format-hhmmss
		var sec_numb = timer / 1000;
		var hours   = Math.floor(sec_numb / 3600);
		var minutes = Math.floor((sec_numb - (hours * 3600)) / 60);
		var seconds = sec_numb - (hours * 3600) - (minutes * 60);
		seconds = seconds.toFixed(3);

		if (minutes < 10) {minutes = "0"+minutes;}
		if (seconds < 10) {seconds = "0"+seconds;}
		//var time = hours+':'+minutes+':'+seconds;
		var time = minutes+':'+seconds;
		return time;
	},
    submitHighScore: function(name, maze, energy, timer, history, scene) {
		var request = new goog.net.XhrIo();
		goog.events.listen(request, 'complete', function(){
			//request complete
			if (request.isSuccess()){
				var data = request.getResponseJson();
                console.log(data);
				//director.replaceScene(new GameMenu.showMenu(director), Globals.transition);
			} else {
				//error
			}
		});
        var postData = {"name": name, "mazeSeed": maze.seed, "mazeType": maze.type, "energy": energy, "timer": timer, "history": history};
        var queryString = "?";
        // apparently closure does not provide a urlencode function, however the 
        // highscore input won't accept anything but letters and spaces so the input
        // should be valid
        for (var d in postData) {
			queryString += d + "=" + postData[d] + "&";
		}
		queryString = queryString.substring(0, queryString.length - 1); // remove trailing &
        console.log(postData);
		request.send('./highscore.php'+queryString, "GET", postData);
    }
}
