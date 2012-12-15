var app = app || {};

$(document).ready(function() {

 
    var canvas = $("#game-canvas").get(0),
        context = canvas.getContext("2d"),
        $score = $(".scores");

    var board = new app.Board(context, $score);
    board.startGame();

    $(canvas).click(function(event) {
        board.clickAtPosition(event.offsetX, event.offsetY);
    });
        
});