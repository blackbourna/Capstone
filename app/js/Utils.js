goog.provide('Utils');
/*
I Andrew Blackbourn, 000129408 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
Source code licensed under 2-clause license ("Simplified BSD License" or "FreeBSD License"). See README.md for details.
*/
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
    submitHighScore: function(name, maze, energy, timer, history, director) {
		var request = new goog.net.XhrIo();
        var postData = {"name": name, "mazeSeed": maze.seed, "mazeType": maze.type, "energy": energy, "timer": timer, "history": JSON.stringify(history), easyMode: Globals.easyMode};
        console.log(postData);
        var queryString = "?";
        // apparently closure does not provide a urlencode function, however the 
        // highscore input won't accept anything but letters and spaces so the input
        // should be valid
        for (var d in postData) {
			queryString += d + "=" + postData[d] + "&";
		}
		queryString = queryString.substring(0, queryString.length - 1); // remove trailing &
        
        $.ajax({
            type: 'POST',
            url: './highscore.php',
            data: postData,
            success: function(data){
                var success = data == "true";
                noty({
                    text: (success) ? 'Thanks for playing!' : 'There was a problem submitting your highscore. Please contact the system administrator.', 
                    layout: 'center',
                    type: (success) ? 'success' : 'error',
                    callback: {
                        onClose: function() {
                            director.replaceScene(new GameMenu(director).showMenu(), Globals.transition);
                        }
                    }
                });
            },
            dataType: 'json'
        });
    },
    addBackgroundToScene: function (scene) {
		var bgSize = 127;
		var bgInterval = 125;

		for (var x = 0; x < Constants.Graphics.APP_DIMENSIONS.x; x += 125) {
			for (var y = 0; y < Constants.Graphics.APP_DIMENSIONS.x; y += 125) {
				var bgSprite = new lime.Sprite()
					.setSize(bgSize, bgSize)
					.setFill(Constants.Assets.IMAGE_PATH+"background.png")
					.setAnchorPoint(0, 0)
					.setPosition(x, y);
				scene.appendChild(bgSprite);
			}
		}
	}
}
