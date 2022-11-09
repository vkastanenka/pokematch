// data
import pokemonData from "./pokemonData.js";

// utilities
import randomizeArray from "./randomizeArray.js";

const srcPokeball = "../assets/images/pokeball.png";
const elContainerCards = document.getElementById("container--cards");
const elSpanAttempts = document.getElementById("value--attempts");
const elSpanMatches = document.getElementById("value--matches");
const elWinScreen = document.getElementById("section--win-screen");

// Duplicates and randomizes pokemon data
const randomizePokemonData = (pokemonData) => {
  return randomizeArray([...pokemonData, ...pokemonData]);
};

// Creates a column element to hold pokemon image
const createElCol = () => {
  // Create a "div" element
  // Add classes "column" and "column--card" to the div's classlist
  // Return the div element
};

// Creates image element to display pokeball / pokemon
const createElImg = (pokemonId) => {
  // Create an "img" element
  // Set the img element src to srcPokeball
  // Set the img style width to "80px"
  // Set the img style cursor to "pointer"
  // To the img's classList, add "inactive", and the pokemonId
  // Return the img element
};

// Shows pokemon assigned to clicked image
const revealImg = (elImg, pokemonSrc) => {
  // To the elImg classList, remove "inactive"
  // To the elImg classList, add "active"
  // Set the elImg style cursor to "auto"
  // Set the elImg src to pokemonSrc
};

// Sets the id of the pokemon to the corresponding click
const setMatchAttempt = (pokemonId, sessionData) => {
  // if sessionData.imgIdClick_01 is undefined, set it to the pokemonId
  // else if sessionData.imgIdClick_02 is undefined, set it to the pokemonId
};

// Hides pokemon image and reverts back to pokeball
const resetCardsAfterAttempt = () => {
  // Set the elContainerCards style pointerEvents to "none"

  // Create a setTimeout with a 1500 ms delay
  setTimeout(() => {
    // For each of the elContainerCard's childNodes
    elContainerCards.childNodes.forEach((card) => {
      // Create a variable for the image (the card's first child)
      const elImg = card.firstChild;

      // If the img's classList contains "active" and does not contain "matched"
      // Remove the "active" class from the image
      // Add the "inactive" class to the image
      // Change the img's style cursor to "pointer"
      // Change the img's src to srcPokeball
    });

    // Set the elContainerCards style pointerEvents to "auto"
  }, 1500);
};

// Creates a pokemon card with logic tracking attempts and matches
const createCard = (pokemon, sessionData) => {
  // Create elements
  const elCol = createElCol();
  const elImg = createElImg(pokemon.id);

  // Image onclick logic
  elImg.onclick = () => {
    // Only execute logic if the elImg has "inactive" class
    if (elImg.classList.contains("inactive")) {
      // Reveal the pokemon and record the id
      revealImg(elImg, pokemon.src);
      setMatchAttempt(pokemon.id, sessionData);

      // If the session data has 2 recorded ids
      if (sessionData.imgIdClick_01 && sessionData.imgIdClick_02) {
        // Player has attempted a match, update score
        sessionData.attempts += 1;
        elSpanAttempts.innerHTML = sessionData.attempts;

        // If the ids of both clicks match
        if (sessionData.imgIdClick_01 === sessionData.imgIdClick_02) {
          // Player has successfully matched 2 pokemon, update score
          sessionData.matches += 1;
          elSpanMatches.innerHTML = sessionData.matches;

          // Get both images with the same pokemon id in the class
          const elImgsMatched = [
            ...document.getElementsByClassName(sessionData.imgIdClick_01),
          ];

          // Add a matched class to distinguish matched from active cards
          elImgsMatched.forEach((img) => img.classList.add("matched"));

          // If the session ids don't match, reset the cards
        } else {
          resetCardsAfterAttempt();
        }

        // Reset the clicked ids
        sessionData.imgIdClick_01 = undefined;
        sessionData.imgIdClick_02 = undefined;
      }

      // Show win screen once all cards have been matched
      if (sessionData.matches === pokemonData.length) {
        elWinScreen.style.display = "block";
      }
    }
  };

  // Append the image to its container and return the pokemon
  elCol.appendChild(elImg);
  return elCol;
};

// Creates cards with randomized pokemon data
export const createCards = (pokemonData, sessionData) => {
  // Randomize pokemon data
  const pokemonDataRandomized = randomizePokemonData(pokemonData);

  // Create cards with randomized pokemon data
  const cards = pokemonDataRandomized.map((pokemon) =>
    createCard(pokemon, sessionData)
  );

  return cards;
};

// Resets session data for new game
export const resetSessionData = (sessionData) => {
  // Reset session data object
  sessionData.attempts = 0;
  sessionData.matches = 0;
  sessionData.imgIdClick_01 = undefined;
  sessionData.imgIdClick_02 = undefined;

  // Reset score display
  elSpanAttempts.innerHTML = sessionData.attempts;
  elSpanMatches.innerHTML = sessionData.matches;
};

// Replaces and shuffles cards in the game
export const shuffleCards = (pokemonData, sessionData) => {
  // Create pokemon cards
  const cards = createCards(pokemonData, sessionData);

  // Replace old cards with new cards
  elContainerCards.childNodes.forEach((oldCard, i) => {
    elContainerCards.replaceChild(cards[i], oldCard);
  });
};
