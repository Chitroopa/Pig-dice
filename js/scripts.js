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
  console.log("compRollScore-first:" + compRollScore);
  for(var i=0;i<2 && compRollScore > 1;i++)
  {
    this.turnScore += compRollScore;
    console.log("Watson Turn Score" +this.turnScore);
    compRollScore = this.randomNumber();
    console.log("compRollScore-second:" + compRollScore);
  }
  if(compRollScore === 1) // if the computer rolls a one then it becomes the user's turn
  {
    console.log("Watson : I rolled 1")
    this.turnScore = 0;
    this.compScore();
  }
  console.log("Watson score:"+this.compScore());
}
PigDice.prototype.winner = function() {
  if(this.playerScore >= 100)
   {
      console.log("player1 wins!");
      return true;
   }
   else if(this.computerScore >= 100)
   {
     console.log("Watson wins!");
     return true;
   }
   return false;
}
// user Interface Logic
$(document).ready(function(){

  var rollScore = 0;

  var playerNameInput = "Bob";
  var computerName = "Watson";
  var newPigDice = new PigDice(playerNameInput, computerName);    // creating a new object

  $("#roll").click(function(event){ // rolling the dice for the user when the roll button is clicked
        event.preventDefault();
      newPigDice.winner();

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
    newPigDice.winner();

  });
  // when the user clicks the hold button their turn score is added to the total score and the turn is handed over to Watson
  $("#hold-score").click(function(event){
      event.preventDefault();
      console.log("Player score:"+newPigDice.holdScore());
      var winner = newPigDice.winner();
      if (!winner)
      {
        newPigDice.computerRoll();
        newPigDice.winner();
      }
  });
});
