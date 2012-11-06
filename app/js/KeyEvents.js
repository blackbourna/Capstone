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
		var has_energy = true; // whether bot had enough energy to make the move
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
                    if (Globals.easyMode) break;
					has_energy = hasEnergy(Constants.EnergyCosts.LOOK);
					if (has_energy) {
						msg = 'Looked ahead.';
						bot.look(LOOK.AHEAD);
					}
				} else {
					has_energy = hasEnergy(Constants.EnergyCosts.MOVE);
					if (has_energy) {
						msg = 'Moved forward.';
						if (!bot.move(MOVE.FORWARD))
							msg += '.. Blocked!';
					}
				}
			break;
			// Back
			case keyCodes.DOWN:
				has_energy = hasEnergy(Constants.EnergyCosts.MOVE);
				if (has_energy) {
					msg = 'Moved back.';
					if (!bot.move(MOVE.BACKWARD))
						msg += '.. Blocked!';
				}
			break;
			// Turn Right
			case keyCodes.RIGHT:
				if (e.event_.shiftKey) {
                    if (Globals.easyMode) break;
					has_energy = hasEnergy(Constants.EnergyCosts.LOOK);
					if (has_energy) {
						msg = 'Looked right.';
						bot.look(LOOK.RIGHT);
					}
				} else {
					has_energy = hasEnergy(Constants.EnergyCosts.TURN);
					if (has_energy) {
						msg = 'Turned right.';
						bot.turn(TURN.RIGHT);
					}
				}
			break;
			// Turn Left
			case keyCodes.LEFT:
				if (e.event_.shiftKey) {
                    if (Globals.easyMode) break;
					has_energy = hasEnergy(Constants.EnergyCosts.LOOK);
					if (has_energy) {
						msg = 'Looked left.';
						bot.look(LOOK.LEFT);
					}
				} else {
					has_energy = hasEnergy(Constants.EnergyCosts.TURN);
					if (has_energy) {
						msg = 'Turned left.';
						bot.turn(TURN.LEFT);
					}
				}
			break;
			case keyCodes.A: // auto look left
                if (Globals.easyMode) break;
				msg = bot.toggleAutoLookDirection(LOOK.LEFT);
			break;
			case keyCodes.D: // auto look right
                if (Globals.easyMode) break;
				msg = bot.toggleAutoLookDirection(LOOK.RIGHT);
			break;
			case keyCodes.W: // auto look forward
                if (Globals.easyMode) break;
				msg = bot.toggleAutoLookDirection(LOOK.AHEAD);
			break;
			// Camera zoom - this may be about impossible to actually implement with the framework
			case keyCodes.Z:
				msg = "Zoom in.";
				bot.zoom(true);
			break;
			case keyCodes.X:
				msg = "Zoom out.";
				bot.zoom(false);
			break;
			// Sprint forward
			case keyCodes.SPACE:
				has_energy = hasEnergy(Constants.EnergyCosts.SPRINT);
				if (has_energy) {
                    var sprint = bot.sprint();
					msg = 'Sprinted ' + sprint + ' steps ' + (sprint == Constants.Bot.SPRINT_DISTANCE ? '' : ' and hit a wall!');
				}
			break;
			// Rotate
			case keyCodes.CTRL:
				has_energy = hasEnergy(Constants.EnergyCosts.TURN_AROUND);
				if (has_energy) {
					msg = 'Turned 180 degrees.';
					bot.turn(TURN.AROUND);
				}
			break;
			// Scan
			case keyCodes.ENTER:
				has_energy = hasEnergy(Constants.EnergyCosts.ENERGY_SCAN);
				if (has_energy) {
					var scan = bot.scanForRecharger();
					msg = 'Scanned, ' + ((scan >= 0) ? scan + ' cells away' : ' not in range.');
				}
			break;
			case keyCodes.MAC_ENTER:
				has_energy = hasEnergy(Constants.EnergyCosts.ENERGY_SCAN);
				if (has_energy) {
					var scan = bot.scanForRecharger();
					msg = 'Scanned, ' + ((scan >= 0) ? scan + ' cells away' : ' not in range.');
				}
			break;
			// Pick up recharger
			case keyCodes.BACKSLASH:
				has_energy = hasEnergy(Constants.EnergyCosts.ENERGY_PICKUP);
				if (has_energy) {
					msg = 'Try to pick up energy...' + ((bot.pickUpRecharger()) ? ' got it!' : ' not there!');
				}
			break;
			// Look far ahead
			case keyCodes.SLASH:
                if (Globals.easyMode) break;
				has_energy = hasEnergy(Constants.EnergyCosts.LOOK_AHEAD);
				if (has_energy) {
					// labelmulti has a bug where concatenation has to be finessed at times, hence the unusual string concatenation here
					msg = "Looked far ahead" + " "  + bot.lookFarAhead().toString().trim() + " " + ' spaces.';
				}
			break;
			case keyCodes.ESC: // cheater!
				//bot.drawMaze();
			break;
			default:
				has_energy = true;
		}
		if (!has_energy) {
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
