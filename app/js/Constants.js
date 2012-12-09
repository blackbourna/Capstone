//set main namespace
goog.provide('Constants');
/*
I Andrew Blackbourn, 000129408 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
Source code licensed under 2-clause license ("Simplified BSD License" or "FreeBSD License"). See README.md for details.
*/

/**
 * Various Constants used for Graphics, Game Speed, Maze Dimensions, etc.
 */
// math imports
goog.require('goog.math.Coordinate');
goog.require('goog.math.Vec2');

// less typing for common classes/functions
Point = goog.math.Coordinate;
Vec2 = goog.math.Vec2;

// required to create a global Constants container

Constants.Maze = {
    MAZE_DIMENSIONS: new Point(44, 44)
}

Constants.Graphics = {
    APP_DIMENSIONS: new Point(1024, 768),
    TOP_CORNER: new Point(250, 35),
	
	// cell size in px
	CELL_DIMENSIONS: new Point(16, 16), // use this to replace CELL_DIMENSIONS.x
    
    MAZE_DIMENSIONS: new Point(16*44 , 16*44) // use this to replace MAZE_DIMENSIONS.x
}

Constants.Bot = {
    SPRINT_DISTANCE: 5,
    ANIMATION_SPEED: 150/1000
}

Constants.EnergyCosts = {
	START_ENERGY: 10000,
	MOVE: 6,
	MOVE_BLOCKED: 12,
	TURN: 4,
	TURN_AROUND: 7,
	LOOK: 2,
	LOOK_AHEAD: 5,
	SPRINT: 15,
	SPRINT_BLOCKED: 60,
	ENERGY_SCAN: 3,
	ENERGY_PICKUP: 10,
	ENERGY_GAINED: 1000
}

Constants.Assets = {
    IMAGE_PATH: 'assets/sprites/',
    MAZE_PATH: 'assets/mazes/',
    AUDIO_PATH: 'assets/audio/'
}
