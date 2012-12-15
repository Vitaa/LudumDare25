var app = app || {};

$(document).ready(function() {

 
    var canvas = $("#game-canvas").get(0),
        context = canvas.getContext("2d");

    var board = new app.Board(context);
    board.addObject('img/object1.png');
        
});