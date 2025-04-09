/**
 *
 * Instructions:

Typing-game

REQUIREMENTS:

PART 1

Create a addWordToDOM function that will update the ”word” element with a random item from the words array

Create a updateScore function that will increment score by +1

Add an event listener to the ”text” element. When you type in the correct word, the function should:

Call updateScore

give the user a new word by calling addWordToDOM

increment time by 5 seconds

reset the input to empty string



PART 2

Create a updateTime function using the setInterval( ) method, every time it runs it should decrement -1 from the timer. Stop the timer when it reaches zero.

Create  a gameOver function that will display the end-game-container once the timer hits zero



PART 3, OPTIONAL:

Add an event listener to the settings button that will hide the settings

Add an event listener for the settings form so that you can change the difficulty

Set time depending on difficulty in the eventlistener

QUICK TIP:

The end-game-container is currently set to display: none, you need to change the styling using JavaScript in order for it to show up.

In order to create a button that will restart your game, you can use the onClick=”location.reload” attribute inside your button tag
 */

// Variables for the DOM elements
const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const settingsBtn = document.getElementById("settings-btn");
const difficultySelect = document.getElementById("difficulty");

// Array
const words = [
  "dependent",
  "dog",
  "superficial",
  "admit",
  "juice",
  "javascript",
  "developer",
  "airplane",
  "great",
  "fun",
  "manipulate",
  "cat",
  "transition",
  "school",
  "computer",
  "programming",
  "drag",
  "loving",
  "north",
];

//Initializing word
let randomWord;

//Initializing score
let score = 0;

//Initializing time
let time = 10;
//Initializing timeInterval
let timeInterval;

text.focus();
text.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    updateScore();
  }
});

function addWordToDOM() {
  console.log("time : " + time);
  timeInterval = setInterval(updateTime, 1000);
  let wordsLength = words.length;
  randomWord = words[(Math.floor(Math.random() * wordsLength) + 1)];
  word.innerHTML = randomWord;
}

function updateScore() {

  inputText = text.value;
  if (inputText === randomWord) {
    score = score + 1;
    scoreEl.innerHTML = score;
    console.log("time before update : " + time);
    time = time + 5;
    console.log("time after update : " + time);
    timeEl.innerHTML = time + 5;
    text.value = "";
    addWordToDOM();
  }
  else {
    text.value = "";
    addWordToDOM();
  }
}



function gameOver() {
  // clear the interal
  clearInterval(timeInterval);
  console.log(timeInterval);
  timeInterval = 0;
  restartGame();

}
function restartGame() {
  endgameEl.style.setProperty("display", "block");

  var gameOverText = document.createElement("h1");
  gameOverText.appendChild(document.createTextNode("GAME OVER!"));
  endgameEl.style.setProperty("margin-top", "80px");
  endgameEl.appendChild(gameOverText);

  var scoreText = document.createElement("h3");
  scoreText.appendChild(document.createTextNode("Your Score is : " + score));
  endgameEl.appendChild(scoreText);

  var button = document.createElement("button");
  button.innerText = "Restart Game!";
  button.className = "restartBtn";
  button.onclick = function () {
    location.reload();
  };
  endgameEl.appendChild(button);
}

function updateTime() {
  if (time == 0) {
    time = -1;
    gameOver();
  }
  else if (time > 0) {
    console.log("time : " + time);
    timeEl.innerHTML = (time - 1) + "s";
    time -= 1;
  }
}


settingsBtn.addEventListener("click", displaySetting);
function displaySetting() {
  settings.style.removeProperty("display", "none");
  settings.classList.toggle("hide");
};

window.onload = function () {
  addWordToDOM();
  settings.style.setProperty("display", "none");
};

