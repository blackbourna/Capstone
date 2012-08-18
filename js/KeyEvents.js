goog.provide('KeyEvents');

KeyEvents = function(b) {
	var bot = b;

	this.events = function(e) {
		var sum = goog.math.Coordinate.sum;
		var keyCodes = goog.events.KeyCodes;
		var msg = '';
		switch (e.keyCode) {
			// Bot Directions
			// Forward
			case keyCodes.UP:
				msg = 'Moved forward.';
				bot.sprite.setPosition(sum(bot.sprite.getPosition(), DIR_UP));
			break;
			// Back
			case keyCodes.DOWN:
				msg = 'Moved back.';
				bot.sprite.setPosition(sum(bot.sprite.getPosition(), DIR_DOWN));
			break;
			// Turn Right
			case keyCodes.RIGHT:
				if (e.event_.shiftKey) {
					msg = 'Looked right.';
				} else {
					msg = 'Turned right.';
					bot.sprite.runAction(new lime.animation.Sequence(
						new lime.animation.ScaleTo(1.2).setDuration(.2),
						new lime.animation.RotateBy(-90),
						new lime.animation.ScaleTo(1).setDuration(.2)
					));
					bot.sprite.setPosition(sum(bot.sprite.getPosition(), DIR_RIGHT));
				}
			break;
			// Turn Left
			case keyCodes.LEFT:
				msg = 'Turned left.';
				bot.sprite.runAction(new lime.animation.Sequence(
					new lime.animation.ScaleTo(1.2).setDuration(.2),
					new li033me.animation.RotateBy(90),
					new lime.animation.ScaleTo(1).setDuration(.2)
				));
				bot.sprite.setPosition(sum(bot.sprite.getPosition(), DIR_LEFT));
				//new lime.animation.ScaleTo(1),
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
		}
		console.log(
			'keyCode: ' + e.keyCode +
			', charCode: ' + e.charCode +
			', repeat: ' + e.repeat +
			', target: ' + e.target +
			', native event: ' + e.getBrowserEvent().type);
		console.log(e);
	}
}
