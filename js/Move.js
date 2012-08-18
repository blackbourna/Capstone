goog.provide('BotEnums');
// JS doesn't have enums, so use strings just in case these have to be output for debugging
MOVE = {
	FORWARD: 'MOVE.FORWARD',
	BACKWARD: 'MOVE.BACKWARD'
}
TURN = {
	NONE: 'TURN.NONE',
	LEFT: 'TURN.LEFT',
	RIGHT: 'TURN.RIGHT',
	AROUND: 'TURN.AROUND'
}
LOOK = {
	LEFT: 'LOOK.LEFT',
	AHEAD: 'LOOK.AHEAD',
	RIGHT: 'LOOK.RIGHT'
}
