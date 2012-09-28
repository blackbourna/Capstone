goog.provide('KeyEvents');
goog.require('MOVE');

KeyEvents = function(bot, maze) {
	var bot = bot;
	var maze = maze;

	var hasEnergy = function(cost) {
		var hasEnergy = bot.getEnergy() >= cost;
		return hasEnergy;
    }

	this.events = function(e) {
		if (Globals.animationPlaying) return;
		var success = true; // whether bot had enough energy to make the move
		var sum = goog.math.Coordinate.sum; // for lazy typists
		var keyCodes = goog.events.KeyCodes;
		
		var msg = ''; // the message to be output to the onscreen bot log
		var keyCode = e.keyCode; // the keycode that fired the event
		
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
					success = hasEnergy(Constants.EnergyCosts.LOOK);
					if (success) {
						msg = 'Looked ahead.';
						bot.look(LOOK.AHEAD);
					}
				} else {
					success = hasEnergy(Constants.EnergyCosts.MOVE);
					if (success) {
						msg = 'Moved forward.';
						if (!bot.move(MOVE.FORWARD))
							msg += '.. Blocked!';
					}
				}
			break;
			// Back
			case keyCodes.DOWN:
				success = hasEnergy(Constants.EnergyCosts.MOVE);
				if (success) {
					msg = 'Moved back.';
					if (!bot.move(MOVE.BACKWARD))
						msg += '.. Blocked!';
				}
			break;
			// Turn Right
			case keyCodes.RIGHT:
				if (e.event_.shiftKey) {
					success = hasEnergy(Constants.EnergyCosts.LOOK);
					if (success) {
						msg = 'Looked right.';
						bot.look(LOOK.RIGHT);
					}
				} else {
					success = hasEnergy(Constants.EnergyCosts.TURN);
					if (success) {
						msg = 'Turned right.';
						bot.turn(TURN.RIGHT);
					}
				}
			break;
			// Turn Left
			case keyCodes.LEFT:
				if (e.event_.shiftKey) {
					success = hasEnergy(Constants.EnergyCosts.LOOK);
					if (success) {
						msg = 'Looked left.';
						bot.look(LOOK.LEFT);
					}
				} else {
					success = hasEnergy(Constants.EnergyCosts.TURN);
					if (success) {
						msg = 'Turned left.';
						bot.turn(TURN.LEFT);
					}
				}
			break;
			// Camera zoom - this may be about impossible to actually implement with the framework
			case keyCodes.A:
				msg = "Zoom in.";
				bot.zoom(true);
			break;
			case keyCodes.Z:
				msg = "Zoom out.";
				bot.zoom(false);
			break;
			// Sprint forward
			case keyCodes.SPACE:
				success = hasEnergy(Constants.EnergyCosts.SPRINT);
				if (success) {
					msg = 'Sprinted forward.';
					bot.sprint();
				}
			break;
			// Rotate
			case keyCodes.CTRL:
				if (hasEnergy(Constants.EnergyCosts.TURN_AROUND)) {
					msg = 'Turned 180 degrees.';
					bot.turn(TURN.AROUND);
				}
			break;
			// Scan
			case keyCodes.ENTER:
				msg = 'Scanned for energy.';
				bot.scanForRecharger()
			break;
			case keyCodes.MAC_ENTER:
				msg = 'Scanned for energy.';
				bot.scanForRecharger()
			break;
			// Pick up recharger
			case keyCodes.BACKSLASH:
				msg = 'Attempted to pick up energy...';
				bot.pickUpRecharger();
			break;
			// Look far ahead
			case keyCodes.SLASH:
				success = hasEnergy(Constants.EnergyCosts.LOOK_AHEAD);
				if (success) {
					msg = 'Looked far ahead.';
					bot.lookFarAhead();
				}
			break;
			case keyCodes.ESC: // cheater!
				bot.drawMaze();
			break;
			default:
				success = true;
		}
		if (!success) {
			msg = 'Not enough energy!';
		}
		console.log(msg);
		if (msg.length > 0) {
			var oldTxt = Globals.logLabel.getText();
			Globals.logLabel.setText(oldTxt + "\n" + msg);
			if (Globals.logLabel.getSize().height > Globals.logContainer.getSize().height) {
				console.log(Globals.logLabel.getSize().height);
				console.log(Globals.logContainer.getSize().height);
				var msgs = Globals.logLabel.getText();
				msgs = msgs.split('\n');
				msgs = msgs.slice(1);
				Globals.logLabel.setText(msgs.join('\n'));
			}
		}
		//console.log(
		//	'keyCode: ' + e.keyCode +
		//	', charCode: ' + e.charCode +
		//	', repeat: ' + e.repeat +
		//	', target: ' + e.target +a
		//	', native event: ' + e.getBrowserEvent().type);
		//console.log(msg);
	}
	
	function scaleMaze(x) {

	}
}
