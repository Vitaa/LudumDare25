var app = app || {};

$(document).ready(function() {

 
    var canvas = $("#game-canvas").get(0),
        context = canvas.getContext("2d"),
        $scoreLbl = $(".scores"),
        $board = $(".board");

    var board = new app.Board(context, $scoreLbl, $board, $(canvas));
    board.startGame();

    $(canvas).click(function(event) {
        board.clickAtPosition(event.offsetX, event.offsetY);
    });
        
});