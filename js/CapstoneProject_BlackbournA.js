//set main namespace
goog.provide('CapstoneProject_BlackbournA');

//get requirements

// my classes
goog.require('Bot');
goog.require('Maze');
goog.require('Constants');

// basics
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.GlossyButton');

//goog.require('lime.Layer');
//goog.require('lime.Label');

// animations
goog.require('lime.animation.Spawn');
goog.require('lime.animation.Sequence');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');
goog.require('lime.animation.RotateBy');

// fill effects
goog.require('lime.fill.LinearGradient');

//events/keyhandlers
goog.require('goog.events');
goog.require('goog.events.KeyCodes');
goog.require('goog.events.KeyHandler');
goog.require('goog.math.Coordinate');

//ajax stuff
goog.require('goog.net.XhrIo');
goog.require('goog.json');

// Game entrypoint
CapstoneProject_BlackbournA.start = function(){
    Point = goog.math.Coordinate;

    var director = new lime.Director(document.body, 100, 100);
    // Need to 
    var scene = new lime.Scene();
    director.replaceScene(scene);
};

//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('CapstoneProject_BlackbournA.start', CapstoneProject_BlackbournA.start);
