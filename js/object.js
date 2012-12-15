var app = app || {};

(function() {


	function FlyObject(context, url, rect, velocity) {
		this.velocity = velocity || 10;
		this.context = context;
		this.x = rect.x;
		this.y = rect.y;
		this.width = rect.width;
		this.height = rect.height;

		var self = this;

		self.image = new Image();
		self.image.src = url;

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
		this.removeObject();
		this.context.drawImage( this.image, this.x + dx, this.y + dy, this.width, this.height );
		this.x += dx;
		this.y += dy;
		setTimeout( function () { self.moveObject(1,1) }, self.velocity );
	};

	app.FlyObject = FlyObject;


})();