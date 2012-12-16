var app = app || {};

(function() {

	function Board(context, $scoresLbl, $board, $back) {
		this.context = context;
		this.objects = [];
		this.$board = $board;
		this.$scoresLbl = $scoresLbl;
		this.$back = $back;

		this.$alert = $(".ready");
	}
	
	Board.prototype.startGame = function() {
		this.currentLevel = 0;
		this.currentScore = 0;

		this.showReady();
	};

	Board.prototype.showAlert = function(text) {
		this.$alert.text(text);
		var def = $.Deferred();

		this.$alert.fadeIn(400).delay(500).fadeOut(400, function(){
			def.resolve();
		});

		return def.promise();
	};

	Board.prototype.showReady = function() {
		var self = this;
		self.showAlert(3).done(function(){
			self.showAlert(2).done(function(){
				self.showAlert(1).done(function(){
					self.nextLevel();
				});
			});
		})
	};

	Board.prototype.gameOver = function() {
		this.$alert.text("Game over!");
		this.$alert.fadeIn(300);
	};

	Board.prototype.nextLevel = function() {
		if (this.currentLevel < app.levels.length) {

			var self = this;
			self.$back.removeClass("level" + self.currentLevel);
			self.currentLevel++;
			self.$back.addClass("level" + self.currentLevel);
			self.showAlert("Level " + (self.currentLevel)).done(function(){
				

				self.lastObjectAdded = false;
				var levelInfo = app.levels[self.currentLevel-1];
				self.addNewObjects(levelInfo.objects);

				self.draw();
			});	
		}
		else {
			this.gameOver();
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
				app.soundManager.playScream();
				break;
			}
		}
	};

	Board.prototype.showBangAnimation = function(bad, x, y) {
		var $bang = $("<div></div>").addClass("bang");
		$bang.toggleClass( "bad", bad );
		
		this.$board.append($bang);
		$bang.css({'top': (y-50)+'px', 'left':(x-60)+'px'});
		
		$bang.show().delay(300).fadeOut(500, function(){
			$(this).remove();
		});
	};

	Board.prototype.showScorePopup = function(score, x, y) {
		var $score = $("<div></div>").addClass("score");
		$score.text( (score>0)?("+"+score):score );
		$score.toggleClass( "minus", score<0 );
		
		this.$board.append($score);
		$score.css({'top': (y - $score.outerHeight()/2)+'px', 'left':(x - 50 )+'px'});
		
		$score.fadeIn(300).delay(300).fadeOut(500, function(){
			$(this).remove();
		});
	};

	Board.prototype.addScore = function(score, x, y) {
		this.currentScore += score;
		this.$scoresLbl.text(this.currentScore);

		this.showBangAnimation(score<0, x, y);
		
		var self = this;
		setTimeout(function(){
			self.showScorePopup(score, x, y);
		}, 600);
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