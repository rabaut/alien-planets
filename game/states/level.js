'use strict';
var Player = require('/Users/OPTIMUS/alien-planets/game/objects/player');
var HUD = require('/Users/OPTIMUS/alien-planets/game/objects/hud');

// Base class for each level

function Level() {
};

Level.prototype = {
	create: function() {
		this.settings = {
			gravity: 1000
		}

		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.arcade.gravity.y = this.settings.gravity;

		this.game.stage.backgroundColor = '#7ec0ee';

		this.hud = new HUD(this.game);
		this.player = new Player(this.game, this.hud, 80, 3000);
		this.player.updateAliens('green');

		this.enemies = this.game.add.group();
		this.enemies.enableBody = true;

		this.switchGreenAlien = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
		this.switchBlueAlien = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO);
		this.switchPinkAlien = this.game.input.keyboard.addKey(Phaser.Keyboard.THREE);
		this.switchTanAlien = this.game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
		this.testingButton = this.game.input.keyboard.addKey(Phaser.Keyboard.T);
	},

	update: function() {
		this.game.physics.arcade.collide(this.enemies, this.mapBumpers, function(e,b) {
			e.reverse = true;
		});
		this.game.physics.arcade.collide(this.enemies, this.mapCollision);
		this.game.physics.arcade.collide(this.player, this.mapCollision);
		this.game.physics.arcade.collide(this.player, this.enemies, function(player, enemies) {
			if(enemies.body.touching.up) {
				enemies.kill();
			} else {
				player.damage(.5);
			}
			if(player.body.touching.down) {
				player.body.velocity.y = -300;
			}
			if(player.body.touching.left) {
				player.body.velocity.x = 100;
				player.body.velocity.y = -200;
			}
			else if(player.body.touching.right) {
				player.body.velocity.x = -100;
				player.body.velocity.y = -200;
			}
			else if(player.body.touching.up) {
				player.body.velocity.y = 0;
			}
		});

		if(this.player.gameOver) {
			return;
		}
		for(var heart in this.player.hearts) {
			if(this.player.hearts[heart] == 0) {
				this.loser();
			}
		}

		if(this.testingButton.isDown) {
			//Do some random test
			this.player.damage(1);
		}
		if(this.switchGreenAlien.isDown) {
			this.hud.updateAliens('green');
			this.player.updateAliens('green');
		}
		if(this.switchBlueAlien.isDown) {
			this.hud.updateAliens('blue');
			this.player.updateAliens('blue');
		}
		if(this.switchPinkAlien.isDown) {
			this.hud.updateAliens('pink');
			this.player.updateAliens('pink');
		}
		if(this.switchTanAlien.isDown) {
			this.hud.updateAliens('tan');
			this.player.updateAliens('tan');
		}
	},

	loser: function() {
		this.player.gameOver = true;
		var failedText = this.game.add.text(this.game.camera.width/2,this.game.camera.height/2, 'Mission failed', { font: "65px Arial", fill: "#ff0044", align: "center" });
		failedText.anchor.setTo(0.5,0.5);
		failedText.fixedToCamera = true;
		var restartText = this.game.add.text(this.game.camera.width/2,this.game.camera.height/2 + failedText.height, 'Click to restart', { font: "20px Arial", fill: "#000000", align: "center" });
		restartText.anchor.setTo(0.5,0.5);
		restartText.fixedToCamera = true;
		this.input.onDown.addOnce(function() {this.game.state.restart();}, this);
	},

	winner: function() {

	}
};

module.exports = Level;