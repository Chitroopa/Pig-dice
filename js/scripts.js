function PigDice(playerName, computer) {
  this.playerName = playerName;
  this.playerScore = 0;
  this.computer = computer;
  this.computerScore = 0;
  this.turnScore = 0;
}
PigDice.prototype.randomNumber = function() {
  var diceArray = [1,2,3,4,5,6];
  var rNumber = diceArray[Math.floor(Math.random() * diceArray.length)];
  return rNumber;
}
PigDice.prototype.holdScore = function() {
  this.playerScore += this.turnScore;
  this.turnScore = 0;
  return this.playerScore;
}
PigDice.prototype.compScore = function() {
  this.computerScore += this.turnScore;
  this.turnScore = 0;
  return this.computerScore;
}

$(document).ready(function(){

  var rollScore = 0;
  var compRollScore = 0;
  var playerNameInput = "Bob";
  var computerName = "Watson";
  var newPigDice = new PigDice(playerNameInput, computerName);
  $("#roll").click(function(event){
        event.preventDefault();
    if(newPigDice.playerScore >= 50)
    {
       console.log("player1 wins!");
    }
    else if(newPigDice.computerScore >= 50)
    {
      console.log("Watson wins!");
    }
    else
    {
      rollScore = newPigDice.randomNumber();
      newPigDice.turnScore += rollScore;
      if(rollScore === 1)
      {
        newPigDice.turnScore = 0;
        newPigDice.holdScore();
        for(var i=0;i<2;i++)
        {
          compRollScore = newPigDice.randomNumber();
          newPigDice.turnScore += compRollScore;
          if(compRollScore === 1)
          {
            newPigDice.turnScore = 0;
            newPigDice.compScore();
          }
          console.log("Watson Turn Score" +newPigDice.turnScore);
        }
        console.log("Watson score:"+newPigDice.compScore());
      }

      console.log(rollScore);
      console.log("turnScore:" + newPigDice.turnScore);
    }
  });
  $("#hold-score").click(function(event){
      event.preventDefault();
      console.log("Player score:"+newPigDice.holdScore());
      for(var i=0;i<2;i++)
      {
        compRollScore = newPigDice.randomNumber();
        newPigDice.turnScore += compRollScore;
        if(compRollScore === 1)
        {
          newPigDice.turnScore = 0;
          newPigDice.compScore();
        }
        console.log("Watson Turn Score" +newPigDice.turnScore);
      }
      console.log("Watson score:"+newPigDice.compScore());
  });
});
