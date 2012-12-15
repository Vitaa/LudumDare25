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

		self.image.onload = function() {  // Событие onLoad, ждём момента пока загрузится изображение
      		context.drawImage( self.image, self.x, self.y, self.width, self.height );  // Рисуем изображение от точки с координатами 0, 0
  		}

  		self.move();

	};

	FlyObject.prototype.move = function() {
		this.moveObject(1,1);
	}	

	FlyObject.prototype.removeObject = function() {
		this.context.clearRect( this.x, this.y, this.width, this.height );
	}

	FlyObject.prototype.moveObject = function(dx, dy) {
		var self = this;
		this.redrawImage( dx, dy );
		console.log( this.y );

		this.outOfBorder() ? this.moveCallback() :
				setTimeout( function () { self.moveObject(1,1) }, self.velocity );
	};

	FlyObject.prototype.outOfBorder = function() {
		return this.x >= BOARD_WIDTH || this.y >= BOARD_HEIGHT;
	};

	FlyObject.prototype.redrawImage = function( dx, dy ) {
		this.removeObject();
		this.context.drawImage( this.image, this.x + dx, this.y + dy, this.width, this.height );
		this.x += dx;
		this.y += dy;
	};

	app.FlyObject = FlyObject;


})();