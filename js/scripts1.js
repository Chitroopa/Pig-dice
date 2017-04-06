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
  var flag = 2;

  $("#watson-score").text("");

  for(var i=0;i<3 && flag > 1;i++)
  {
    compRollScore = this.randomNumber();
    $("#dice-roll").hide();
    $("#watson-score").show();
    $("#watson-score").append("<li>" + compRollScore + "<li>");
    this.turnScore += compRollScore;
    $("#turn-score").text(this.turnScore);
    if(compRollScore === 1)
    {
      flag = 0;
      this.turnScore = 0;
    }
    $("#turn-score").text(this.turnScore);
    $("#common-display").text("");

  }
  $("#watson-total").text(this.compScore());
  $("#roll, #hold-score").show();
  var winner = this.winner();
  if (winner)
  {
    $("#dice-roll, #watson-score").hide();
  }
}
PigDice.prototype.winner = function() {
  if(this.playerScore >= 100)
   {
      $("#common-display").text("Congratulations human on your lucky win...let's play again!")
      $("#lucky, #play-again").show();
      return true;
   }
   else if(this.computerScore >= 100)
   {
     $("#common-display").text("HA HA pathetic human, I, Mr. Watson, the Super Computer easily defeated you!")
     $("#watson, #play-again").show();
     return true;
   }
   return false;
}
// user Interface Logic
$(document).ready(function(){

  var rollScore = 0;

  var playerNameInput = "Bob";
  var computerName = "Watson";
  var newPigDice = new PigDice(playerNameInput, computerName);
  $("#roll, #hold-score").show();   // creating a new object

  $("#roll").click(function(event){ // rolling the dice for the user when the roll button is clicked
    event.preventDefault();
    if (newPigDice.winner())
    {
      $("#dice-roll, #watson-score").hide();
    }
    rollScore = newPigDice.randomNumber();
    newPigDice.turnScore += rollScore;
    $("#dice-roll").show();
    $("#watson-score").hide();
    $("#dice-roll").text(rollScore);
    $("#turn-score").text(newPigDice.turnScore);
    // the user will lose their points and their turn when they roll a one
    if(rollScore === 1)
    {
      newPigDice.turnScore = 0;
      newPigDice.holdScore();
      $("#turn-score").text(newPigDice.turnScore);
      $("#roll, #hold-score").hide();
      $("#common-display").text("You rolled a 1 :( you lose your turn and points...")
      setTimeout(function() {
       newPigDice.computerRoll();
     }, 2000);
    }
    newPigDice.winner();
  });
  // when the user clicks the hold button their turn score is added to the total score and the turn is handed over to Watson
  $("#hold-score").click(function(event){
    event.preventDefault();
    $("#user-total").text(newPigDice.holdScore());
    if (newPigDice.winner())
    {
      $("#dice-roll, #watson-score").hide();
    }
    var winner = newPigDice.winner();
    if (!winner)
    {
      $("#roll, #hold-score").hide();
      $("#common-display").text("Mr. Watson is rolling...");
      setTimeout(function() {
        newPigDice.computerRoll();
      }, 1000);
    }
  });
});
