//set main namespace
goog.provide('CapstoneProject_BlackbournA');
/*
I Andrew Blackbourn, 000129408 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
Source code licensed under 2-clause license ("Simplified BSD License" or "FreeBSD License"). See README.md for details.
*/

/**
 * Initial application insertion point, used to load the Main Menu at startup
 */
//get requirements

// my classes
goog.require('GameMenu');
goog.require('Bot');
goog.require('Cell');
goog.require('Maze');
goog.require('Constants');
goog.require('HighScoreScene');
goog.require('HighScoreInputScene');
goog.require('HelpScene');

// basics
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.GlossyButton');
goog.require('lime.Label');
goog.require('lime.LabelMulti');
goog.require('lime.Circle');
// probably will use this for zooming
//goog.require('lime.Layer');

// animations
goog.require('lime.animation.Spawn');
goog.require('lime.animation.Sequence');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');
goog.require('lime.animation.MoveBy');
goog.require('lime.animation.RotateBy');
goog.require('lime.animation.RotateTo');

// fill effects
goog.require('lime.fill.LinearGradient');
goog.require('lime.Sprite');
// transitions
goog.require('lime.transitions.Dissolve');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.Delay');

// audio

goog.require('lime.audio.Audio');

//events/keyhandlers
goog.require('goog.events');
goog.require('goog.events.KeyCodes');
goog.require('goog.events.KeyHandler');

//ajax stuff
goog.require('goog.net.XhrIo');
goog.require('goog.json');

// Game entrypoint
CapstoneProject_BlackbournA.start = function(){
    var director = new lime.Director(document.body, Constants.Graphics.APP_DIMENSIONS.x, Constants.Graphics.APP_DIMENSIONS.y);
    director.setDisplayFPS(false);
    Globals.transition = lime.transitions.Dissolve;
    director.replaceScene(new GameMenu(director).showMenu(), Globals.transition);
};

//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('CapstoneProject_BlackbournA.start', CapstoneProject_BlackbournA.start);
