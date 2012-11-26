goog.provide('HighScoreScene');
goog.require('lime.ui.Scroller');
/*
I Andrew Blackbourn, 000129408 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
Source code licensed under 2-clause license ("Simplified BSD License" or "FreeBSD License"). See README.md for details.
*/
HighScoreScene = function(director) {
    
    var scene = new lime.Scene();
    var request = new goog.net.XhrIo();
    goog.events.listen(request, 'complete', function(){
        //request complete
        if (request.isSuccess()){
            var data = request.getResponseJson();
            console.log(data);
            var yHeight = 0;
            var header = new lime.Label("Highscores")
                .setPosition(250, yHeight)
                .setAlign('left')
                .setFontSize(48)
                .setFontWeight(700)
                .setAnchorPoint(0, 0)
                .setSize(Constants.Graphics.APP_DIMENSIONS.x, 50);
            scene.appendChild(header);
            yHeight += 50;
            var scroller = new lime.ui.Scroller()
                .setSize(Constants.Graphics.APP_DIMENSIONS.x, Constants.Graphics.APP_DIMENSIONS.y - 150 )
                .setPosition(0, yHeight)
                .setAnchorPoint(0, 0)
                .setDirection(lime.ui.Scroller.Direction.VERTICAL);
            for (var day in data) {
                console.log(day);
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
                
                function addRow(user_name, score, type, easy_mode){ // add header labels
                    var lblName = new lime.Label(user_name)
                        .setPosition(0, yHeight)
                        .setAlign('left')
                        .setFontSize(24)
                        .setFontWeight(200)
                        .setAnchorPoint(0, 0)
                        .setSize(Constants.Graphics.APP_DIMENSIONS.x, 50);
                    scroller.appendChild(lblName);
                    
                    var lblScore = new lime.Label(score)
                        .setPosition(Constants.Graphics.APP_DIMENSIONS.x/3, yHeight)
                        .setAlign('left')
                        .setFontSize(24)
                        .setFontWeight(200)
                        .setAnchorPoint(0, 0)
                        .setSize(Constants.Graphics.APP_DIMENSIONS.x, 50);
                    scroller.appendChild(lblScore);
                    
                    var lblType = new lime.Label(type)
                        .setPosition(Constants.Graphics.APP_DIMENSIONS.x/2, yHeight)
                        .setAlign('left')
                        .setFontSize(24)
                        .setFontWeight(200)
                        .setAnchorPoint(0, 0)
                        .setSize(Constants.Graphics.APP_DIMENSIONS.x, 50);
                    scroller.appendChild(lblType);
                    
                    var lblEasy = new lime.Label(easy_mode)
                        .setPosition(Constants.Graphics.APP_DIMENSIONS.x/1.5, yHeight)
                        .setAlign('left')
                        .setFontSize(24)
                        .setFontWeight(200)
                        .setAnchorPoint(0, 0)
                        .setSize(Constants.Graphics.APP_DIMENSIONS.x, 50);
                    scroller.appendChild(lblEasy);
                    yHeight += 30;
                }
                addRow("User Name", "Score", "Maze Type", "Easy Mode");
                for (var highscore in data[day]) {
                    addRow(data[day][highscore].user_name, data[day][highscore].score, data[day][highscore].type, data[day][highscore].easy_mode == 1 ? "X" : "");
                }
            }
            scene.appendChild(scroller);
            var goBack = new lime.GlossyButton('Go Back').setAnchorPoint(0, 0).setPosition(500, Constants.Graphics.APP_DIMENSIONS.y - 50).setSize(500, 50).setColor('#FF0000');
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
