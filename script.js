let randomNumber = parseInt(Math.random() * 100 + 1);

const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');
const livesDisplay = document.querySelector('.lives');
const confettiWrapper = document.getElementById('confetti-wrapper');
const fireworkWrapper = document.getElementById('firework-wrapper');

// 🔊 Sound Effects
const winSound = document.getElementById('win-sound');
const loseSound = document.getElementById('lose-sound');
const clickSound = document.getElementById('click-sound');

const maxGuesses = 7;
let prevGuess = [];
let numGuess = 1;
let playGame = true;

// 💖 Initialize Lives
livesDisplay.innerHTML = '💖'.repeat(maxGuesses);

// 🎯 Submit Guess
submit.addEventListener('click', function (e) {
  e.preventDefault();
  clickSound.play();

  if (playGame) {
    const guess = parseInt(userInput.value);
    validateGuess(guess);
  }
});

function validateGuess(guess) {
  if (isNaN(guess) || guess < 1 || guess > 100) {
    displayMessage('⚠️ Please enter a number between 1 and 100');
    return;
  }

  prevGuess.push(guess);
  displayGuess(guess);
  updateLives(maxGuesses - numGuess);

  if (guess === randomNumber) {
    displayMessage(`🎉 You guessed it right!`);
    winSound.play();
    launchCelebration();
    launchFireworks();
    endGame();
  } else {
    checkGuess(guess);
    numGuess++;
    remaining.innerHTML = `${maxGuesses - numGuess + 1}`;

    if (numGuess > maxGuesses) {
      displayMessage(`☠️ Game Over! Number was ${randomNumber}`);
      updateLives(0);
      loseSound.play();
      endGame();
    }
  }
}

function checkGuess(guess) {
  if (guess < randomNumber) {
    displayMessage('📉 Number is too low');
  } else {
    displayMessage('📈 Number is too high');
  }
}

function displayGuess(guess) {
  userInput.value = '';
  guessSlot.innerHTML += `${guess}, `;
}

function displayMessage(message) {
  lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function updateLives(livesLeft) {
  livesDisplay.innerHTML = livesLeft > 0 ? '💖'.repeat(livesLeft) : '💔'.repeat(maxGuesses);
}

// 🎉 Confetti Animation
function launchCelebration() {
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confetti.style.animationDuration = 2 + Math.random() * 3 + 's';
    confettiWrapper.appendChild(confetti);
    setTimeout(() => confetti.remove(), 4000);
  }
}

// 🎆 Firework Particles
function launchFireworks() {
  for (let i = 0; i < 50; i++) {
    const firework = document.createElement('div');
    firework.classList.add('firework');

    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight / 2;
    const dx = (Math.random() - 0.5) * 300 + 'px';
    const dy = (Math.random() - 0.5) * 300 + 'px';

    firework.style.left = `${x}px`;
    firework.style.top = `${y}px`;
    firework.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    firework.style.setProperty('--x', dx);
    firework.style.setProperty('--y', dy);

    fireworkWrapper.appendChild(firework);
    setTimeout(() => firework.remove(), 1500);
  }
}

// 🔁 Game Reset
function endGame() {
  userInput.value = '';
  userInput.setAttribute('disabled', '');
  const p = document.createElement('p');
  p.classList.add('button');
  p.innerHTML = `<h2 id="newGame">Start New Game</h2>`;
  startOver.appendChild(p);
  playGame = false;
  newGame();
}

function newGame() {
  const newGameButton = document.querySelector('#newGame');
  newGameButton.addEventListener('click', function () {
    randomNumber = parseInt(Math.random() * 100 + 1);
    prevGuess = [];
    numGuess = 1;
    guessSlot.innerHTML = '';
    remaining.innerHTML = `${maxGuesses}`;
    livesDisplay.innerHTML = '💖'.repeat(maxGuesses);
    userInput.removeAttribute('disabled');
    lowOrHi.innerHTML = '';
    startOver.removeChild(newGameButton.parentElement);
    playGame = true;
  });
}