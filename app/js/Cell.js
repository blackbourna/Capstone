goog.provide('Cell');
// Namespace in caps b/c it's the only way to make it visually similar to the existing API's use of enums
goog.provide('MOVE');
goog.provide('LOOK');
goog.provide('TURN');

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
