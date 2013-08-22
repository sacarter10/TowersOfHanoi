var Hanoi = {
  tower1: [3,2,1],
  tower2: [],
  tower3: [],

  won: function() {
    if (this.tower2.length === 3 || this.tower3.length === 3) {
      return true;
    } else {
      return false;
    }
  },

  moveValid: function(start_tower, end_tower) {
    console.log("in moveValid");
    if (start_tower.length === 0) {
      return false;
    } else if (end_tower.length === 0 ||
      start_tower[start_tower.length-1] < end_tower[end_tower.length - 1]) {
      return true;
    } else {
      return false;
    }
  },

  move: function(start_tower, end_tower) {
    end_tower.push(start_tower.pop());
  }
};

(function (){


  function Game() {
    var game = this;
    this.moveBuffer = [];

    this.discCallback = function(event){
      var element = $(this);

      if (element.css('background-color') === 'rgb(255, 0, 0)' && game.moveBuffer.length === 0) {
        game.moveBuffer.push(element.attr('class').slice(0,6));
      } else if (element.css('background-color') === 'rgb(0, 0, 255)' && game.moveBuffer.length === 1) {
        var toTower = element.attr('class').slice(0,6);
        console.log("move buffer[0] " + game.moveBuffer[0]);
        console.log("toTower " + toTower);
        if (Hanoi.moveValid(Hanoi[game.moveBuffer[0]], Hanoi[toTower])) {
          Hanoi.move(Hanoi[game.moveBuffer[0]], Hanoi[toTower]);
          game.moveBuffer = [];
        } else{
          game.moveBuffer = [];
        }
      }
      if(Hanoi.won()){
        game.printBoard();
        $('.won').css('visibility', 'visible');
      } else{
        game.promptUser();
      }


    };

  }

  Game.prototype.start = function () {

    this.printBoard();
    //$('span.Tower1').css('background-color', 'red');

    var game = this;

    $('.from-which').css('visibility', 'visible');

  };

  Game.prototype.promptUser = function(){
    this.printBoard();
    console.log("in prompt user");
    console.log("moveBuffer is " + this.moveBuffer.length);
    if (this.moveBuffer.length === 0 ) {
      $('p.to-which').css('visibility', 'hidden');
      $('p.from-which').css('visibility', 'visible');
    } else if (this.moveBuffer.length === 1) {
      $('p.from-which').css('visibility', 'hidden');
      $('p.to-which').css('visibility', 'visible');
    }
  };

  Game.prototype.makeMove = function() {

  }

  Game.prototype.printBoard = function() {
    $('.board').empty();

    for (var i = 2; i > -1; i--) {
      var tower1 = Hanoi.tower1[i] || "";
      var tower1Selected = tower1 === "" ? "unselected" : "selected";
      var tower2 = Hanoi.tower2[i] || "";
      var tower2Selected = tower2 === "" ? "unselected" : "selected";
      var tower3 = Hanoi.tower3[i] || "";
      var tower3Selected = tower3 === "" ? "unselected" : "selected";


      $('.board').append('<div class="Space' + (i+1) + '"></div>');

      $tower1 = $('<span class="tower1">' + tower1 + '</span>');
      $('.Space' + (i+1)).append($tower1);
      $tower1.addClass(tower1Selected);

      $tower2 = $('<span class="tower2">' + tower2 + '</span>');
      $('.Space' + (i+1)).append($tower2);
      $tower2.addClass(tower2Selected);

      $tower3 = $('<span class="tower3">' + tower3 + '</span>');
      $('.Space' + (i+1)).append($tower3);
      $tower3.addClass(tower3Selected);

    }

    $(".selected").css('background-color', 'red');
    $('span').on('click', this.discCallback);

  };

  window.Game = Game;
})();

$(function(){
  new Game().start();
});