var app = app || {};

(function() {


	function FlyObject(context, url) {
		this.context = context;

		var image = new Image();
		image.src = url;

		image.onload = function() {  // Событие onLoad, ждём момента пока загрузится изображение
      		context.drawImage(image, 0, 0);  // Рисуем изображение от точки с координатами 0, 0
  		}
	}

	app.FlyObject = FlyObject;


})();