'use strict';

var Level = require('/Users/OPTIMUS/alien-planets/game/states/level');
var Enemy = require('/Users/OPTIMUS/alien-planets/game/objects/enemy');

function level_1() {

};

level_1.prototype = Object.create(Level.prototype);  
level_1.prototype.constructor = level_1;

level_1.prototype.create = function() {
	this.map = this.game.add.tilemap('level_1');
	this.map.addTilesetImage('grass');
	this.map.addTilesetImage('special');
	this.map.addTilesetImage('building');

	this.mapCollision = this.map.createLayer('Collision');
	this.mapCollision.resizeWorld();

	this.map.setCollisionBetween(0,500,true,'Collision');

	this.mapBumpers = this.map.createLayer('Bumpers');
	this.map.setCollisionBetween(0,500,true,'Bumpers');
	this.game.physics.arcade.enable(this.mapBumpers);

	this.mapBumpers.alpha = 0;

	Level.prototype.create.call(this);

	this.map.createFromObjects('Enemies', 413, 'enemies', 'snail.png', true, false, this.enemies, Enemy);
	this.map.createFromObjects('Enemies', 417, 'enemies', 'snake.png', true, false, this.enemies, Enemy);
	this.enemies.setAll('body.collideWorldBounds', true);
};

module.exports = level_1;