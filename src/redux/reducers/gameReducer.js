const initialstate = {
  currentGameList: [],
  currentGame: {},
  like: false,
};

export default function reducer(state = initialstate, action) {
  switch (action.type) {
    case "LOAD-GAMES":
      return Object.assign({}, state, { currentGameList: action.payload });
    case "LOAD-DETAIL-GAMES":
      return Object.assign({}, state, { currentGame: action.payload });
    default:
      return state;
  }
}
