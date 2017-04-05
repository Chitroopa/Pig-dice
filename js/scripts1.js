function PigDice(playerName, computer) {
  this.playerName = playerName;
  this.playerScore = 0;
  this.computer = computer;
  this.computerScore = 0;
  this.turnTotal = 0;
}
PigDice.prototype.randomNumber = function() {
  var diceArray = [1,2,3,4,5,6];
  var rNumber = diceArray[Math.floor(Math.random() * diceArray.length)];
  return rNumber;
}
PigDice.prototype.holdScore = function() {
  this.playerScore += this.turnTotal;
  this.turnTotal = 0;
  return this.playerScore;
}

$(document).ready(function(){

  var rollScore = 0;
  var playerNameInput = "Bob";
  var computerName = "Watson";
  var newPigDice = new PigDice(playerNameInput, computerName);
  $("#roll").click(function(event){
        event.preventDefault();
    rollScore = newPigDice.randomNumber();
    newPigDice.turnTotal += rollScore;
    if(rollScore === 1)
    {
      newPigDice.turnTotal = 0;
    }
    console.log(rollScore);
    console.log("turnTotal:" + newPigDice.turnTotal);

  });
  $("#hold-score").click(function(event){
      event.preventDefault();
      console.log("Player score:"+newPigDice.holdScore());
  });

});
