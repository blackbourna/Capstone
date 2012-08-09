goog.provide('Bot');

Bot = function (position, direction) {
    var self = this;
    this.position = position;
    console.log(this);
    this.direction = direction;
	this.goForward = function() {}
	this.goBack = function() {}
	this.goRight = function() {}
	this.goLeft = function() {}
	
	this.lookForward = function() {}
	this.lookBack = function() {}
	this.lookRight = function() {}
	this.lookLeft = function() {}
	
	this.lookFar = function() {}
	
	this.sprint = function() {}
	this.oneEighty = function() {}
	
	this.scan = function() {}
	this.pickUp = function() {}
    
    this.sprite = new lime.Sprite().setFill(IMG_ASSETS + 'bot.png').setAnchorPoint(0, 0);
    
    this.getScreenPosition = function() {
        var coord = new goog.math.Coordinate(TOP_CORNER.x + this.position.x, TOP_CORNER.y + this.position.y);
        return coord;
    }
    this.sprite.setPosition(this.getScreenPosition());
}