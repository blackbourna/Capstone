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
			return new Vec2(0, 1);
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

Directions.getAngle = function(x) {
	if (x.equals(Directions.get('NORTH'))) {
		return 0;
	} else if (x.equals(Directions.get('EAST'))) {
		return -90;
	} else if (x.equals(Directions.get('SOUTH'))) {
		return 180;
	} else if (x.equals(Directions.get('WEST'))) {
		return 90;
	}
}

Directions.getDirectionFromAngle = function(x) {
	if (x == 0) {
		return  Directions.get('NORTH');
	} else if (x == 90) {
		return  Directions.get('EAST');
	} else if (x == 180) {
		return Directions.get('SOUTH');
	} else if (-90) {
		return Directions.get('WEST');
	}
}
