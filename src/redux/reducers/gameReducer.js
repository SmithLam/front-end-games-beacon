const initialstate = {
  currentGameList: [],
  currentGame: {},
};

export default function reducer(state = initialstate, action) {
  if (action.type === "LOAD-GAMES") {
    state.currentGameList = action.payload;
    console.log("this is current games List", state.currentGameList);
  }
  if (action.type === "LOAD-DETAIL-GAMES") {
    state.currentGame = action.payload;
    console.log("this is current game detail", state.currentGame);
  }
  return { ...state };
}
