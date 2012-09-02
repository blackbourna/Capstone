//set main namespace
goog.provide('Constants');

// math imports
goog.require('goog.math.Coordinate');
goog.require('goog.math.Vec2');

// less typing for common classes/functions
Point = goog.math.Coordinate;
Vec2 = goog.math.Vec2;

// required to create a global Constants container

Constants.Maze = {
	// todo: fix this, don't use a constant, get the value from Ajax
    MAZE_W: 44,
    MAZE_H: 44,
    MAZE_DIMENSIONS: new Point(44, 44)
}

Constants.Graphics = {
    APP_DIMENSIONS: new Point(1024, 768),
    APP_W_PX: 1024,
    APP_H_PX: 768,
    TOP_CORNER: new Point(250, 35),
	
	// cell size in px
	CELL_DIMENSIONS: new Point(16, 16), // use this to replace cell_w
	
	CELL_W: 16,
    CELL_H: 16,
    
    MAZE_DIMENSIONS: new Point(16*44 , 16*44), // use this to replace MAZE_W_PX
    
    MAZE_W_PX: 16*44,
    MAZE_H_PX: 16*44
    
}

Constants.EnergyCosts = {
	START_ENERGY: 100,
	MOVE: 6,
	MOVE_BLOCKED: 12,
	TURN: 4,
	TURN_AROUND: 7,
	LOOK: 2,
	LOOK_AHEAD: 5,
	SPRINT: 15,
	SPRINT_BLOCKED: 60,
	ENERGY_SCAN: 3,
	ENERGY_PICKUP: 10
}

Constants.Assets = {
    IMAGE_PATH: 'assets/sprites/',
    MAZE_PATH: 'assets/mazes/',
    AUDIO_PATH: 'assets/audio/'
}
