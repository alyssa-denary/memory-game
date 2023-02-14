"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const NO_MATCH_DISPLAY_TIME = 1000;
const COLORS = ["red", "blue", "green", "purple"];

document.getElementById("best-score").textContent = findBestScore();

document.getElementById("start-button").addEventListener("click", (e) => {
  startGame(COLORS, NO_MATCH_DISPLAY_TIME);
  document.getElementById("landing-page").style.visibility = "hidden";
});
