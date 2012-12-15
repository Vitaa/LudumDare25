var app = app || {};

(function() {


	function FlyObject(context, url, rect, velocity, moveCallback) {
		this.velocity = velocity || 5;
		this.context = context;
		this.x = rect.x;
		this.y = rect.y;
		this.width = rect.width;
		this.height = rect.height;
		this.moveCallback = moveCallback || function(){};

		var self = this;

		self.image = new Image();
		self.image.src = url;

		self.image.onload = function() {  // Событие onLoad, ждём момента пока загрузится изображение
      		context.drawImage( self.image, self.x, self.y, self.width, self.height );  // Рисуем изображение от точки с координатами 0, 0
  		}

  		self.move();

	};

	FlyObject.prototype.move = function() {
		var min = -30, max = 150;
		var vectorX = Math.floor(Math.random() * (max - min + 1)) + min;
		var vectorY = Math.floor(Math.random() * (max - min + 1)) + min;
		this.moveTo( this.x + vectorX, this.y + vectorY);
	}

	FlyObject.prototype.removeObject = function() {
		this.context.clearRect( this.x - 1, this.y - 1, this.width + 2, this.height + 2 );
	}

	FlyObject.prototype.moveTo = function( x, y ) {
		var dx = x - this.x,
			dy = y - this.y;
		var length = Math.abs( dx ) >= Math.abs( dy ) ? Math.abs( dx ) : Math.abs( dy) ;

		this.moveObject( dx/length, dy/length, x, y );
	};

	FlyObject.prototype.moveObject = function(dx, dy, pointX, pointY) {
		var self = this;
		this.redrawImage( dx, dy );

		if ( this.richPoint( pointX, pointY ) ) {
			self.move();
			return;	
		} 

		this.outOfBorder() ? this.moveCallback() :
				setTimeout( function () { self.moveObject( dx,dy, pointX, pointY ) }, self.velocity );
	};

	FlyObject.prototype.outOfBorder = function() {
		return this.x >= BOARD_WIDTH || this.y >= BOARD_HEIGHT;
	};

	FlyObject.prototype.richPoint = function( pointX, pointY ) {
		return Math.abs(this.x - pointX) <= 1 && Math.abs(this.y - pointY) <= 1;
	};

	FlyObject.prototype.redrawImage = function( dx, dy ) {
		this.removeObject();
		this.context.drawImage( this.image, this.x + dx, this.y + dy, this.width, this.height );
		this.x += dx;
		this.y += dy;
	};



	app.FlyObject = FlyObject;


})();