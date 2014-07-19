'use strict';

function Enemy(game, x, y, key, frame) {
	Phaser.Sprite.call(this, game, x, y, key, frame);
};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function() {

};

module.exports = Enemy;