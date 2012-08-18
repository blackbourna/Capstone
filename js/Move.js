// Namespace in caps b/c it's the only way to make it visually similar to the existing API's use of enums
goog.provide('MOVE');

// JS doesn't have enums, so use strings just in case these have to be output for debugging
MOVE = {
	FORWARD: 'MOVE.FORWARD',
	BACKWARD: 'MOVE.BACKWARD'
}
