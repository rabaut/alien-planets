'use strict';

function HUD(game) {
	Phaser.Group.call(this, game);
	this.game = game;

	this.fixedToCamera = true;

	this.abilityBarBackground = this.game.add.image(600, 5, 'abilityBarBackground');
	this.abilityBar = this.game.add.sprite(600, 5, 'abilityBar');
	this.abilityBarWidth = this.abilityBar.width;
	this.abilityBarCharged = true;
	this.abilityTweenDrain = this.game.add.tween(this.abilityBar).to({ width: 0 }, 500, Phaser.Easing.Linear.None);
	this.abilityTweenDrain.onComplete.add(function() {this.abilityBar.tint = 0xF5335D;}, this);
	this.abilityBar.alpha = 0;
	this.abilityBarBackground.alpha = 0;

	this.add(this.abilityBar);
	this.add(this.abilityBarBackground);

	this.hearts = game.add.group();
	this.add(this.hearts);

	this.aliens = game.add.group();
	this.aliens.x = this.game.width/2;
	this.aliens.y = 5;
	this.add(this.aliens);

	this.alien = 'green';

	this.badges = {
		'green': this.aliens.create(-90, 0, 'hud', 'hud_green.png'),
		'blue': this.aliens.create(-30, 0, 'hud', 'hud_blueAlt.png'),
		'pink': this.aliens.create(30, 0, 'hud', 'hud_pinkAlt.png'),
		'tan': this.aliens.create(90, 0, 'hud', 'hud_tanAlt.png')
	};

	this.badges['blue'].tint = 0x303030;
	this.badges['pink'].tint = 0x303030;
	this.badges['tan'].tint = 0x303030;
};

HUD.prototype = Object.create(Phaser.Group.prototype);  
HUD.prototype.constructor = HUD;

HUD.prototype.updateHearts = function(hearts, maxHearts) {
	this.hearts.removeAll(true);
	var halfHeart = (hearts % 1 != 0);
	var heartPos = 10;
	for(var i=0; i < Math.floor(hearts); i++) {
		this.hearts.add(this.game.add.image(heartPos, 10, 'hud', 'hud_heartFull.png'));
		heartPos += 55;
	}
	if(halfHeart) {
		this.hearts.add(this.game.add.image(heartPos, 10, 'hud', 'hud_heartHalf.png'));
		heartPos += 55;
	}
	var emptyHearts = Math.floor(maxHearts - hearts);
	if(emptyHearts > 0) {
		for(var i=0; i < emptyHearts; i++) {
			this.hearts.add(this.game.add.image(heartPos, 10, 'hud', 'hud_heartEmpty.png'));
			heartPos += 55;
		}
	}
	if(hearts < maxHearts/2) {
		this.badges[this.alien].tint = '0xF5335D';
	}
};

HUD.prototype.drainAbilityBar = function(delay) {
	this.abilityBarCharged = false;
	var tint = this.abilityBar.tint;
	var tweenRegen = this.game.add.tween(this.abilityBar).to({ width: this.abilityBarWidth }, delay, Phaser.Easing.Linear.None);
	this.abilityTweenDrain.chain(tweenRegen);
	tweenRegen.onComplete.add(function() { this.abilityBar.tint = tint;this.abilityBarCharged = true }, this);
	this.abilityTweenDrain.start();
	this.game.tweens.remove(tweenRegen);
};

HUD.prototype.updateAliens = function(newAlien, unlocking) {
	if(newAlien == this.alien) {
		return;
	}
	if(newAlien != 'green') {
		this.abilityBar.alpha = 1;
		this.abilityBarBackground.alpha = 1;
	}
	this.badges[newAlien].frameName = 'hud_' + newAlien + '.png';
	this.badges[this.alien].frameName = 'hud_' + this.alien + 'Alt.png';
	this.alien = newAlien;
};

HUD.prototype.unlockAlien = function(alien) {
	this.badges[alien].tint = 0xFFFFFF;
};

module.exports = HUD;
