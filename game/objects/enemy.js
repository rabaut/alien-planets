'use strict';

function Enemy(game, x, y, key, frame) {
	Phaser.Sprite.call(this, game, x, y, key, frame);

	this.anchor.setTo(0.5,0.5);
	this.reverse = false;
	this.new = true;
	this.speed = 0;
};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function() {
	if(this.frame == 71) { // Snake
		if(this.new) {
			this.speed = -70;
			this.body.velocity.x = this.speed;
			this.new = false;
		}
	}
	if(this.frame == 67) { // Snail
		if(this.new) {
			this.speed = -30;
			this.body.velocity.x = this.speed;
			this.new = false;
		}
	}
	if(this.reverse) {
		this.reverse = false;
		this.scale.x *= -1;
		this.speed *= -1;
		this.body.velocity.x = this.speed;
	}
};

module.exports = Enemy;