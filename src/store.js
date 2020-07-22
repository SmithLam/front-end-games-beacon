import { createStore } from "redux";

const initialstate = {
  currentUser: null,
  currentGameList: [],
};

function reducer(state = initialstate, action) {
  if (action.type === "LOGIN") {
    state.currentUser = action.payload;
    console.log("this is state user", state.currentUser);
  }
  if (action.type === "LOGOUT") {
    state.currentUser = null;
  }
  if (action.type === "LOAD-GAMES") {
    state.currentGameList = action.payload;
    console.log("this is current game List", state.currentGameList);
  }
  return { ...state };
}
const store = createStore(reducer);

export default store;
