var randomNumber = function(){

  var diceArray = [1,2,3,4,5,6];
  var rNumber = diceArray[Math.floor(Math.random() * diceArray.length)];
  return rNumber;
}

$(document).ready(function(){
  $("#form-one").submit(function(event){
    event.preventDefault();
    var result = randomNumber();
    $("#result").text(result);
  });
});
