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

function addWordToDOM() {
  updateTime();
  let wordsLength = words.length;
  randomWord = words[(Math.floor(Math.random() * wordsLength) + 1)];
  console.log(randomWord);
  word.innerHTML = randomWord;
}
function updateScore() {
  inputText = text.value;
  console.log(inputText);
  if (inputText === randomWord) {
    score = score + 1;
    scoreEl.innerHTML = score;
    addWordToDOM();
    timeEl.innerHTML = time + 5;
    text.value = "";
  }
}

function check() {
  updateScore();
}
function updateTime() {
  console.log("game over");
}
function updateTime() {

  setInterval(function () {
    while (time > 0) {
      timeEl.innerHTML = (time - 1) + "s";
    }
    if (time === 0)
      gameOver();

  }, 1000);



}

addWordToDOM();