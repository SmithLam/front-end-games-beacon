const initialstate = {
  currentUser: "",
  currentWishlist: [],
  currentCart: {},
};

export default function reducer(state = initialstate, action) {
  switch (action.type) {
    case "LOGIN":
      return Object.assign({}, state, {
        currentUser: action.payload.user,
        currentWishlist: action.payload.wishlist,
        currentCart: action.payload.cart,
      });
    case "LOGOUT":
      return Object.assign({}, state, initialstate);
    default:
      return state;
  }
}
