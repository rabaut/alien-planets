'use strict';
var Player = require('/Users/OPTIMUS/pewpew/game/objects/player');
var HUD = require('/Users/OPTIMUS/pewpew/game/objects/hud');

// Base class for each level

function Level() {
};

Level.prototype = {
	create: function() {
		this.settings = {
			gravity: 800
		}

		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.arcade.gravity.y = this.settings.gravity;

		this.game.stage.backgroundColor = '#7ec0ee';

		this.hud = new HUD(this.game);
		this.player = new Player(this.game, this.hud, 100, 1283);
		this.player.updateAliens('green');

		this.switchGreenAlien = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
		this.switchBlueAlien = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO);
		this.switchPinkAlien = this.game.input.keyboard.addKey(Phaser.Keyboard.THREE);
		this.switchTanAlien = this.game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
		this.testingButton = this.game.input.keyboard.addKey(Phaser.Keyboard.T);
	},

	update: function() {
		this.game.physics.arcade.collide(this.player, this.mapBackground);

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
	}
};

module.exports = Level;