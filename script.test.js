const {
  fetchAllPlayers,
  fetchSinglePlayer,
  addNewPlayer,
  removePlayer,
  renderAllPlayers,
  renderSinglePlayer,
  renderNewPlayerForm,
} = require("./script");

describe("fetchAllPlayers", () => {
  // Make the API call once before all the tests run
  let players;
  beforeAll(async () => {
    players = await fetchAllPlayers();
  });

  test("returns an array", async () => {
    expect(Array.isArray(players)).toBe(true);
  });

  test("returns players with name and id", async () => {
    players.forEach((player) => {
      expect(player).toHaveProperty("name");
      expect(player).toHaveProperty("id");
    });
  });
});

// TODO: Tests for `fetchSinglePlayer`
describe("fetchSinglePlayer", () => {
  let players;
  beforeAll(async () => {
    players = await fetchAllPlayers ();
  });
  test("returns single player", async () => {
    for (let player of players.players) {
      let result = await fetchSinglePlayer(player.id);
      expect(result.data.player && typeof result.data.player === "object").toBe(true);
    }
  });
  test('returns player with name, id, breed...', async () => {
    for (let player of players.players) {
      let result = await fetchSinglePlayer(player.id);
      expect(result.data.player).toHaveProperty('name');
      expect(result.data.player).toHaveProperty('id');
      expect(result.data.player).toHaveProperty('breed');
    }
  })
});

// TODO: Tests for `addNewPlayer`
test('addNewPlayer', async () => {
  let players = await fetchAllPlayers();
  let length = players.players.length;
  let obj={
    name:'dfsfsfs',
    breed:'wefwefew',
    image:'werwerw'
  }
  await addNewPlayer(obj);
  players = await fetchAllPlayers();
  expect(length+1===players.players.length);
})

// (Optional) TODO: Tests for `removePlayer`
