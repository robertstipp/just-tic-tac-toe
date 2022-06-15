const board = {
  0: "",
  1: "",
  2: "",
  3: "",
  4: "",
  5: "",
  6: "",
  7: "",
  8: "",
};

const resetBoard = () => {
  board["0"] = "";
  board["1"] = "";
  board["2"] = "";
  board["3"] = "";
  board["4"] = "";
  board["5"] = "";
  board["6"] = "";
  board["7"] = "";
  board["8"] = "";
};

const addMove = (cell, choice) => {
  board[`${cell}`] = choice;
  return { cell, choice };
};

const checkWinner = () => {
  console.log("CHECKING WINNER????");
  if (board[0] === board[1] && board[0] === board[2] && board[2] !== "") {
    return `The ${board[0]} Wins`;
  }
  if (board[3] === board[4] && board[3] === board[5] && board[5] !== "") {
    return `The ${board[3]} Wins`;
  }
  if (board[6] === board[7] && board[6] === board[8] && board[8] !== "") {
    return `The ${board[6]} Wins`;
  }
  if (board[0] === board[3] && board[0] === board[6] && board[6] !== "") {
    return `The ${board[0]} Wins`;
  }
  if (board[1] === board[4] && board[1] === board[7] && board[7] !== "") {
    return `The ${board[1]} Wins`;
  }
  if (board[1] === board[5] && board[2] === board[8] && board[8] !== "") {
    return `The ${board[1]} Wins`;
  }
  if (board[0] === board[4] && board[0] === board[8] && board[8] !== "") {
    return `The ${board[0]} Wins`;
  }
  if (board[6] === board[4] && board[6] === board[2] && board[8] !== "") {
    return `The ${board[6]} Wins`;
  }
  return "No Winner";
};

module.exports = { addMove, checkWinner, resetBoard };
