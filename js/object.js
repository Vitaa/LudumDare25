var app = app || {};

(function() {

	function FlyObject(context, info, moveCallback) {
		this.velocity = info.velocity || 10;
		this.context = context;
		this.x = info.x;
		this.y = info.y;
		this.width = info.width;
		this.height = info.height;
		this.moveCallback = moveCallback || function(){};
		this.score = info.score;

		var self = this;

		self.image = new Image();
		self.image.src = info.url;
		self.readyToDraw = false;

		self.image.onload = function() { 
  			self.readyToDraw = true;
  			self.move();
  		}
	};

	FlyObject.prototype.move = function() {
		this.moveObject(1,1);
	}	

	FlyObject.prototype.removeObject = function() {
		this.context.clearRect( this.x, this.y, this.width, this.height );
		clearTimeout(this.timer);
	}

	FlyObject.prototype.moveObject = function(dx, dy) {
		var self = this;
		this.x += dx;
		this.y += dy;

		this.outOfBorder() ? this.moveCallback(this) :
				self.timer = setTimeout( function () { self.moveObject(1,1) }, self.velocity );
	};

	FlyObject.prototype.outOfBorder = function() {
		return this.x >= BOARD_WIDTH || this.y >= BOARD_HEIGHT;
	};

	app.FlyObject = FlyObject;


})();