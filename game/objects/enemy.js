'use strict';

function Enemy(game, x, y, key, frame) {
	Phaser.Sprite.call(this, game, x, y, key, frame);

	this.anchor.setTo(0.5,0.5);
	this.reverse = false;
	this.new = true;
	this.speed = 0;
	this.enemyType = 'Horizontal';
	this.jumpPower = 700; 
	this.jumpTimer = 0;
	this.jumpDelay = 500;
	this.strength = .5;
	this.lol = '';
};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function() {
	if(this.lol == 'testing') {
		console.log('hmmm');
	}
	if(this.initialDirection == 'right') {
		this.scale.x *= -1;
		this.speed *= -1;
	}
	if(this.frame == 71) { // Snake
		if(this.new) {
			this.speed = -70;
			this.body.velocity.x = this.speed;
			this.new = false;
			this.enemyType = 'Horizontal';
		}
	}
	else if(this.frame == 67) { // Snail
		if(this.new) {
			this.speed = -30;
			this.body.velocity.x = this.speed;
			this.new = false;
			this.enemyType = 'Horizontal';
		}
	}
	else if(this.frame == 33) { //Grass Block 
		this.width = 70;
		if(this.new) {
			this.new = false;
			this.enemyType = 'Jumper';
		}
	}

	if(this.reverse && (this.enemyType == 'Horizontal')) {
		this.reverse = false;
		this.scale.x *= -1;
		this.speed *= -1;
		this.body.velocity.x = this.speed;
	}

	if((this.enemyType === 'Jumper') && (this.game.time.now > this.jumpTimer) && this.body.onFloor()) {
		this.jumpTimer = this.game.time.now + this.jumpDelay;
		this.body.velocity.y = -this.jumpPower;
	}
};

module.exports = Enemy;