goog.provide('Globals');

Globals = {
	animationPlaying: false,
	waitForAnimationEndEvent: function(anim) {
		Globals.animationPlaying = true;
		goog.events.listen(anim,lime.animation.Event.STOP,function(){
			Globals.animationPlaying = false;
		});
	}
}
