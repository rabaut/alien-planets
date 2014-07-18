'use strict';

function Preloader() {
};

Preloader.prototype = {
	preload: function() {
		this.load.onLoadComplete.addOnce(function() {this.state.start('menu')}, this);
		this.preloadBar = this.add.sprite(this.game.width/2,this.game.height/2, 'preloaderBar');
		this.preloadBar.anchor.setTo(0.5,0.5);
		this.load.setPreloadSprite(this.preloadBar);

		this.load.image('menu', 'assets/images/menu.png');
		this.load.image('abilityBar', 'assets/images/abilityBar.png');
		this.load.image('abilityBarBackground', 'assets/images/abilityBarBackground.png');
		this.load.image('saberGreen', 'assets/images/saberGreen.png');
		this.load.image('gun', 'assets/images/gun.png');
		this.load.image('rifle', 'assets/images/rifle.png');
		this.load.image('bullet', 'assets/images/bullet.png');
		this.load.spritesheet('grass', 'assets/images/grass.png', 70, 70);
		this.load.atlasXML('aliens', 'assets/images/aliens.png', 'assets/images/aliens.xml');
		this.load.atlasXML('hud', 'assets/images/hud.png', 'assets/images/hud.xml');
		this.load.tilemap('level_1', 'assets/maps/1.json', null, Phaser.Tilemap.TILED_JSON);
	}
};

module.exports = Preloader;