const initialstate = {
  currentGameList: [],
};

export default function reducer(state = initialstate, action) {
  if (action.type === "LOAD-GAMES") {
    state.currentGameList = action.payload;
    console.log("this is current game List", state.currentGameList);
  }
  return { ...state };
}
