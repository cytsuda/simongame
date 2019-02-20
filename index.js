var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var clickedPattern = [];
var level = 0;
var start = false;

// Click button function
$(".btn").click(function () {
  if (start) {

    var userChosenColour = $(this).attr("id");
    console.log(userChosenColour);
    playSong(userChosenColour);
    lightButtons(userChosenColour);

    clickedPattern.push(userChosenColour);
    checkAnswer(clickedPattern.length - 1);
  }
});

// Function to start the game
$(document).keydown(function (event) {
  var eventArray = [{key:"q",cor:"green"},{key:"w",cor:"red"},{key:"e",cor:"yellow"},{key:"r",cor:"blue"}];

  var valid = !$("body").hasClass("game-over");
  
  if (!start&&valid) {
    if (event.key === "a" || event.key === "A") {
      start = true;
      level = 0;
      nextSequence();
    }
  }else 
  if(eventArray.find(x=>x.key===event.key)){
    var userChosenColour = eventArray.find(x=>x.key===event.key).cor;
    playSong(userChosenColour);
    lightButtons(userChosenColour);

    clickedPattern.push(userChosenColour);
    checkAnswer(clickedPattern.length - 1);
  }
  
});


// Functions 
// Next Sequence
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  playSong(randomChosenColour);
  lightButtons(randomChosenColour);

  level++;
  $("#level-title").text("Level " + level);
}
// Play Song
function playSong(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
// Light Buttons
function lightButtons(name) {

  $("#" + name).addClass('pressed');

  setTimeout(function () {
    $("#" + name).removeClass('pressed');
  }, 100);

}

// Check Answer
function checkAnswer(currentLevel) {
  if (clickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("Right");

    if (currentLevel === level - 1) {
      clickedPattern = [];
      setTimeout(nextSequence, 500);
    }
  } else { //  Wrong
    console.log("Wrong");
    $("#level-title").text("Game Over");
    $("body").addClass("game-over");

    clickedPattern = [];
    gamePattern = [];
    level = 0;
    start = false;
    setTimeout(() => {
      $("#level-title").text("Press A to start");
      $("body").removeClass("game-over");
    }, 700);

  }
}