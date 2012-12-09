goog.provide('HighScoreScene');
goog.require('lime.ui.Scroller');
/*
I Andrew Blackbourn, 000129408 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
Source code licensed under 2-clause license ("Simplified BSD License" or "FreeBSD License"). See README.md for details.
*/

/**
 * Container for the High Score screen
 */
HighScoreScene = function(director) {
    
    var scene = new lime.Scene();
	Utils.addBackgroundToScene(scene);
    var request = new goog.net.XhrIo();
    goog.events.listen(request, 'complete', function(){
        //request complete
        if (request.isSuccess()){
            var data = request.getResponseJson();
            var yHeight = 0;
            var header = new lime.Label("Highscores")
                .setPosition(350, yHeight)
                .setAlign('left')
                .setFontSize(48)
                .setFontWeight(700)
                .setAnchorPoint(0, 0)
                .setSize(Constants.Graphics.APP_DIMENSIONS.x, 50);
            scene.appendChild(header);
            yHeight += 50;
            var scroller = new lime.ui.Scroller()
                .setSize(Constants.Graphics.APP_DIMENSIONS.x, Constants.Graphics.APP_DIMENSIONS.y - 150)
                .setPosition(100, yHeight)
                .setAnchorPoint(0, 0)
                .setDirection(lime.ui.Scroller.Direction.VERTICAL);
                
			var bgRect = new lime.RoundedRect()
				.setSize(Constants.Graphics.APP_DIMENSIONS.x - 100, Constants.Graphics.APP_DIMENSIONS.y - 150)
				.setFill(new lime.fill.LinearGradient()
					.addColorStop(0, '#3e4e5e')
					.addColorStop(Constants.Graphics.APP_DIMENSIONS.y - 100, '#4f8adb'))
				.setPosition(50, yHeight)
				.setAnchorPoint(0, 0)
				.setRadius(30);
			scene.appendChild(bgRect);
                
            for (var day in data) {
                scroller.appendChild(
                    new lime.Label(day)
                        .setPosition(0, yHeight)
                        .setAlign('left')
                        .setFontSize(36)
                        .setFontWeight(700)
                        .setAnchorPoint(0, 0)
                        .setSize(Constants.Graphics.APP_DIMENSIONS.x, 50)
                );
                yHeight += 50;
                
                function addRow(user_name, score, type, easy_mode, is_header){ // add header labels
					var labels = new Array();
                    labels['user_name'] = new lime.Label(user_name)
                        .setPosition(0, yHeight)
                        .setAlign('left')
                        .setFontSize(24)
                        .setAnchorPoint(0, 0)
                        .setSize(Constants.Graphics.APP_DIMENSIONS.x, 50);
                    
                    labels['score'] = new lime.Label(score)
                        .setPosition(Constants.Graphics.APP_DIMENSIONS.x/3, yHeight)
                        .setAlign('left')
                        .setFontSize(24)
                        .setAnchorPoint(0, 0)
                        .setSize(Constants.Graphics.APP_DIMENSIONS.x, 50);
                    
                    labels['type'] = new lime.Label(type)
                        .setPosition(Constants.Graphics.APP_DIMENSIONS.x/2, yHeight)
                        .setAlign('left')
                        .setFontSize(24)
                        .setAnchorPoint(0, 0)
                        .setSize(Constants.Graphics.APP_DIMENSIONS.x, 50);
                    
                    labels['easy_mode'] = new lime.Label(easy_mode)
                        .setPosition(Constants.Graphics.APP_DIMENSIONS.x/1.5, yHeight)
                        .setAlign('left')
                        .setFontSize(24)
                        .setAnchorPoint(0, 0)
                        .setSize(Constants.Graphics.APP_DIMENSIONS.x, 50);

					for (var l in labels) {
						if (is_header){
							labels[l].setFontWeight(700)
						}
						scroller.appendChild(labels[l]);
					}
                    yHeight += 30;
                }
                addRow("User Name", "Score", "Maze Type", "Easy Mode", true);
                for (var mazeType in data[day]) {
                    for (var highscore in data[day][mazeType]) {
						console.log(data[day][mazeType][highscore].easy_mode);
						console.log(data[day][mazeType][highscore].easy_mode == 1);
                        addRow(data[day][mazeType][highscore].user_name, data[day][mazeType][highscore].score, mazeType, (data[day][mazeType][highscore].easy_mode == 1) ? "X" : "", false);
                    }
                }
            }
            
            scene.appendChild(scroller);
            var goBack = new lime.GlossyButton('Go Back').setAnchorPoint(0, 0).setPosition(500, Constants.Graphics.APP_DIMENSIONS.y - 50).setSize(500, 50).setColor('#ed4753');
            goog.events.listen(goBack, ['mousedown','touchstart'], function(e) {
                director.replaceScene(new GameMenu(director).showMenu(), Globals.transition);
            });
            scene.appendChild(goBack);
        } else {
            //error
            director.replaceScene(new GameMenu(director).showMenu(), Globals.transition);
        }
    });
    request.send('./show_highscore.php', "GET");
    director.replaceScene(scene, Globals.transition);
}
