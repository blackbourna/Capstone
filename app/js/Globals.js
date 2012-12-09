goog.provide('Globals');
/*
I Andrew Blackbourn, 000129408 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
Source code licensed under 2-clause license ("Simplified BSD License" or "FreeBSD License"). See README.md for details.
*/

/**
 * Contains global variables that may change during gameplay
 */
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
		// Global function to play audio if enabled (originally would reuse audio objects but some versions of Chrome has issues with this)
		play: function(audio) {
            if (!Globals.Audio.enabled) return;
            audio.currentTime = 0;
			audio.play();
		},
        enabled: true
	},
	ControlScheme: {
		useHardcoded: false, // if useHardcoded = false, Darkness mode uses scheme 0 and Easy mode uses scheme 1
		hardcoded: 1 // use this scheme if useHardcoded = true
	},
	Debug: {
		debug: false
	},
    hudLabel: null,
	logContainer:null,
    logLabel: null,
    easyMode: false,
    transition: null // set this in CapstoneProject_BlackbournA
}
