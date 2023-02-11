"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

const colors = shuffle(COLORS);

createCards(colors);

let guess = [];

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

function createCards(colors) {
  const gameBoard = document.getElementById("game");

  for (let color of colors) {
    const card = document.createElement("section");
    card.className = `${color} card`;
    card.addEventListener("click", handleCardClick);
    gameBoard.appendChild(card);
  }
}
/** Flip a card face-up. */

function flipCard(card) {
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

function unFlipCards() {
  for (const card of guess) {
    card.classList.remove("flipped");
    card.style.backgroundColor = "";
  }
  guess = [];
}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(e) {
  if (e.target.classList.contains("flipped")) return;
  if (guess.length <= 1) {
    flipCard(e.target);
  }
  if (guess.length === 2 && isMatch(guess)) {
    guess = [];
  } else if (guess.length === 2) {
    setTimeout(unFlipCards, FOUND_MATCH_WAIT_MSECS);
  }
}

function isMatch(guess) {
  return guess[0].style.backgroundColor === guess[1].style.backgroundColor;
}
