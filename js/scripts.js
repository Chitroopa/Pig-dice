function PigDice(playerName, computer) {   // constructor
  this.playerName = playerName;
  this.playerScore = 0;
  this.computer = computer;
  this.computerScore = 0;
  this.turnScore = 0;
}

PigDice.prototype.randomNumber = function() {   // defining dice roll
  var diceArray = [1,2,3,4,5,6];
  var rNumber = diceArray[Math.floor(Math.random() * diceArray.length)];
  return rNumber;
}
// defining that when a user holds their turn score gets added to their total score
PigDice.prototype.holdScore = function() {
  this.playerScore += this.turnScore;
  this.turnScore = 0;
  return this.playerScore;
}
// defining that when the computer holds after two turns their turn score gets added to their total score
PigDice.prototype.compScore = function() {
  this.computerScore += this.turnScore;
  this.turnScore = 0;
  return this.computerScore;
}
// defining the limits and rolling terms for the computer
PigDice.prototype.computerRoll = function() {
  var compRollScore = 0;
  compRollScore = this.randomNumber();
  console.log("compRollScore:" + compRollScore);
  for(var i=0;i<2 && compRollScore > 1;i++)
  {

    this.turnScore += compRollScore;
    if(compRollScore === 1) // if the computer rolls a one then it becomes the user's turn
    {
      this.turnScore = 0;
      this.compScore();
    }
    console.log("Watson Turn Score" +this.turnScore);
    compRollScore = this.randomNumber();
  }
  console.log("Watson score:"+this.compScore());
}
$(document).ready(function(){

  var rollScore = 0;

  var playerNameInput = "Bob";
  var computerName = "Watson";
  var newPigDice = new PigDice(playerNameInput, computerName);    // creating a new object

  $("#roll").click(function(event){ // rolling the dice for the user when the roll button is clicked
        event.preventDefault();


      rollScore = newPigDice.randomNumber();
      newPigDice.turnScore += rollScore;
      console.log(rollScore);
      console.log("turnScore:" + newPigDice.turnScore);
      // the user will lose their points and their turn when they roll a one
      if(rollScore === 1)
      {
        newPigDice.turnScore = 0;
        newPigDice.holdScore();
        console.log(rollScore);
        console.log("turnScore:" + newPigDice.turnScore);
        newPigDice.computerRoll();
      }

     if(newPigDice.playerScore >= 100)
      {
         console.log("player1 wins!");
      }
      else if(newPigDice.computerScore >= 100)
      {
        console.log("Watson wins!");
      }
  });
  // when the user clicks the hold button their turn score is added to the total score and the turn is handed over to Watson
  $("#hold-score").click(function(event){
      event.preventDefault();
      console.log("Player score:"+newPigDice.holdScore());
      newPigDice.computerRoll();

  });
});
