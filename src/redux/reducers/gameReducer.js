const initialstate = {
  currentGameList: [],
  currentGame: {},
  currentGameCount: 0,
  currentPage: 0,
  currentSearch: "",
};

export default function reducer(state = initialstate, action) {
  switch (action.type) {
    case "LOAD-GAMES":
      return Object.assign({}, state, {
        currentGameList: action.payload.gameList,
        currentGameCount: action.payload.gameCount,
        currentPage: action.payload.page,
      });
    case "LOAD-PAGE":
      return Object.assign({}, state, {
        currentPage: action.payload,
      });
    case "SEARCH-GAME":
      return Object.assign({}, state, {
        currentSearch: action.payload,
        currentPage: 1,
      });
    case "LOAD-DETAIL-GAMES":
      return Object.assign({}, state, { currentGame: action.payload });
    default:
      return state;
  }
}
