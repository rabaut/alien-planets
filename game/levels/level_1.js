'use strict';

var Level = require('/Users/OPTIMUS/alien-planets/game/states/level');

function level_1() {

};

level_1.prototype = Object.create(Level.prototype);  
level_1.prototype.constructor = level_1;

level_1.prototype.create = function() {
	this.map = this.game.add.tilemap('level_1');
	this.map.addTilesetImage('grass');
	this.map.addTilesetImage('special');
	this.map.addTilesetImage('building');

	this.map.setCollisionBetween(0,500);

	this.mapCollision = this.map.createLayer('Collision');
	this.mapCollision.resizeWorld();

	Level.prototype.create.call(this);

	this.map.createFromObjects('Enemies', 426, 'enemies', 'snakeSlime.png', true, false, this.enemies);
	this.map.createFromObjects('Enemies', 417, 'enemies', 'snake.png', true, false, this.enemies);
};

module.exports = level_1;