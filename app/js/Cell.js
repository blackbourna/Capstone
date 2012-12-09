goog.provide('Cell');
/*
I Andrew Blackbourn, 000129408 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
Source code licensed under 2-clause license ("Simplified BSD License" or "FreeBSD License"). See README.md for details.
*/

/**
 * Contains enum-like variables representing Turn/Look/Move states
 */
// Namespace in caps b/c it's the only way to make it visually similar to the existing API's use of enums
goog.provide('MOVE');
goog.provide('LOOK');
goog.provide('TURN');
/*
I Andrew Blackbourn, 000129408 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
Source code licensed under 2-clause license ("Simplified BSD License" or "FreeBSD License"). See README.md for details.
*/
// Cell states
Cell = {
	OPEN: '-',
	BLOCKED: '#',
	GOAL: '@'
}

// JS doesn't have enums, so use strings just in case these have to be output for debugging
MOVE = {
	FORWARD: 'MOVE.FORWARD',
	BACKWARD: 'MOVE.BACKWARD'
}

LOOK = {
	LEFT: 'LOOK.LEFT',
	AHEAD: 'LOOK.AHEAD',
	RIGHT: 'LOOK.RIGHT'
}

TURN = {
	NONE: 'TURN.NONE',
	LEFT: 'TURN.LEFT',
	RIGHT: 'TURN.RIGHT',
	AROUND: 'TURN.AROUND'
}
