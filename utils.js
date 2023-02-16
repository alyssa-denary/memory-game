"use strict";

class Game {
  constructor(deck, difficulty, ms) {
    this.deck = deck;
    this.difficulty = difficulty;
    this.guess = [];
    this.cardDisplayTime = ms;
    this.numMatches = 0;
    this.numGuesses = 0;
    this.isListening = true;
  }

  createCards() {
    const gameBoard = document.getElementById("game");
    for (const card of this.deck) {
      const cardContainer = document.createElement("section");
      cardContainer.className = `card-container`;
      cardContainer.addEventListener("click", this.handleCardClick.bind(this));
      gameBoard.appendChild(cardContainer);
      const imgEl = document.createElement("img");
      imgEl.className = `img`;
      imgEl.src = card;
      cardContainer.appendChild(imgEl);
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
    this.guess.push(card);
    card.classList.add("flipped");
    setTimeout(() => {
      card.firstChild.style.display = "flex";
    }, 250);
  }

  isMatch() {
    this.numGuesses++;
    this.displayScore();
    return this.guess[0].firstChild.src === this.guess[1].firstChild.src;
  }

  unFlipCards() {
    for (const card of this.guess) {
      card.classList.remove("flipped");
      setTimeout(() => {
        card.firstChild.style.display = "none";
      }, 250);
    }
    this.guess = [];
    this.isListening = true;
  }

  displayScore() {
    document.getElementById("current-score").textContent = this.numGuesses;
  }

  checkStatus() {
    if (this.numMatches === this.deck.length / 2) {
      this.endGame();
    }
  }

  endGame() {
    document.getElementById("current-score").textContent = 0;
    const cards = document.querySelectorAll(".card-container");
    for (let card of cards) {
      document.getElementById("game").removeChild(card);
    }
    document.getElementById("current-score").textContent = "";
    document.getElementById("your-score-text").textContent = "Your score: ";
    document.getElementById(
      "last-score"
    ).textContent = `${this.difficulty}: ${this.numGuesses}`;
    document.getElementById("best-score").textContent = findBestScores(this);
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

function startGame(cardBank, ms, difficulty) {
  let halfDeck = shuffle(cardBank);
  if (difficulty === "easy") {
    halfDeck = halfDeck.slice(0, 4);
  } else if (difficulty === "medium") {
    halfDeck = halfDeck.slice(0, 12);
  } else if (difficulty === "hard") {
    halfDeck = halfDeck.slice(0, 22);
  }
  const deck = shuffle(halfDeck.concat(halfDeck));
  const game = new Game(deck, difficulty, ms);
  game.createCards();
  document.getElementById("current-score").textContent = 0;
}

function findBestScores(game) {
  const bestScores = retrieve("bestScores");
  if (
    game &&
    (bestScores[game.difficulty] === null ||
      game.numGuesses < bestScores[game.difficulty])
  ) {
    bestScores[game.difficulty] = game.numGuesses;
    store("bestScores", bestScores);
  }
  const bestScoresArr = [];
  for (const key in bestScores) {
    if (bestScores[key] !== null) {
      bestScoresArr.push(`${key}: ${bestScores[key]}`);
    } else {
      bestScoresArr.push(`${key}: n/a`);
    }
  }
  return bestScoresArr.join(" - ");
}

function store(key, obj) {
  localStorage.setItem(`${key}`, JSON.stringify(obj));
}

function retrieve(key) {
  const objJSON = localStorage.getItem(`${key}`);
  return objJSON !== null
    ? JSON.parse(objJSON)
    : { easy: null, medium: null, hard: null };
}
