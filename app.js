"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red",
  "blue",
  "green",
  "purple",
  "red",
  "blue",
  "green",
  "purple",
];

document.getElementById("best-score").textContent = findBestScore();

document.getElementById("start-button").addEventListener("click", (e) => {
  startGame(COLORS, FOUND_MATCH_WAIT_MSECS);
  document.getElementById("landing-page").style.visibility = "hidden";
});
