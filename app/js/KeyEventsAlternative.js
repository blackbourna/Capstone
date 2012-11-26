goog.provide('KeyEventsAlternative');
goog.require('MOVE');
/*
I Andrew Blackbourn, 000129408 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
Source code licensed under 2-clause license ("Simplified BSD License" or "FreeBSD License"). See README.md for details.
*/
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
		if (ct == 2)
			return { turn: TURN.AROUND, numTurns: 1 };
		else if (ct < 3)
			return { turn: TURN.RIGHT, numTurns: ct };
		else
			return { turn: TURN.LEFT, numTurns: 1 };
	}

	// makes calls to bot turn functions based on getTurnInfoInfo
	var doTurn = function(turnInfo) {
		var result = {has_energy: null, msg: ""}
		for (var x = 0; x < turnInfo.numTurns; x++) {
			result.has_energy = hasEnergy(Constants.EnergyCosts.TURN);
			if (result.has_energy) {
				result.msg += 'Turned ' + turnInfo.turn.substring(5).toLowerCase() + "\n";
				lime.scheduleManager.callAfter(function() {
					bot.turn(turnInfo.turn);
				}, this, Constants.Bot.ANIMATION_SPEED * 1000 * x + 10);
			}
		}
		return result;
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
                    if (bot.getDirection().equals(Directions.get('NORTH'))) {
                        has_energy = hasEnergy(Constants.EnergyCosts.MOVE);
                        if (has_energy) {
                            msg = 'Moved forward.';
                            if (!bot.move(MOVE.FORWARD))
                                msg += '.. Blocked!';
                        }
                    } else {
						var turnInfo = getTurnInfo(bot.getDirection(), 'NORTH');
						var result = doTurn(turnInfo);
						msg += result.msg;
						has_energy = result.has_energy;
                    }
				}
			break;
			// Back
			case keyCodes.DOWN:
                    if (bot.getDirection().equals(Directions.get('SOUTH'))) {
                        has_energy = hasEnergy(Constants.EnergyCosts.MOVE);
                        if (has_energy) {
                            msg = 'Moved forward.';
                            if (!bot.move(MOVE.FORWARD))
                                msg += '.. Blocked!';
                        }
                    } else {
						var turnInfo = getTurnInfo(bot.getDirection(), 'SOUTH');
						var result = doTurn(turnInfo);
						msg += result.msg;
						has_energy = result.has_energy;
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
                    if (bot.getDirection().equals(Directions.get('EAST'))) {
                        has_energy = hasEnergy(Constants.EnergyCosts.MOVE);
                        if (has_energy) {
                            msg = 'Moved forward.';
                            if (!bot.move(MOVE.FORWARD))
                                msg += '.. Blocked!';
                        }
                    } else {
						var turnInfo = getTurnInfo(bot.getDirection(), 'EAST');
						var result = doTurn(turnInfo);
						msg += result.msg;
						has_energy = result.has_energy;
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
                    if (bot.getDirection().equals(Directions.get('WEST'))) {
                        has_energy = hasEnergy(Constants.EnergyCosts.MOVE);
                        if (has_energy) {
                            msg = 'Moved forward.';
                            if (!bot.move(MOVE.FORWARD))
                                msg += '.. Blocked!';
                        }
                    } else {
						var turnInfo = getTurnInfo(bot.getDirection(), 'WEST');
						var result = doTurn(turnInfo);
						msg += result.msg;
						has_energy = result.has_energy;
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
			case keyCodes.ESC: // cheats/debug
                if (Globals.debug)
                    bot.drawMaze();
			break;
			case keyCodes.H: // HELP
				bot.showHelp();
			break;
			case keyCodes.F2: // debugging
				if (!Globals.Debug.debug) break;
				if (e.event_.shiftKey) {
					bot.suicide();
				}
			break;
			default:
				has_energy = true;
		}
		if (!has_energy) {
			msg = 'Not enough energy!';
		}
		//console.log(msg);
		if (msg.length > 0) {
			var oldTxt = Globals.logLabel.getText();
			msg = msg.trim();
			Globals.logLabel.setText(oldTxt.trim() + "\n" + msg);
			if (Globals.logLabel.getSize().height > Globals.logContainer.getSize().height) {
				//console.log(Globals.logLabel.getSize().height);
				//console.log(Globals.logContainer.getSize().height);
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
