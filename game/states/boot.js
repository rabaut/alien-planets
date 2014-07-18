'use strict';

function Boot() {
};

Boot.prototype = {
	preload: function() {
		this.load.image('preloaderBar', 'assets/images/preloaderBar.png');
	},

	create: function() {
    this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    this.scale.minWidth = 480;
    this.scale.minHeight = 250;
    this.scale.maxWidth = 1366;
    this.scale.maxHeight = 768;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.forceOrientation(true);
    this.scale.setScreenSize(true);
		this.state.start('preloader');
	}
};

module.exports = Boot;