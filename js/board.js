var app = app || {};

(function() {

	function Board(context, $scoresLbl, $score, $back) {
		this.context = context;
		this.objects = [];
		this.$score = $score;
		this.$scoresLbl = $scoresLbl;
		this.$back = $back;
	}
	
	Board.prototype.startGame = function() {
		this.currentLevel = 0;
		this.currentScore = 0;
		this.nextLevel();
	};

	Board.prototype.nextLevel = function() {
		if (this.currentLevel < app.levels.length) {

			this.$back.removeClass("level" + this.currentLevel);
			this.currentLevel++;
			this.$back.addClass("level" + this.currentLevel);

			this.lastObjectAdded = false;
			var levelInfo = app.levels[this.currentLevel-1];
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
				
				this.addScore( object.score, x, y );
				this.removeObject(object);
				break;
			}
		}
	};

	Board.prototype.addScore = function(score, x, y) {
		this.currentScore += score;
		this.$scoresLbl.text(this.currentScore);

		this.$score.text( (score>0)?("+"+score):score );
		this.$score.css({'top': y+'px', 'left': x+'px'});
		this.$score.toggleClass( "minus", score<0 );
		this.$score.show().delay(300).fadeOut(500);
	
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