var readline = require('readline');

var reader = readline.createInterface({
  // it's okay if this part is magic; it just says that we want to
  // 1. output the prompt to the standard output (console)
  // 2. read input from the standard input (again, console)

  input: process.stdin,
  output: process.stdout
});




function Board() {
  this.towers = [[1,2,3], [], []];
  this.winCondition = function(){
    if(this.towers[1].length === 3 || this.towers[2].length === 3){
       return true;
    } else{
      return false;
    }
  }


  this.displayBoard = function() {
    console.log(this.towers);
  }

  this.run = function(){
    this.promptPlayer();
  }

  this.promptPlayer = function() {
    this.displayBoard();
    var that = this;
    reader.question("From which tower to which tower would you like to move?",
    function(response) {
      var moveChoices = response.split(" ");
      var firstTower = that.towers[moveChoices[0]];
      var secondTower = that.towers[moveChoices[1]];
      var firstDisk = firstTower[0];
      var secondDisk = secondTower[0];
      console.log(firstDisk, secondDisk);

      if (firstDisk > secondDisk){
        console.log("That is not a valid move.  Please try again.");
      } else {
        var disk = firstTower.shift();
        secondTower.unshift(disk);
      }
      if (that.winCondition()) {
        that.displayBoard();
        console.log("You've won the game.");
        reader.close();
      } else{
        that.promptPlayer();
      }
    });
  }
}


var board = new Board();
board.run();

