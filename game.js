
var buttonColors = ["red", "blue", "yellow", "green"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var currentLevel = 0;
// Play sound when click the buttons
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};

//Without the press action,run this function the game will set a random color
function nextSquence(e) {
  console.log(e);
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);//store the random color with the array"gamePattern"
  //1. Use jQuery to select the button with the same id as the randomChosenColour and blink
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  //2. play sound
  playSound(randomChosenColor);

  level++;
  changeTitle(); //below we just define this function to change the title
  currentLevel = 0; //every level check from the first user click
};


//Check Which Button is Pressed, and store all the clicked id with the array"userClickedPattern"
$(".btn").click(function () {
  var userChosenColor = this.id;
  playSound(userChosenColor);
  userClickedPattern.push(userChosenColor);

  checkAnswer(); //check every user's clcik
});

//Add animation to user clicks
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(
    function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
};

//-----------below are actions-----------//
//Start game action, detect the start press and call nextSquence()
function changeTitle() {
  $("#level-title").text("Level " + level);
};

$(document).keypress(function (e) {
  if (gamePattern.length === 0) { //Use gamePattern value to check if it's the first press
    nextSquence(e);//then call two functions:changeTitle(inside nextSquence) and start with a random color
  }
});

//Let's check the answer!!
function checkAnswer() {
  console.log({ userClickedPattern, gamePattern, currentLevel });
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {  //check every click in order
    console.log("success!");
    if (currentLevel === level - 1) {   //check every click until the latest
      setTimeout(nextSquence, 1000);
    };
  }
  else {       //if user clicked a wrong button, then triggered these below
    console.log("wrong");
    playSound("wrong"); //play the wrong warning sound
    $("body").addClass("game-over"); //change to game over style for 0.2 seconds
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");
    startover();//Restart the game
  };
  // beacause we check every click, so currectlevel should ++ everytime we call this checkAnswer function
  currentLevel++;
};


//The last step: RESTART
function startover() {
  gamePattern = [];
  level = 0;
  // $(document).keypress(nextSquence);
};

//
