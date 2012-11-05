goog.provide('KeyEventsAlternative');
goog.require('MOVE');

KeyEventsAlternative = function(bot, maze) {
	var bot = bot;
	var maze = maze;

	var hasEnergy = function(cost) {
		var hasEnergy = bot.getEnergy() >= cost;
		return hasEnergy;
    }

	var getTurnInfo = function(direction, endDir) {	
		var ct = 0;
		endDir = Directions.get(endDir);
		while (!direction.equals(endDir)) {
			direction = Compass.rotate(TURN.RIGHT, direction);
			++ct;
		}
		console.log('past loop');
		if (ct < 3)
			return { turn: TURN.RIGHT, numTurns: ct };
		else
			return { turn: TURN.LEFT, numTurns: 1 };
	}

	// makes calls to bot turn functions based on getTurnInfoInfo
	var doTurn = function(turnInfo) {
		var result = {success: null, msg: ""}
		for (var x = 0; x < turnInfo.numTurns; x++) {
			result.success = hasEnergy(Constants.EnergyCosts.TURN);
			if (result.success) {
				result.msg += 'Turned ' + turnInfo.turn.substring(5).toLowerCase() + "\n";
				bot.turn(turnInfo.turn);
			}
		}
		result.msg = result.msg.trim();
		return result;
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
                    if (Globals.easyMode) break;
					success = hasEnergy(Constants.EnergyCosts.LOOK);
					if (success) {
						msg = 'Looked ahead.';
						bot.look(LOOK.AHEAD);
					}
				} else {
                    if (bot.getDirection().equals(Directions.get('NORTH'))) {
                        success = hasEnergy(Constants.EnergyCosts.MOVE);
                        if (success) {
                            msg = 'Moved forward.';
                            if (!bot.move(MOVE.FORWARD))
                                msg += '.. Blocked!';
                        }
                    } else {
						var turnInfo = getTurnInfo(bot.getDirection(), 'NORTH');
						var result = doTurn(turnInfo);
						msg += result.msg;
						success = result.success;
                    }
				}
			break;
			// Back
			case keyCodes.DOWN:
                    if (bot.getDirection().equals(Directions.get('SOUTH'))) {
                        success = hasEnergy(Constants.EnergyCosts.MOVE);
                        if (success) {
                            msg = 'Moved forward.';
                            if (!bot.move(MOVE.FORWARD))
                                msg += '.. Blocked!';
                        }
                    } else {
						var turnInfo = getTurnInfo(bot.getDirection(), 'SOUTH');
						var result = doTurn(turnInfo);
						msg += result.msg;
						success = result.success;
                    }
			break;
			// Turn Right
			case keyCodes.RIGHT:
				if (e.event_.shiftKey) {
                    if (Globals.easyMode) break;
					success = hasEnergy(Constants.EnergyCosts.LOOK);
					if (success) {
						msg = 'Looked right.';
						bot.look(LOOK.RIGHT);
					}
				} else {
                    if (bot.getDirection().equals(Directions.get('EAST'))) {
                        success = hasEnergy(Constants.EnergyCosts.MOVE);
                        if (success) {
                            msg = 'Moved forward.';
                            if (!bot.move(MOVE.FORWARD))
                                msg += '.. Blocked!';
                        }
                    } else {
						var turnInfo = getTurnInfo(bot.getDirection(), 'EAST');
						var result = doTurn(turnInfo);
						msg += result.msg;
						success = result.success;
                    }
				}
			break;
			// Turn Left
			case keyCodes.LEFT:
				if (e.event_.shiftKey) {
                    if (Globals.easyMode) break;
					success = hasEnergy(Constants.EnergyCosts.LOOK);
					if (success) {
						msg = 'Looked left.';
						bot.look(LOOK.LEFT);
					}
				} else {
                    if (bot.getDirection().equals(Directions.get('WEST'))) {
                        success = hasEnergy(Constants.EnergyCosts.MOVE);
                        if (success) {
                            msg = 'Moved forward.';
                            if (!bot.move(MOVE.FORWARD))
                                msg += '.. Blocked!';
                        }
                    } else {
						var turnInfo = getTurnInfo(bot.getDirection(), 'WEST');
						var result = doTurn(turnInfo);
						msg += result.msg;
						success = result.success;
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
				success = hasEnergy(Constants.EnergyCosts.SPRINT);
				if (success) {
                    var sprint = bot.sprint();
					msg = 'Sprinted forward ' + sprint + ' steps ' + (sprint == Constants.bot.SPRINT_DISTANCE ? '' : ' but hit wall!');
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
				if (hasEnergy(Constants.EnergyCosts.ENERGY_SCAN)) {
					var scan = bot.scanForRecharger();
					msg = 'Scanned, ' + ((scan >= 0) ? scan + ' cells away' : ' not in range.');
				}
			break;
			case keyCodes.MAC_ENTER:
				if (hasEnergy(Constants.EnergyCosts.ENERGY_SCAN)) {
					var scan = bot.scanForRecharger();
					msg = 'Scanned, ' + ((scan >= 0) ? scan + ' cells away' : ' not in range.');
				}
			break;
			// Pick up recharger
			case keyCodes.BACKSLASH:
				if (hasEnergy(Constants.EnergyCosts.ENERGY_PICKUP)) {
					msg = 'Try to pick up energy...' + ((bot.pickUpRecharger()) ? ' got it!' : ' not there!');
				}
			break;
			// Look far ahead
			case keyCodes.SLASH:
                if (Globals.easyMode) break;
				success = hasEnergy(Constants.EnergyCosts.LOOK_AHEAD);
				if (success) {
					msg = 'Looked far ahead. ' + bot.lookFarAhead() + ' open spaces.';
				}
			break;
			case keyCodes.ESC: // cheater!
				//bot.drawMaze();
			break;
			default:
				success = true;
		}
		if (!success) {
			msg = 'Not enough energy!';
		}
		//console.log(msg);
		if (msg.length > 0) {
			var oldTxt = Globals.logLabel.getText();
			Globals.logLabel.setText(oldTxt + "\n" + msg);
			if (Globals.logLabel.getSize().height > Globals.logContainer.getSize().height) {
				console.log(Globals.logLabel.getSize().height);
				console.log(Globals.logContainer.getSize().height);
				var msgs = Globals.logLabel.getText();
				msgs = msgs.split('\n');
				
				// remove X number of messages from beggining of console
				// http://stackoverflow.com/questions/7481099/regex-match-newline-in-textarea
				var noMsgsToSplice = msg.split(/[\n\r]/g).length;
				msgs = msgs.slice(noMsgsToSplice);
				Globals.logLabel.setText(msgs.join('\n'));
			}
		}
	}
	
	function scaleMaze(x) {

	}
}
