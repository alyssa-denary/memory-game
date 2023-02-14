"use strict";

class Game {
  constructor(deck, ms) {
    this.deck = deck;
    this.guess = [];
    this.cardDisplayTime = ms;
    this.playStatus = "playing";
    this.numMatches = 0;
    this.numGuesses = 0;
    this.isListening = true;
  }

  createCards() {
    const gameBoard = document.getElementById("game");
    for (let card of this.deck) {
      const cardEl = document.createElement("section");
      cardEl.className = `${card} card`;
      cardEl.addEventListener("click", this.handleCardClick.bind(this));
      gameBoard.appendChild(cardEl);
    }
  }

  handleCardClick(e) {
    if (e.target.classList.contains("flipped") || !this.isListening) return;
    if (this.guess.length <= 1) {
      this.flipCard(e.target);
    }
    if (this.guess.length === 2 && this.isMatch()) {
      this.guess = [];
      this.numMatches++;
      this.checkStatus();
    } else if (this.guess.length === 2) {
      this.isListening = false;
      setTimeout(this.unFlipCards.bind(this), this.cardDisplayTime);
    }
  }

  flipCard(card) {
    const classArr = card.className.split(" ");
    for (const name of classArr) {
      if (name !== "card" && name !== "flipped") {
        card.style.backgroundColor = name;
      }
    }
    card.classList.add("flipped");
    this.guess.push(card);
  }

  isMatch() {
    this.numGuesses++;
    this.displayScore();
    return (
      this.guess[0].style.backgroundColor ===
      this.guess[1].style.backgroundColor
    );
  }

  unFlipCards() {
    for (const card of this.guess) {
      card.classList.remove("flipped");
      card.style.backgroundColor = "";
    }
    this.guess = [];
    this.isListening = true;
  }

  displayScore() {
    document.getElementById("current-score").textContent = this.numGuesses;
  }

  checkStatus() {
    if (this.numMatches === this.deck.length / 2) {
      this.playStatus = "finished";
      this.endGame();
    }
  }

  endGame() {
    document.getElementById("current-score").textContent = 0;
    const cards = document.querySelectorAll(".card");
    for (let card of cards) {
      document.getElementById("game").removeChild(card);
    }
    document.getElementById(
      "your-score"
    ).textContent = `Your score: ${this.numGuesses}`;
    document.getElementById("best-score").textContent = findBestScore(
      this.numGuesses
    );
    document.getElementById("start-button").textContent = "Restart Game";
    document.getElementById("landing-page").style.visibility = "visible";
  }
}

/** Shuffle array items in-place and return shuffled array. */
function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

function startGame(cards, ms) {
  const deck = shuffle(cards);
  const game = new Game(deck, ms);
  game.createCards();
}

function findBestScore(gameScore) {
  const bestScore = retrieve("bestScore");
  if (gameScore < bestScore) {
    store("bestScore", gameScore);
    return gameScore;
  } else if (bestScore === Infinity) {
    return "n/a";
  } else {
    return bestScore;
  }
}

function store(key, obj) {
  localStorage.setItem(`${key}`, JSON.stringify(obj));
}

function retrieve(key) {
  const objJSON = localStorage.getItem(`${key}`);
  return objJSON !== null ? JSON.parse(objJSON) : Infinity;
}
