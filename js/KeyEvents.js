goog.provide('KeyEvents');
goog.require('MOVE');

KeyEvents = function(bot, maze, scene, mazeContainer, background) {
	var bot = bot;
	var maze = maze;
	var scene = scene;
	var mazeContainer = mazeContainer;
	var background = background;

	this.events = function(e) {
		if (Globals.animationPlaying) return;
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
					bot.turn(TURN.RIGHT);
				}
			break;
			// Turn Left
			case keyCodes.LEFT:
				if (e.event_.shiftKey) {
					msg = 'Looked left.';
					bot.look(LOOK.LEFT);
				} else {
					msg = 'Turned left.';
					bot.turn(TURN.LEFT);
				}
			break;
			// Camera zoom - this may be about impossible to actually implement with the framework
			case keyCodes.A:
				console.log("Zoom in.");
				//mazeContainer.runAction(new lime.animation.ScaleTo(mazeContainer.getScale().x * 1.1));
				scaleMaze(1.1);
				//scene.runAction(new lime.animation.MoveTo(bot.sprite.getPosition()));
				//scene.setScale(0.1);
			break;
			case keyCodes.Z:
				console.log("Zoom out.");
				//mazeContainer.runAction(new lime.animation.ScaleTo(mazeContainer.getScale().x / 1.1));
				scaleMaze(0.9);
				//mazeContainer.runAction(new lime.animation.MoveTo(bot.sprite.getPosition()));
			break;
			// Sprint forward
			case keyCodes.SPACE:
				msg = 'Sprinted forward.';
				bot.sprint();
			break;
			// Rotate
			case keyCodes.CTRL:
				msg = 'Turned 180 degrees.';
				bot.turn(TURN.AROUND);
			break;
			// Scan
			case keyCodes.ENTER:
				msg = 'Scanned for energy.';
				bot.scanForRecharger()
			break;
			case keyCodes.MAC_ENTER:
				msg = 'Scanned for energy.';is
				bot.scanForRecharger()
			break;
			// Pick up recharger
			case keyCodes.BACKSLASH:
				msg = 'Attempted to pick up energy...';
				bot.pickUpRecharger();
			break;
			// Look far ahead
			case keyCodes.SLASH:
				msg = 'Looked far ahead.';
				bot.lookFarAhead();
			break;
		}
		maze.drawMaze(mazeContainer, bot, true);
		//console.log(
		//	'keyCode: ' + e.keyCode +
		//	', charCode: ' + e.charCode +
		//	', repeat: ' + e.repeat +
		//	', target: ' + e.target +a
		//	', native event: ' + e.getBrowserEvent().type);
		//console.log(msg);
	}
	
	function scaleMaze(x) {
		var length = mazeContainer.getNumberOfChildren();
		for (var i = 0; i < length; i++) {
			var sprite = mazeContainer.getChildAt(i);
			var scale = new lime.animation.ScaleTo(sprite.getScale().x * x);
			//var moveTo = new lime.animation.MoveTo(sprite.getPosition().x * x, sprite.getPosition().y * x);
			//var spawn = new lime.animation.Spawn(scale);//, moveTo);
			//sprite.runAction(spawn);
			sprite.runAction(scale);
		}
		var scale = new lime.animation.ScaleTo(mazeContainer.getScale().x * x);
		var moveTo = new lime.animation.MoveTo(mazeContainer.getPosition().x * x, mazeContainer.getPosition().y * x);
		var spawn = new lime.animation.Spawn(scale, moveTo);
		mazeContainer.runAction(spawn);
		x = (x == 0.9) ? 1.1 : 0.9;
		scale = new lime.animation.ScaleTo(background.getScale().x * x);
		//background.runAction(scale);
	}
}
