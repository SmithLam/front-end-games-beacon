import { createStore } from "redux";

const initialstate = {
  currentUser: null,
};

function reducer(state = initialstate, action) {
  if (action.type === "LOGIN") {
    state.currentUser = { ...action.payload };
    console.log("this is state user", state.currentUser);
  }
  if (action.type === "LOGOUT") {
    state.currentUser = null;
  }
  return { ...state };
}
const store = createStore(reducer);

export default store;
