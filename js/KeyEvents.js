goog.provide('KeyEvents');
goog.require('MOVE');

KeyEvents = function(b) {
	var bot = b;

	this.events = function(e) {
		var sum = goog.math.Coordinate.sum;
		var keyCodes = goog.events.KeyCodes;
		var msg = '';
		var keyCode = e.keyCode;
		// On the Mac, shift-/ triggers a question mark char code and no key code,
		// so we synthesize the latter http://closure-library.googlecode.com/svn/docs/closure_goog_events_keyhandler.js.source.html
		if (goog.userAgent.MAC && charCode == goog.events.KeyCodes.QUESTION_MARK && !keyCode) {
			keyCode = goog.events.KeyCodes.SLASH;
		}
		switch (keyCode) {
			// Bot Directions
			// Forward
			case keyCodes.UP:
				if (e.event_.shiftKey) {
					msg = 'Looked ahead.';
					bot.look(LOOK.AHEAD);
				} else {
					msg = 'Moved forward.';
					bot.move(MOVE.FORWARD);
				}
			break;
			// Back
			case keyCodes.DOWN:
				msg = 'Moved back.';
				bot.move(MOVE.BACKWARD);
			break;
			// Turn Right
			case keyCodes.RIGHT:
				if (e.event_.shiftKey) {
					msg = 'Looked right.';
					bot.look(LOOK.RIGHT);
				} else {
					msg = 'Turned right.';
					bot.move(MOVE.RIGHT);
				}
			break;
			// Turn Left
			case keyCodes.LEFT:
				if (e.event_.shiftKey) {
					msg = 'Looked left.';
					bot.look(LOOK.LEFT);
				} else {
					msg = 'Turned left.';
					bot.move(MOVE.LEFT);
				}
			break;
			// Camera zoom
			case keyCodes.A:
				scene.runAction(new lime.animation.ScaleTo(scene.getScale().x * 2));
			break;
			case keyCodes.Z:
				console.log("Z");
				scene.runAction(new lime.animation.ScaleTo(scene.getScale().x / 2));
			break;
			// Sprint forward
			case keyCodes.SPACE:
				msg = 'Sprinted forward.';
			break;
			// Rotate
			case keyCodes.CTRL:
				msg = 'Turned 180 degrees.';
			break;
			// Scan
			case keyCodes.ENTER:
				msg = 'Scanned for energy.';
			break;
			case keyCodes.MAC_ENTER:
				msg = 'Scanned for energy.';
			break;
			// Pick up recharger
			case keyCodes.BACKSLASH:
				msg = 'Picked up energy.';
			break;
			// Look far ahead
			case keyCodes.SLASH:
				msg = 'Looked far ahead.';
			break;
		}
		console.log(
			'keyCode: ' + e.keyCode +
			', charCode: ' + e.charCode +
			', repeat: ' + e.repeat +
			', target: ' + e.target +
			', native event: ' + e.getBrowserEvent().type);
		console.log(msg);
	}
}
