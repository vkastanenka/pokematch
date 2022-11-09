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
  const elCol = document.createElement("div");
  elCol.classList.add("column", "column--card");

  return elCol;
};

// Creates image element to display pokeball / pokemon
const createElImg = (pokemonId) => {
  const elImg = document.createElement("img");
  elImg.src = srcPokeball;
  elImg.style.width = "80px";
  elImg.style.cursor = "pointer";
  elImg.classList.add("inactive", pokemonId);

  return elImg;
};

// Shows pokemon assigned to clicked image
const revealImg = (elImg, pokemonSrc) => {
  elImg.classList.remove("inactive");
  elImg.classList.add("active");
  elImg.style.cursor = "auto";
  elImg.src = pokemonSrc;
};

// Sets the id of the pokemon to the corresponding click
const setMatchAttempt = (pokemonId, sessionData) => {
  if (!sessionData.imgIdClick_01) {
    sessionData.imgIdClick_01 = pokemonId;
  } else if (!sessionData.imgIdClick_02) {
    sessionData.imgIdClick_02 = pokemonId;
  }
};

// Hides pokemon image and reverts back to pokeball
const resetCardsAfterAttempt = () => {
  elContainerCards.style.pointerEvents = "none";

  setTimeout(() => {
    elContainerCards.childNodes.forEach((card) => {
      const elImg = card.firstChild;
      if (
        elImg.classList.contains("active") &&
        !elImg.classList.contains("matched")
      ) {
        elImg.classList.remove("active");
        elImg.classList.add("inactive");
        elImg.style.cursor = "pointer";
        elImg.src = srcPokeball;
      }
    });

    elContainerCards.style.pointerEvents = "auto";
  }, 1500);
};

// Creates a pokemon card with logic tracking attempts and matches
const createCard = (pokemon, sessionData) => {
  // Create elements
  const elCol = createElCol();
  const elImg = createElImg(pokemon.id);

  // Image onclick lock
  elImg.onclick = () => {
    // Only execute logic if the card has "inactive" class
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
