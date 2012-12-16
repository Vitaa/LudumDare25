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
		this.toLeft = info.toLeft || false;
		this.flyFlag = info.fly || false;
		this.toTop = info.toTop || false;

		var self = this;

		self.image = new Image();
		self.image.src = info.url;
		self.readyToDraw = false;

		self.image.onload = function() { 
  			self.readyToDraw = true;
  			self.move();
  		}
	};

	FlyObject.prototype.removeObject = function() {

		this.context.clearRect( this.x - 1, this.y - 1, this.width + 2, this.height + 2 );
		clearTimeout(this.timer);
	};

	FlyObject.prototype.move = function() {
		this.flyFlag ? this.fly() : this.run();
	};

	FlyObject.prototype.run = function() {
		if ( !this.toTop ) {
			this.toLeft ? this.runToLeftBottom() : this.runToRightBottom();
		} else {
			this.toLeft ? this.runToLeftTop() : this.runToRightTop();
		}
	};

	FlyObject.prototype.runToRightBottom = function() {
		var minH = -30, maxH = 150,
			minV = -30, maxV = 80;
		this.moveLimited(minH, maxH, minV, maxV);
	};

	FlyObject.prototype.runToRightTop = function() {
		var minH = -30, maxH = 150,
			minV = -80, maxV = 30;
		this.moveLimited(minH, maxH, minV, maxV);
	};

	FlyObject.prototype.runToLeftTop = function() {
		var minH = -100, maxH = 20,
			minV = -100, maxV = 30;
		this.moveLimited(minH, maxH, minV, maxV);
	};

	FlyObject.prototype.runToLeftBottom = function() {
		var minH = -150, maxH = 30,
			minV = -30, maxV = 80;
		this.moveLimited(minH, maxH, minV, maxV);
	};

	FlyObject.prototype.fly = function() {
		this.toLeft ? this.flyToLeft() : this.flyToRight();
	};

	FlyObject.prototype.flyToRight = function() {
		var minH = -30, maxH = 150,
			minV = -20, maxV = 30;
		this.moveLimited(minH, maxH, minV, maxV);
	};

	FlyObject.prototype.flyToLeft = function() {
		var minH = -150, maxH = 30,
			minV = -20, maxV = 30;
		this.moveLimited(minH, maxH, minV, maxV);
	};

	FlyObject.prototype.moveLimited = function(minH, maxH, minV, maxV) {
		var vectorX = this.getMoveValue( minH, maxH );
		var vectorY = this.getMoveValue( minV, maxV );
		this.moveTo( this.x + vectorX, this.y + vectorY);
	};	

	FlyObject.prototype.getMoveValue = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

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
		return this.x >= BOARD_WIDTH || this.y >= BOARD_HEIGHT || this.x + this.width < 0 || this.y + this.height < 0;
	};


	FlyObject.prototype.richPoint = function( pointX, pointY ) {
		return Math.abs(this.x - pointX) <= 1 && Math.abs(this.y - pointY) <= 1;
	};

	app.FlyObject = FlyObject;


})();