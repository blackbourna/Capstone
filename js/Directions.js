goog.provide('Directions');

Directions.get = function(x) {
	switch (x.toUpperCase()) {
		case 'NORTH':
			return new Vec2(0, -1);
		break;
		case 'EAST':
			return new Vec2(1, 0);
		break;
		case 'SOUTH':
			return new Vec2(1, 0);
		break;
		case 'WEST':
			return new Vec2(-1, 0);
		break;
	}
}

Directions.getName = function(x) {
	if (x.equals(Directions.get('NORTH'))) {
		return 'NORTH';
	} else if (x.equals(Directions.get('EAST'))) {
		return 'EAST';
	} else if (x.equals(Directions.get('SOUTH'))) {
		return 'SOUTH';
	} else if (x.equals(Directions.get('WEST'))) {
		return 'WEST';
	}
}
