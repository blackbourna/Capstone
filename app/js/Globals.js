goog.provide('Globals');
Globals = {
	animationPlaying: false,
	waitForAnimationEndEvent: function(anim, option_function) {
		Globals.animationPlaying = true;
		goog.events.listen(anim,lime.animation.Event.STOP, function(){
			lime.scheduleManager.scheduleWithDelay(function() {
				Globals.animationPlaying = false;
				if (option_function) {
					option_function();
				}
            }, null, 10, 1);
		});
	},
	Audio: {
		stopThenPlay: function(audio) {
			audio.currentTime = 0;
			audio.play();
		}
	},
	ControlScheme: {
		useHardcoded: false, // if useHardcoded = false, Darkness mode uses scheme 0 and Easy mode uses scheme 1
		hardcoded: 1 // use this scheme if useHardcoded = true
	},
	Debug: {
		debug: true
	},
    hudLabel: null,
	logContainer:null,
    logLabel: null,
    easyMode: false,
    transition: null // set this in CapstoneProject_BlackbournA
}
