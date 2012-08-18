//set main namespace
goog.provide('CapstoneProject_BlackbournA');

//get requirements

// my classes
goog.require('GameMenu');
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

//events/keyhandlers
goog.require('goog.events');
goog.require('goog.events.KeyCodes');
goog.require('goog.events.KeyHandler');

//ajax stuff
goog.require('goog.net.XhrIo');
goog.require('goog.json');

// Game entrypoint
CapstoneProject_BlackbournA.start = function(){
    var director = new lime.Director(document.body, Constants.Graphics.APP_W_PX, Constants.Graphics.APP_H_PX);
    new GameMenu(director).showMenu();
};

//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('CapstoneProject_BlackbournA.start', CapstoneProject_BlackbournA.start);
