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

///Initializing difficulty level
let level = "easy";


/**
 *
 * 1) Hides the settings container
 * 2)Calls addWordToDOM
 * 3)Starts the timer
 * 4) Set focus to input box
 */

window.onload = function () {
  settings.classList.toggle("hide");
  mainContainer.classList.toggle("hide");

  var startDiv = document.createElement("div");
  startDiv.id = 'startDiv';
  startDiv.className = 'block';
  document.getElementsByTagName('body')[0].appendChild(startDiv);

  createTextElement("h2", "Welcome to typing game", startDiv);
  createTextElement("h1", "Select your difficulty level from settings below, then start a new game", startDiv);
  var button = createButton("Start a New Game!", "restartBtn", true, startDiv);
  button.onclick = function () {
    startNewGame()
  };
};

function startNewGame() {
  mainContainer.classList.toggle("hide");
  if (startDiv.className == "block") {
    startDiv.classList.toggle("hide");
  }
  timeInterval = setInterval(updateTime, 1000);
  text.focus();
  addWordToDOM();
}


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
 * Updates score based on the answer and difficulty level.
 * if no input is provided or if the input does'nt match the answer, it resets the input field to empty and calls addWordToDOM()
 */

function updateScore() {
  inputText = text.value.toLowerCase();
  if (inputText === randomWord) {
    score = score + 1;
    scoreEl.innerHTML = score;
    console.log("before time : " + time);
    if (level === "hard") {
      time = time + 2;
    }
    else if (level === "medium") {
      time = time + 3;
    }
    else if (level === "easy") {
      time = time + 5;
    }
    console.log("after time : " + time);
    timeEl.innerHTML = time;
    text.value = "";
    addWordToDOM();
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
  createTextElement("h1", "GAME OVER!", endgameEl);
  // /Adds a h3 element with text displaying score
  createTextElement("h3", "Your Score is : ", endgameEl);
  createTextElement("h3", score, endgameEl);

  var button = createButton("Restart Game", "restartBtn", true, endgameEl);
  button.onclick = function () {
    location.reload();
  };
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

//Function to create button
function createButton(btnName, btnClassName, btnAutoFocus, node) {
  var button = document.createElement("button");
  button.innerText = btnName;
  button.className = btnClassName;

  button.autofocus = btnAutoFocus;
  node.appendChild(button);
  return button;
}
//Function to create text element
function createTextElement(elName, elText, node) {
  var text = document.createElement(elName);
  text.appendChild(document.createTextNode(elText));
  node.appendChild(text);

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

// Event listener for button click to display settings container
settingsBtn.addEventListener("click", displaySetting);
function displaySetting() {
  settings.classList.toggle("hide");
};

/**
 *
 * Event listener keypress to fire the function updateScore()
 */

difficultySelect.addEventListener("change", function () {
  level = difficultySelect.value;
  settings.classList.toggle("hide");
  addWordToDOM();
}
);