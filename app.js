"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const NO_MATCH_DISPLAY_TIME = 1000;
const COLORS = [
  "red",
  "orange",
  "yellow",
  "blue",
  "green",
  "purple",
  "brown",
  "black",
  "grey",
  "skyblue",
  "maroon",
  "fuchsia",
  "lime",
  "olive",
  "teal",
  "aqua",
  "navy",
  "aliceblue",
  "aquamarine",
  "antiquewhite",
  "blueviolet",
  "darkslateblue",
  "gold",
  "indigo",
];

const IMAGES = [
  "img/cards/heat-pump.jpg",
  "img/cards/nuclear.jpg",
  "img/cards/solar.jpg",
  "img/cards/wind.jpg",
];

document.getElementById("best-score").textContent = findBestScores();

document.getElementById("game-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const difficulty = document.querySelector(
    'input[name="difficulty"]:checked'
  ).value;
  document.getElementById("game").className = difficulty;
  startGame(IMAGES, NO_MATCH_DISPLAY_TIME, difficulty);
  document.getElementById("landing-page").style.visibility = "hidden";
});
