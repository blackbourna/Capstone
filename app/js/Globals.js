goog.provide('Globals');

Globals = {
	animationPlaying: false,
	waitForAnimationEndEvent: function(anim) {
		Globals.animationPlaying = true;
		goog.events.listen(anim,lime.animation.Event.STOP, function(){
			Globals.animationPlaying = false;
		});
	},
	Audio: {
		stopThenPlay: function(audio) {
			audio.currentTime = 0;
			audio.play();
		}
	},
    hudLabel: null,
	logContainer:null,
    logLabel: null,
    easyMode: false
}
