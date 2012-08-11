goog.provide('MazeLoader');

MazeLoader.getMaze = function(){
    var request = new goog.net.XhrIo();

    goog.events.listen(request, 'complete', function(){
        //request complete
        if (request.isSuccess()){
            var data = request.getResponseJson();
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