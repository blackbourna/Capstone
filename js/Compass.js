goog.provide('Compass');

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
