var sequence = []; 
var userPos = 0; 
var level = 0; 
var gameStatus = false; 

//add sounds to button
var length = document.querySelectorAll(".btn").length;
for (let i = 0; i < length; i++) {
  document.querySelectorAll(".btn")[i].addEventListener("click", () => {
    var id = document.querySelectorAll(".btn")[i].id;
    pressButton(id);
  });
}

function pressButton(id) {
  if (gameStatus) {
    var finalId =
      userPos < sequence.length && sequence[userPos] === id ? id : "wrong";
    var sound = matchButtonSound(finalId);
    animatePress(finalId,sound);
    if (finalId === "wrong") {
      $("h1").text("Game Over :( Press key to restart!");
      gameStatus = false;
    }
    userPos = userPos < sequence.length - 1 ? userPos + 1 : 0;
    if (userPos === 0) {
      setTimeout(alterGame, 2000);
    }
  }
}

function animatePress(id,sound) {
  $("#" + id).addClass("pressed");
  sound.play();
  setTimeout(() => {
    $("#" + id).removeClass("pressed");
  }, 100);
}

function pressButtonRandomly(id) {
  var sound = matchButtonSound(id);
  $("#" + id)
    .fadeOut(50)
    .fadeIn(50);
  animatePress(id,sound);
}

//match button sounds
function matchButtonSound(color) {
  var initialPath = "./sounds/";
  var sound;
  switch (color) {
    case "wrong":
      sound = new Audio(initialPath + "wrong.mp3");
      break;
    case "red":
      sound = new Audio(initialPath + "red.mp3");
      break;
    case "blue":
      sound = new Audio(initialPath + "blue.mp3");
      break;
    case "green":
      sound = new Audio(initialPath + "green.mp3");
      break;
    case "yellow":
      sound = new Audio(initialPath + "yellow.mp3");
      break;
  }
  return sound;
}

//restarting game
$(document).keydown(() => {
  if(!gameStatus){  
  gameStatus = true;
  sequence = [];
  level = 0;
  userPos = 0;
  alterGame();}
});

function alterGame() {
  if (gameStatus) {
    level++;
    $("h1").text("Level " + level);
    var choice = Math.random() * length;
    var finalChoice = Math.floor(choice);
    var id = document.querySelectorAll(".btn")[finalChoice].id;
    console.log(id);
    pressButtonRandomly(id);
    sequence.push(id);
  
  }
}
