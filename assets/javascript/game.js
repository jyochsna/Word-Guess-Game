// array to store words to be guessed
var words = ["bat" , "coyote" , "fox" , "guinepig", "tiger"]
var currentWordIndex = 0;
var dashLines = [];

var correctlyGuessedLetters = [];
var incorrectlyGuessedLetters = [];
var numberOfAttempts = 0;

// variable to keep track of wins
var win = 0;

// variable to keep track of looses
var loose = 0;

var guessRemaining = words.length;

window.onload = function() {
    
    this.renderDashLines();
    this.renderGuessRemaining();
}

// function to read the key
document.onkeyup = function(event) {
    var userInput = event.key.toLowerCase();
    renderCorrectlyGuessedWord(userInput);
    renderIncorrectlyGussedWord(userInput);
}

function renderGuessRemaining() {
    document.getElementById("guessremaining").innerHTML = guessRemaining;
}

function renderDashLines() {
    dashLines = [];
    
    var length = words[currentWordIndex].length;
    for (let i = 0; i < length; i++) {
        dashLines.push('_');
    }
    document.getElementById("currentword").innerHTML = dashLines;
}

function renderCorrectlyGuessedWord(input) {
    var currentWord = words[currentWordIndex]; // bat
    for (let i = 0; i < currentWord.length; i++) {
        if (currentWord.charAt(i) == input) {
            dashLines[i] = currentWord.charAt(i);
        }
    }

    document.getElementById("currentword").innerHTML = dashLines;

    checkAnswer(dashLines);
}

function renderIncorrectlyGussedWord(input) {
    incorrectlyGuessedLetters.push(input);
    document.getElementById("guessletter").innerHTML = incorrectlyGuessedLetters; 
}

function checkAnswer(answer) {
    var match = true;
    var currentWord = words[currentWordIndex];
    for (let i = 0; i < currentWord.length; i++) {
        if(answer[i] != currentWord.charAt(i)) {
            match = false;
        }
    }

    if (match) {
        currentWordIndex++;
        guessRemaining--;

        if (currentWordIndex >= words.length) {
            currentWordIndex = 0;
            guessRemaining = words.length;
            incorrectlyGuessedLetters = [];
        }
        renderDashLines();
        renderGuessRemaining();
    }
}
