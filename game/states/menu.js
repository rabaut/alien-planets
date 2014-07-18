'use strict';

function Menu() {
};

Menu.prototype = {
	create: function() {
		this.stage.backgroundColor = '#ffffff';
		this.menuImage = this.add.image(this.game.width/2,this.game.height/2, 'menu');
		this.menuImage.anchor.setTo(0.5,0.5);
		this.input.onDown.addOnce(function() {this.state.start('level_1')}, this);
	}
};

module.exports = Menu;