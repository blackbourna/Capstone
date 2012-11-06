goog.provide('Globals');

Globals = {
	animationPlaying: false,
	waitForAnimationEndEvent: function(anim) {
		Globals.animationPlaying = true;
		goog.events.listen(anim,lime.animation.Event.STOP, function(){
			lime.scheduleManager.scheduleWithDelay(function() {
				Globals.animationPlaying = false;
            }, null, 100);
		});
	},
	Audio: {
		stopThenPlay: function(audio) {
			audio.currentTime = 0;
			audio.play();
		}
	},
	ControlScheme: 1,
	Debug: {
		
	},
    hudLabel: null,
	logContainer:null,
    logLabel: null,
    easyMode: false
}
