const initialstate = {
  currentUser: "",
};

export default function reducer(state = initialstate, action) {
  if (action.type === "LOGIN") {
    state.currentUser = action.payload;
    console.log("this is state user", state.currentUser);
  }
  if (action.type === "LOGOUT") {
    state.currentUser = "";
  }
  return { ...state };
}
