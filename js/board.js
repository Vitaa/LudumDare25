var app = app || {};

(function() {

	function Board(context, $score) {
		this.context = context;
		this.objects = [];
		this.$score = $score;
	}
	
	Board.prototype.startGame = function() {
		this.currentLevel = 0;
		this.currentScore = 0;
		this.nextLevel();
	};

	Board.prototype.nextLevel = function() {
		var levelInfo = app.levels[this.currentLevel];
		
		this.addNewObjects(levelInfo.objects);
	};

	Board.prototype.addNewObjects = function(newObjects) {
		var self = this;
		for (var i=0; i<newObjects.length; i++) {
			(function(objInfo){
				setTimeout( function(){
					self.addObject(objInfo);
				}, objInfo.duration );
			})(newObjects[i]);
		}
	};

	Board.prototype.addObject = function(objInfo) {
		var obj = new app.FlyObject(this.context, objInfo, this.removeObject);
		this.objects.push(obj);
	};

	Board.prototype.removeObject = function(object) {
		this.objects = _.without(this.objects, object);
		object.removeObject();
	};

	Board.prototype.clickAtPosition = function(x, y) {
		for (var i=0; i<this.objects.length; i++) {
			var object = this.objects[i];
			if ((x >= object.x && x <= object.x + object.width) &&
				(y >= object.y && y <= object.y + object.height)) {
				
				this.addScore(object.score);
				this.removeObject(object);
				break;
			}
		}
	};

	Board.prototype.addScore = function(score) {
		this.currentScore += score;
		this.$score.text(this.currentScore);
	}

	app.Board = Board;


})();