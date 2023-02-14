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

document.getElementById("best-score").textContent = findBestScore();


