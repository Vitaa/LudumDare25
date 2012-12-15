var app = app || {};

(function() {

	function FlyObject(context, info, moveCallback) {
		this.velocity = info.velocity || 5;
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
		var min = -30, max = 150;
		var vectorX = Math.floor(Math.random() * (max - min + 1)) + min;
		var vectorY = Math.floor(Math.random() * (max - min + 1)) + min;
		this.moveTo( this.x + vectorX, this.y + vectorY);
	}

	FlyObject.prototype.removeObject = function() {

		this.context.clearRect( this.x - 1, this.y - 1, this.width + 2, this.height + 2 );
	//	this.context.clearRect( this.x, this.y, this.width, this.height );
		clearTimeout(this.timer);
	}

	FlyObject.prototype.moveTo = function( x, y ) {
		var dx = x - this.x,
			dy = y - this.y;
		var length = Math.abs( dx ) >= Math.abs( dy ) ? Math.abs( dx ) : Math.abs( dy) ;

		this.moveObject( dx/length, dy/length, x, y );
	};

	FlyObject.prototype.moveObject = function(dx, dy, pointX, pointY) {
		var self = this;
		this.x += dx;
		this.y += dy;

		if ( this.richPoint( pointX, pointY ) ) {
			self.move();
			return;	
		} 

		this.outOfBorder() ? this.moveCallback(this) :
				setTimeout( function () { self.moveObject( dx,dy, pointX, pointY ) }, self.velocity );
	};

	FlyObject.prototype.outOfBorder = function() {
		return this.x >= BOARD_WIDTH || this.y >= BOARD_HEIGHT || this.x < 0 || this.y < 0;
	};


	FlyObject.prototype.richPoint = function( pointX, pointY ) {
		return Math.abs(this.x - pointX) <= 1 && Math.abs(this.y - pointY) <= 1;
	};

	app.FlyObject = FlyObject;


})();