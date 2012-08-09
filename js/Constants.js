//set main namespace
goog.provide('Constants');
goog.require('goog.math.Coordinate');

// Define global constants
Constants = {
    IMG_ASSETS: 'assets/sprites/',
    MAZE_ASSETS: 'assets/mazes/',
    SFX_ASSETS: 'assets/sfx/',

    CELL_W: 16,
    CELL_H: 16,

    MAZE_W: 44,
    MAZE_H: 44,

    MAZE_W_PX: this.CELL_W * this.MAZE_W,
    MAZE_H_PX: this.CELL_H * this.MAZE_H,

    DIR_UP: new goog.math.Coordinate(0, -this.CELL_H),
    DIR_DOWN: new goog.math.Coordinate(0, this.CELL_H),
    DIR_LEFT: new goog.math.Coordinate(-this.CELL_W, 0),
    DIR_RIGHT: new goog.math.Coordinate(this.CELL_W, 0),

    APP_W_PX: 1024,
    APP_H_PX: 768,

    TOP_CORNER: new goog.math.Coordinate(this.APP_W_PX - this.MAZE_W_PX - 25, 35)
}