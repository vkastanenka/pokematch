// data
import pokemonData from "./js/pokemonData.js";

// utilities
import { createCards, resetSessionData, shuffleCards } from "./js/utilities.js";

const elBtnReset = document.getElementById("button--reset");
const elBtnRestart = document.getElementById("button--restart");
const elContainerCards = document.getElementById("container--cards");
const elWinScreen = document.getElementById("section--win-screen");

const sessionData = {
  attempts: 0,
  matches: 0,
  imgIdClick_01: undefined,
  imgIdClick_02: undefined,
};

// Add logic to reset button
elBtnReset.onclick = () => {
  // Reset all session data
  resetSessionData(sessionData);

  // Shuffle cards
  shuffleCards(pokemonData, sessionData);
};

// Add logic to restart button
elBtnRestart.onclick = () => {
  // Reset all session data
  resetSessionData(sessionData);

  // Shuffle cards
  shuffleCards(pokemonData, sessionData);

  // Hide win screen
  elWinScreen.style.display = "none";
};

// Creates and appends pokemon cards to card container
const startGame = () => {
  // Create pokemon cards
  const cards = createCards(pokemonData, sessionData);

  // Append cards to HTML
  cards.forEach((card) => elContainerCards.appendChild(card));
};

// Call function to start the game
startGame();
