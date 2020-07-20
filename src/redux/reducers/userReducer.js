const initialstate = {
  currentUser: "",
};

export default function reducer(state = initialstate, action) {
  switch (action.type) {
    case "LOGIN":
      console.log("this is state user", state.currentUser);
      return Object.assign({}, state, { currentUser: action.payload });
    case "LOGOUT":
      return Object.assign({}, state, initialstate);
    // case "SET_WISH_LIST":
    //   return Object.assign({}, state, {
    //     currentUser: {
    //       wishlistRawgId: action.payload,
    //     },
    //   });
    default:
      return state;
  }
}
