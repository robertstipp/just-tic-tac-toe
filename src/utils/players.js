let players = [];

const assignPlayer = () => {
  if (players.length === 0) {
    return "X";
  }
  if (players.length === 1) {
    return players[0].choice === "X" ? "O" : "X";
  } else return null;
};

const addPlayer = (socket) => {
  const player = {
    name: `player${players.length}`,
    socket,
    choice: `${assignPlayer()}`,
  };
  if (players.length < 2) {
    players.push(player);
    return player;
  }
};

const getPlayer = (socket) => {
  return players.find((player) => player.socket === socket);
};

const removePlayer = (id) => {
  players = players.filter((player) => player.socket !== id);
  return players;
};

const getPlayers = () => {
  return players;
};

module.exports = {
  addPlayer,
  getPlayers,
  getPlayer,
  removePlayer,
};
