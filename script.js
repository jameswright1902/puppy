// Use the API_URL variable to make fetch requests to the API.
// Replace the placeholder with your cohort name (ex: 2109-UNF-HY-WEB-PT)
const cohortName = "2311-fsa-et-web-ft-sf";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;
const main = document.getElementById("main")
const submit= document.getElementById("submit")
/**
 * Fetches all players from the API.
 * @returns {Object[]} the array of player objects
 */

const fetchAllPlayers = async () => {
  try {
    const players = await fetch(`${API_URL}/players`);
    const playersJson = await players.json();
    const playersData = playersJson.data
    const playersList = playersData.players
    console.log(playersList);
    return playersList

  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};

/**
 * Fetches a single player from the API.
 * @param {number} playerId
 * @returns {Object} the player object
 */

// TODO Below
const fetchSinglePlayer = async (playerId) => {
  try {
    const player = await fetch(`${API_URL}/players/${playerId}`);
    const playerJson = await player.json();
    console.log(playerJson);
    return playerJson

  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};

/**
 * Adds a new player to the roster via the API.
 * @param {Object} playerObj the player to add
 * @returns {Object} the player returned by the API
 */


// TODO
const addNewPlayer = async (playerObj) => {
        const name = document.getElementById("name").value;
        const breed = document.getElementById("breed").value;
      
  try {const response = await fetch(
      'https://fsa-puppy-bowl.herokuapp.com/api/COHORT-NAME/players',
      {
        method: "POST",
        headers: {"Content-Type": "application/json",
        },
        body: JSON.stringify({
        name, 
        breed
        }),
      }
    );
    const result = await response.json();
    console.log(result);
    init();

  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);
  }
};

/**
 * Removes a player from the roster via the API.
 * @param {number} playerId the ID of the player to remove
 */
const removePlayer = async (playerId) => {
  try {
    const response = await fetch(`${API_URL}/${playerId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      console.log(`Player with id ${playerId} removed successfully.`);
    } else {
      console.error(`Failed to remove player with id ${playerId}.`);
    }
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};

/**
 * Updates `<main>` to display a list of all players.
 *
 * If there are no players, a corresponding message is displayed instead.
 *
 * Each player is displayed in a card with the following information:
 * - name
 * - id
 * - image (with alt text of the player's name)
 *
 * Additionally, each card has two buttons:
 * - "See details" button that, when clicked, calls `renderSinglePlayer` to
 *    display more information about the player
 * - "Remove from roster" button that, when clicked, will call `removePlayer` to
 *    remove that specific player and then re-render all players
 *
 * Note: this function should replace the current contents of `<main>`, not append to it.
 * @param {Object[]} playerList - an array of player objects
 */

// to do
const renderAllPlayers = (playerList) => {
  main.innerHTML = `
  <h2>All Players</h2>
  ${playerList.map(player => {
    return `<div class="card" style="width: 18rem;">
      <img src="${player.imageUrl}" class="card-img-top" alt="..."/>
      <div class="card-body">
        <h5 class="card-title">${player.name}</h5>
        <p class="card-text">${player.status}</p>
        <p class="card-text">${player.id}</p>
        <a class= ${player.id} id="seeDetails" href="#" class="btn btn-primary">See Details</a>
        <a class= ${player.id} id="removePlayer" href="#" class="btn btn-primary">Remove Player</a>
      </div>
    </div>`
  }).join("")}
    `
};

/**
 * Updates `<main>` to display a single player.
 * The player is displayed in a card with the following information:
 * - name
 * - id
 * - breed
 * - image (with alt text of the player's name)
 * - team name, if the player has one, or "Unassigned"
 *
 * The card also contains a "Back to all players" button that, when clicked,
 * will call `renderAllPlayers` to re-render the full list of players.
 * @param {Object} player an object representing a single player
 */
const renderSinglePlayer = (player) => {
  // TODO
};

/**
 * Fills in `<form id="new-player-form">` with the appropriate inputs and a submit button.
 * When the form is submitted, it should call `addNewPlayer`, fetch all players,
 * and then render all players to the DOM.
 */

// TODO
const renderNewPlayerForm = () => {
  try {
    
  } catch (err) {
    console.error("Uh oh, trouble rendering the new player form!", err);
  }
};

/**
 * Initializes the app by fetching all players and rendering them to the DOM.
 */
const init = async () => {
  const players = await fetchAllPlayers();
  renderAllPlayers(players);

  renderNewPlayerForm();
};

const addNewPlayer1 = (e) => {
  e.preventDefault();
  console.log("I am adding new players")
} 

submit.addEventListener("click", addNewPlayer)

// This script will be run using Node when testing, so here we're doing a quick
// check to see if we're in Node or the browser, and exporting the functions
// we want to test if we're in Node.
if (typeof window === "undefined") {
  module.exports = {
    fetchAllPlayers,
    fetchSinglePlayer,
    addNewPlayer,
    removePlayer,
    renderAllPlayers,
    renderSinglePlayer,
    renderNewPlayerForm,
  };
} else {
  init();
}