'use strict';

var Level = require('/Users/OPTIMUS/pewpew/game/states/level');

function level_1() {

};

level_1.prototype = Object.create(Level.prototype);  
level_1.prototype.constructor = level_1;

level_1.prototype.create = function() {
	this.map = this.game.add.tilemap('level_1');
	this.map.addTilesetImage('grass');

	this.map.setCollision(26);
	this.map.setCollision(8);

	this.mapBackground = this.map.createLayer('Background');
	this.mapBackground.resizeWorld();

	Level.prototype.create.call(this);
};

module.exports = level_1;