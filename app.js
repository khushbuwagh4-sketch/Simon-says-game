let gameSequence = [];
let userSequence = [];

let level = 0;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;

let started = false;
let userTurn = false;

const colors = ["red", "yellow", "green", "purple"];

const heading = document.querySelector("h2");
const scoreElement = document.querySelector("#score");
const highScoreElement = document.querySelector("#high-score");
const message = document.querySelector("#message");
const restartButton = document.querySelector("#restart-btn");

highScoreElement.innerText = highScore;


// Start game with keyboard
document.addEventListener("keydown", function () {

    if (!started) {
        startGame();
    }

});


// Start game function
function startGame() {

    started = true;
    userSequence = [];
    gameSequence = [];
    level = 0;
    score = 0;

    scoreElement.innerText = score;
    message.innerText = "";

    nextLevel();

}


// Generate next level
function nextLevel() {

    userSequence = [];
    userTurn = false;

    level++;

    heading.innerText = `Level ${level}`;

    let randomColor =
        colors[Math.floor(Math.random() * colors.length)];

    gameSequence.push(randomColor);

    playSequence();

}


// Play computer sequence
function playSequence() {

    let index = 0;

    const interval = setInterval(function () {

        if (index >= gameSequence.length) {

            clearInterval(interval);

            userTurn = true;

            return;

        }

        let color = gameSequence[index];

        flashButton(color);

        index++;

    }, 700);

}


// Flash button
function flashButton(color) {

    const button = document.querySelector(`#${color}`);

    button.classList.add("flash");

    setTimeout(function () {

        button.classList.remove("flash");

    }, 300);

}


// User button click
document.querySelectorAll(".btn").forEach(function (button) {

    button.addEventListener("click", function () {

        if (!started || !userTurn) {
            return;
        }

        let clickedColor = button.id;

        flashUserButton(button);

        userSequence.push(clickedColor);

        checkAnswer(userSequence.length - 1);

    });

});


// User button flash
function flashUserButton(button) {

    button.classList.add("user-flash");

    setTimeout(function () {

        button.classList.remove("user-flash");

    }, 150);

}


// Check user's answer
function checkAnswer(index) {

    if (userSequence[index] !== gameSequence[index]) {

        gameOver();

        return;

    }

    if (userSequence.length === gameSequence.length) {

        score = level;

        scoreElement.innerText = score;

        if (score > highScore) {

            highScore = score;

            localStorage.setItem("highScore", highScore);

            highScoreElement.innerText = highScore;

        }

        setTimeout(function () {

            nextLevel();

        }, 1000);

    }

}


// Game over
function gameOver() {

    started = false;
    userTurn = false;

    heading.innerText = "Game Over! Press any key to restart";

    message.innerText =
        `Your score was ${score}.`;

    document.body.style.backgroundColor = "#ffcccc";

    setTimeout(function () {

        document.body.style.backgroundColor = "#f5f5f5";

    }, 500);

}


// Restart button
restartButton.addEventListener("click", function () {

    startGame();

});