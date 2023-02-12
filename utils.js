"use strict";

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

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - a click event listener for each card to handleCardClick
 */

function createCards(game) {
  const gameBoard = document.getElementById("game");

  for (let card of game.deck) {
    const cardEl = document.createElement("section");
    cardEl.className = `${card} card`;
    cardEl.addEventListener("click", (e) => {
      handleCardClick(e, game);
    });
    gameBoard.appendChild(cardEl);
  }
}

/** Flip a card face-up. */

function flipCard(card, guess) {
  const classArr = card.className.split(" ");
  for (const name of classArr) {
    if (name !== "card" && name !== "flipped") {
      card.style.backgroundColor = name;
    }
  }
  card.classList.add("flipped");
  guess.push(card);
}

/** Flip a card face-down. */

function unFlipCards(game) {
  for (const card of game.guess) {
    card.classList.remove("flipped");
    card.style.backgroundColor = "";
  }
  game.guess = [];
}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(e, game) {
  if (e.target.classList.contains("flipped")) return;
  if (game.guess.length <= 1) {
    flipCard(e.target, game.guess);
  }
  if (game.guess.length === 2 && isMatch(game.guess)) {
    game.guess = [];
  } else if (game.guess.length === 2) {
    setTimeout(unFlipCards, game.cardDisplayTime, game);
  }
}

function isMatch(guess) {
  return guess[0].style.backgroundColor === guess[1].style.backgroundColor;
}

function startGame(cards, mSecs) {
  const deck = shuffle(cards);
  const game = {
    deck: deck,
    guess: [],
    cardDisplayTime: mSecs,
    playStatus: "playing",
  };
  createCards(game);
}
