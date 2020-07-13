import { createStore } from "redux";

const initialstate = {
  user: null
};

function reducer(state = initialstate, action) {
  if (action.type === "LOGIN") {
    state.user.isAuthenticated = true;
  }
  if (action.type === "LOGOUT") {
    state.user = null
  }
}
const store = createStore(reducer);

export default store;
