var app = app || {};

(function() {

	function Board(context) {
		this.context = context;
	}

	Board.prototype.addObject = function(url) {
		var obj = new app.FlyObject(this.context, url, { x:0, y:0, width: 120, height:120 });
	};

	app.Board = Board;


})();