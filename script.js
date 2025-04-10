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
const mainContainer = document.getElementById("container");
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



/**
 *
 * 1) Hides the settings container
 * 2)Calls addWordToDOM
 * 3)Starts the timer
 * 4) Set focus to input box
 */

window.onload = function () {
  settings.classList.toggle("hide");
  startNewGame();
  // Adds a restart button to reload the game
  var startButton = document.createElement("button");
  startButton.innerText = "New Game!";
  startButton.className = "restartBtn";

  startButton.autofocus = true;
  startButton.onclick = function () {
    startNewGame()
  };
  mainContainer.appendChild(startButton);
};

function startNewGame() {
  timeInterval = setInterval(updateTime, 1000);
  text.focus();
  addWordToDOM();
}
/**
 *
 * Event listener keypress to fire the function updateScore()
 */

text.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    updateScore();
  }
});


/**
 *
 *Sets a word from array as a randomWord
 *
 */

function addWordToDOM() {
  if (time <= 0) {
    console.log("Game Over!");
  }
  else {
    let wordsLength = words.length;
    randomWord = words[(Math.floor(Math.random() * wordsLength))];
    word.innerHTML = randomWord;
  }

}


/**
 * Updates score based on the answer.
 * if no input is provided or if the input does'nt match the answer, it resets the input field to empty and calls addWordToDOM()
 */

function updateScore() {
  inputText = text.value.toLowerCase();
  if (inputText === randomWord) {
    score = score + 1;
    scoreEl.innerHTML = score;
    if (difficultySelect.value === "hard") {
      time = time + 2;
    }
    else if (difficultySelect.value === "medium") {
      time = time + 3;
    }
    else if (difficultySelect.value === "easy") {
      time = time + 5;
      timeEl.innerHTML = time;
      text.value = "";
      addWordToDOM();
    }
  }
  else {
    text.value = "";
    addWordToDOM();
  }
}

function gameOver() {
  // clear the interval
  clearInterval(timeInterval);
  timeInterval = 0;
  text.blur();
  //Display endGame container
  endgameEl.style.setProperty("display", "block");

  //Adds a h1 element with text "Game Over"
  var gameOverText = document.createElement("h1");
  gameOverText.appendChild(document.createTextNode("GAME OVER!"));
  endgameEl.style.setProperty("margin-top", "80px");
  endgameEl.appendChild(gameOverText);

  // /Adds a h3 element with text displaying score
  var scoreText = document.createElement("h3");
  scoreText.appendChild(document.createTextNode("Your Score is : " + score));
  endgameEl.appendChild(scoreText);

  // Adds a restart button to reload the game
  var button = document.createElement("button");
  button.innerText = "Restart Game!";
  button.className = "restartBtn";

  button.autofocus = true;
  button.onclick = function () {
    location.reload();
  };
  endgameEl.appendChild(button);
}

/***
 * Decreases time by 1 s every second
 * if time=0, sets time to -1 and fires gameOver()
 */
function updateTime() {
  if (time == 0) {
    // time = -1;
    gameOver();
  }
  else if (time > 0) {
    timeEl.innerHTML = (time - 1) + "s";
    time -= 1;
  }
}

// Event listener for button click to display settings container
settingsBtn.addEventListener("click", displaySetting);
function displaySetting() {
  settings.classList.toggle("hide");
};

/**
 *
 * Event listener keypress to fire the function updateScore()
 */

difficultySelect.addEventListener("change", function (event) {
  console.log(difficultySelect.value);
  addWordToDOM();
}
);