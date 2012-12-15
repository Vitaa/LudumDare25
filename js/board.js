var app = app || {};

(function() {

	function Board(context, $score) {
		this.context = context;
		this.objects = [];
		this.$score = $score;
	}
	
	Board.prototype.startGame = function() {
		this.currentLevel = -1;
		this.currentScore = 0;
		this.nextLevel();
	};

	Board.prototype.nextLevel = function() {
		if (++this.currentLevel < app.levels.length) {

			this.lastObjectAdded = false;
			var levelInfo = app.levels[this.currentLevel];
			this.addNewObjects(levelInfo.objects);

			this.draw();
		}
	};

	Board.prototype.addNewObjects = function(newObjects) {
		var self = this;
		for (var i=0; i<newObjects.length; i++) {
			(function(newObjects, i){
				var objInfo = newObjects[i];
				
				setTimeout( function(){
					if (i == newObjects.length-1) {
						self.lastObjectAdded = true;
					}
					self.addObject(objInfo);
				}, objInfo.duration );
			})(newObjects, i);
		}
	};

	Board.prototype.addObject = function(objInfo) {
		var obj = new app.FlyObject(this.context, objInfo, $.proxy( this.removeObject, this ));
		this.objects.push(obj);
	};

	Board.prototype.removeObject = function(object) {
		this.objects = _.without(this.objects, object);
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
	};

	Board.prototype.draw = function() {
		this.context.clearRect( 0, 0, 800, 500 );

		if (this.objects.length == 0 && this.lastObjectAdded) {
			this.nextLevel();
			return;
		}

		for (var i=0; i<this.objects.length; i++){
			var obj = this.objects[i];
			if (obj.readyToDraw) {
				this.context.drawImage( obj.image, obj.x, obj.y, obj.width, obj.height );
			}
		}
		var self = this;
		setTimeout( function () { self.draw() }, 5 );
	};

	app.Board = Board;


})();