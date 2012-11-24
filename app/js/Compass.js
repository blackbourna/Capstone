goog.provide('Compass');
/*
I Andrew Blackbourn, 000129408 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
Source code licensed under 2-clause license ("Simplified BSD License" or "FreeBSD License"). See README.md for details.
*/
Compass.rotate = function(turn, direction) {
	if (direction.equals(Directions.get('NORTH'))) {
		return Directions.get(turn == TURN.LEFT ? 'WEST' :'EAST');
	} else if (direction.equals(Directions.get('EAST'))) {
		return Directions.get(turn == TURN.LEFT ? 'NORTH' :'SOUTH');
	} else if (direction.equals(Directions.get('SOUTH'))) {
		return Directions.get(turn == TURN.LEFT ? 'EAST' :'WEST');
	} else if (direction.equals(Directions.get('WEST'))) {
		return Directions.get(turn == TURN.LEFT ? 'SOUTH' :'NORTH');
	}
}
