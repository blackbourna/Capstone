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
