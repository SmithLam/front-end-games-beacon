const initialstate = {
  currentGameList: [],
  currentGame: {},
  like: false,
};

export default function reducer(state = initialstate, action) {
  switch (action.type) {
    case "LOAD-GAMES":
      console.log("this is current games List", state.currentGameList);
      return Object.assign({}, state, { currentGameList: action.payload });
    case "LOAD-DETAIL-GAMES":
      console.log("this is current games List", state.currentGame);
      return Object.assign({}, state, { currentGame: action.payload });
    default:
      return state;
  }
}
