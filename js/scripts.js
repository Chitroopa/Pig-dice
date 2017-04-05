var randomNumber = function(){

  var diceArray = [1,2,3,4,5,6];
  var rNumber = diceArray[Math.floor(Math.random() * diceArray.length)];
  return rNumber;
}

$(document).ready(function(){
  var userTotal = 0;
  $("#form-one").submit(function(event){
    event.preventDefault();

    var userResult =0;
    var userResult = randomNumber();

    userTotal += userResult;
    if(userResult === 1)
    {
        userTotal = 0;
    }
    $("#user-result").text(userResult);
    $("#user-total").text(userTotal);
    // var computerResult = randomNumber();
    // $("#computer-result").text(computerResult);
  });
});
function PigDice(playerName, playerScore, computer, computerScore, turnTotal) {
  this.playerName = playerName;
  this.playerScore = playerScore;
  this.computer = computer;
  this.computerScore = computerScore;
  this.turnTotal = turnTotal;
}
