'use strict';

var boot = require('./states/boot');
var preloader = require('./states/preloader');
var menu = require('./states/menu');
var level_1 = require('./levels/level_1');

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'Pewpew');

game.state.add('boot', boot);
game.state.add('preloader', preloader);
game.state.add('menu', menu);
game.state.add('level_1', level_1);

game.state.start('boot');

