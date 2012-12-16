var app = app || {};

(function() {

	function SoundManager() {		
	}

	SoundManager.prototype.playGunshot = function() {
		var gunshot = new Audio("sounds/gunshot.wav");
		gunshot.play();
	};

	app.soundManager = new SoundManager();
})();