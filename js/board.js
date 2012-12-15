var app = app || {};

(function() {

	function Board(context) {
		this.context = context;
	}

	Board.prototype.addObject = function(url) {
		var obj = new app.FlyObject(this.context, url);
	};

	app.Board = Board;


})();