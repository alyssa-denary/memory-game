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

// startGame(COLORS, FOUND_MATCH_WAIT_MSECS);

// add event listener to start button
document.getElementById("start-button").addEventListener("click", (e) => {
  startGame(COLORS, FOUND_MATCH_WAIT_MSECS);
  document.getElementById("landing-page").style.visibility = "hidden";
});
