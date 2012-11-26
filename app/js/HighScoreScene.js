goog.provide('HighScoreScene');
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
        } else {
            //error
        }
    });
    request.send('./show_highscore.php', "GET");
    director.replaceScene(scene, Globals.transition);
}
