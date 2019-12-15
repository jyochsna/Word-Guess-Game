// array to store words to be guessed
var words = ["bat" , "coyote" , "fox" , "guinepig", "tiger"]
var currentWordIndex = 0;
var dashLines = [];

var correctlyGuessedLetters = [];
var incorrectlyGuessedLetters = [];

// variable to keep track of wins
var win = 0;

// variable to keep track of looses
var loose = 0;

var guessRemaining = words[currentWordIndex].length + 2;

window.onload = function() {
    
    this.renderDashLines();
    this.renderGuessRemaining();
    this.renderLooses();
    this.renderWin();
}

// function to read the key
document.onkeyup = function(event) {
    var userInput = event.key.toLowerCase();

    checkUserInput(userInput);

    renderCorrectlyGuessedWord(userInput);
    renderIncorrectlyGussedWord(userInput);
    renderGuessRemaining();
    renderLooses();
}

function checkUserInput(userInput) {
    // check if the letter is present in the current word
    var currentWord = words[currentWordIndex];
    for (let i = 0; i < currentWord.length; i++) {
        if (currentWord[i] != userInput) {
            guessRemaining--;
            break;
        }
    }

    if (guessRemaining == 0) {
        loose++;
        currentWordIndex++;
        renderDashLines();
        if (currentWordIndex < words.length) {
            guessRemaining = words[currentWordIndex].length + 2;
        }
    }
}

function renderWin() {
    document.getElementById("winstracker").innerHTML = win;
}

function renderLooses() {
    document.getElementById("losstracker").innerHTML = loose;
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
    renderGuessRemaining();
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
        win++;

        if (currentWordIndex >= words.length) {
            alert("Game over!!! " + "Total Wins = " + win + " Total Looses = " + loose + " Press OK to start over ...");
            currentWordIndex = 0;
            incorrectlyGuessedLetters = [];
            win = 0;
            loose = 0;
        }

        guessRemaining = words[currentWordIndex].length + 2;

        renderDashLines();
        renderGuessRemaining();
        renderWin();
    }
}
