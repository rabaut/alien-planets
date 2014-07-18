'use strict';

function Player(game, hud, x, y) {
	this.game = game;
	this.hud = hud;

	Phaser.Sprite.call(this, game, x, y, 'aliens', 'greenStand.png');
	game.add.existing(this);

	game.camera.follow(this);

	game.physics.arcade.enable(this);
	this.body.fixedRotation = true;
	this.body.collideWorldBounds = true;

	this.anchor.setTo(0.5,0.5);

	this.facing = 'right';
	this.jumpTimer = 0;
	this.jumpCount = 0;
	this.gunTimer = 0;
	this.gunDelay = 300;
	this.rifleTimer = 0;
	this.rifleDelay = 900;
	this.speed = 200;
	this.jumpPower = -450;
	this.jumpDelay = 500;
	this.sprintPower = 400;
	this.sprintDelay = 2000;
	this.sprinting = false;

	this.abilityDelay = 8000;

	this.aliens = ['green', 'blue', 'pink', 'tan'];
	this.alien = 'green';
	this.action = 'Stand';

	for(var alien in this.aliens) {
		var a = this.aliens[alien];
		this.animations.add(a + 'Stand', [a + 'Stand.png'], 10, false, false);
		this.animations.add(a + 'Jump', [a + 'Jump.png'], 10, false, false);
		this.animations.add(a + 'Hurt', [a + 'Hurt.png'], 10, false, false);
		this.animations.add(a + 'Walk', [a + 'Walk1.png', a + 'Walk2.png'], 7, true, false);
	}

	this.animations.add('greenSprint', ['greenWalk1.png', 'greenWalk2.png'], 11, true, false);

	this.heartsMax = {
		'green': 3,
		'blue': 5,
		'pink': 2,
		'tan': 3
	};
	this.hearts = {
		'green': this.heartsMax['green'],
		'blue': this.heartsMax['blue'],
		'pink': this.heartsMax['pink'],
		'tan': this.heartsMax['tan']
	}

	this.hud.updateHearts(this.hearts[this.alien], this.heartsMax[this.alien]);

	this.itemGroup = game.add.group();
	this.addChild(this.itemGroup);
	this.items = {
		'saber': {
			'x': 20,
			'y': 30,
			'angle': 30
		},
		'rifle': {
			'x': 35,
			'y': 50,
			'angle': 0
		},
		'gun': {
			'x': 2,
			'y': 50,
			'angle': 0
		}
	};

	this.controls = {
		jump: Phaser.Keyboard.W,
		ability: Phaser.Keyboard.SPACEBAR,
		attack: Phaser.Keyboard.SHIFT,
		left: Phaser.Keyboard.A,
		right: Phaser.Keyboard.D,
	}
	for(var control in this.controls) {
		var key = this.controls[control];
		this.game.input.keyboard.addKeyCapture(key);
		this.controls[control] = this.game.input.keyboard.addKey(key);
	}

	this.bullets = this.game.add.group();
  this.bullets.enableBody = true;
  this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
  this.bullets.createMultiple(300, 'bullet', 0, false);
  this.bullets.setAll('anchor.x', 0.5);
  this.bullets.setAll('anchor.y', 0.5);
  this.bullets.setAll('outOfBoundsKill', true);
  this.bullets.setAll('checkWorldBounds', true);
};

Player.prototype = Object.create(Phaser.Sprite.prototype);  
Player.prototype.constructor = Player;

Player.prototype.update = function() {
	if(this.body.onFloor() && this.jumpCount >= 2) {
		this.jumpCount = 0;
	}
	if(this.controls.jump.isDown && (this.body.onFloor() || this.jumpCount < 2) &&
			this.game.time.now > this.jumpTimer) {
		this.body.velocity.y = this.jumpPower;
		this.action = 'Jump';
		this.jumpTimer = this.game.time.now + this.jumpDelay;
		this.jumpCount++;
	}
	else if(this.controls.left.isDown) {
		if(this.facing == 'right') {
			this.scale.x *= -1;
			this.facing = 'left';
		}
		if(this.sprinting) {
			return;
		}
		this.body.velocity.x = -this.speed;
		if(this.body.onFloor()) {
			this.action = 'Walk';
		}
	}		
	else if(this.controls.right.isDown) {
		if(this.facing == 'left') {
			this.scale.x *= -1;
			this.facing = 'right';
		}
		if(this.sprinting) {
			return;
		}
		this.body.velocity.x = this.speed;
		if(this.body.onFloor()) {
			this.action = 'Walk';
		}
	} 
	else {
		this.body.velocity.x = 0;
		if(this.body.velocity.y == 0) {
			if(!this.animations.getAnimation(this.alien + 'Hurt').isPlaying) {
				this.action = 'Stand';
			}
		}
	}

	if(this.controls.ability.isDown && this.hud.abilityBarCharged) {
		this.ability();
	}
	if(this.game.input.activePointer.isDown && this.hud.abilityBarCharged) {
		this.ability();
	}

	if(this.controls.attack.isDown) {
		this.attack();
	}

	if(this.sprinting) {
		this.sprintTimer++;
		if(this.game.time.now < this.sprintTimer) {
			this.sprint();
		}
		else {
			this.sprinting = false;
		}
	}
	this.updateAnimations();
};

Player.prototype.updateAnimations = function() {
	this.animations.play(this.alien + this.action);
};

Player.prototype.updateAliens = function(alien) {
	this.alien = alien;
	this.hud.updateHearts(this.hearts[this.alien], this.heartsMax[this.alien]);
	this.itemGroup.removeAll(true);
	if(alien == 'green') {
		this.gunSprite = this.game.add.sprite(this.items.gun.x, this.items.gun.y, 'gun');
		this.gunSprite.anchor.setTo(0,1);
		this.gunSprite.angle = this.items.gun.angle;

		this.itemGroup.addChild(this.gunSprite);
	}
	else if(alien == 'blue') {
		this.saberSprite = this.game.add.sprite(this.items.saber.x, this.items.saber.y, 'saberGreen');
		this.saberSprite.anchor.setTo(.5,1);
		this.saberSprite.angle = this.items.saber.angle;
		this.itemGroup.addChild(this.saberSprite);
	}
	else if(alien == 'tan') {
		this.rifleSprite = this.game.add.sprite(this.items.rifle.x, this.items.rifle.y, 'rifle');
		this.rifleSprite.anchor.setTo(.5,1);
		this.rifleSprite.angle = this.items.rifle.angle;
		this.itemGroup.addChild(this.rifleSprite);
	}
};

Player.prototype.damage = function(damage) {
	this.action = 'Hurt';
	if(damage > this.hearts[this.alien]) {
		this.hearts[this.alien] = 0;
	}
	else if(this.hearts[this.alien] > 0) {
		this.hearts[this.alien] -= damage;
	}
	this.updateAnimations();
	this.hud.updateHearts(this.hearts[this.alien], this.heartsMax[this.alien]);
};

Player.prototype.ability = function() {
	this.hud.drainAbilityBar(this.abilityDelay);
	if(this.alien == 'green') {
		this.sprinting = true;
		this.sprintTimer = this.game.time.now + this.sprintDelay;
	}
	else if(this.alien == 'blue') {
		this.knockback();
	}
	else if(this.alien == 'pink') {
		this.love();
	}
	else if(this.alien == 'tan') {
		this.teleport();
	}
};

Player.prototype.sprint = function() {
	this.action = 'Sprint';
	if(this.facing == 'right') {
		this.body.velocity.x += this.sprintPower;
	}
	else {
		this.body.velocity.x -= this.sprintPower;
	}
};

Player.prototype.knockback = function() {

};

Player.prototype.love = function() {

};

Player.prototype.teleport = function() {
	this.x = this.game.input.activePointer.worldX;
	this.y = this.game.input.activePointer.worldY;
	console.log(this.body.velocity.x);
	console.log(this.body.velocity.y);
};

Player.prototype.attack = function() {
	if(this.alien == 'green') {
		this.shootGun();
	}
	else if(this.alien == 'blue') {
		this.slash();
	}
	else if(this.alien == 'tan') {
		this.shootRifle();
	}
};

Player.prototype.slash = function() {
	this.game.add.tween(this.saberSprite).to({angle: 160}, 200, Phaser.Easing.Cubic.In, true, 0, false, true);
};

Player.prototype.shootGun = function() {
	if(this.game.time.now < this.gunTimer) {
		return;
	}
	this.gunTimer = this.game.time.now + this.gunDelay;
  var bullet = this.bullets.getFirstExists(false);

  if(this.facing == 'right') {
  	bullet.reset(this.gunSprite.world.x + 60, this.gunSprite.world.y - 36);
  	bullet.body.velocity.x = 800;
  }
  else {
  	bullet.reset(this.gunSprite.world.x - 60, this.gunSprite.world.y - 36);
  	bullet.body.velocity.x = -800;
  }

  bullet.body.allowGravity = false;
};

Player.prototype.shootRifle = function() {
	if(this.game.time.now < this.rifleTimer) {
		return;
	}
	this.rifleTimer = this.game.time.now + this.rifleDelay;
  var bullet = this.bullets.getFirstExists(false);
  
  if(this.facing == 'right') {
  	bullet.reset(this.rifleSprite.world.x + 60, this.rifleSprite.world.y - 36);
  	bullet.body.velocity.x = 800;
  }
  else {
  	bullet.reset(this.rifleSprite.world.x - 60, this.rifleSprite.world.y - 36);
  	bullet.body.velocity.x = -800;
  }

  bullet.body.allowGravity = false;
};

module.exports = Player;