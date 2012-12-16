var app = app || {};

(function() {

	function SoundManager() {	
		new Audio("sounds/gunshot.wav");
		new Audio("sounds/cat.wav");
		new Audio("sounds/scream.wav");	
	}

	SoundManager.prototype.playGunshot = function() {
		var gunshot = new Audio("sounds/gunshot.wav");
		gunshot.play();
	};

	SoundManager.prototype.playScream = function() {
		var rand = Math.round(Math.random()*10);
		if (rand % 2 == 0) {
			var cat = new Audio("sounds/cat.wav");
			cat.play();
		}
		else {
			var scream = new Audio("sounds/scream.wav");
			scream.play();
		}
	};

	app.soundManager = new SoundManager();
})();