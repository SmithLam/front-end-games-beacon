const initialstate = {
  currentUser: "",
  currentWishlist: [],
  currentWishListId: [],
  currentCart: [],
  currentTotalCartPrice: "",
};

export default function reducer(state = initialstate, action) {
  switch (action.type) {
    case "LOGIN":
      return Object.assign({}, state, {
        currentUser: action.payload.user,
        currentWishlist: action.payload.wishlist,
        currentWishlistId: action.payload.wishlistId,
        currentCart: action.payload.cart,
        currentTotalCartPrice: action.payload.totalCartPrice,
      });
    case "RELOAD-WISHLIST":
      return Object.assign({}, state, {
        currentWishlist: action.payload.wishlist,
        currentWishlistId: action.payload.wishlistId,
      });
    case "LOGOUT":
      return Object.assign({}, state, initialstate);
    default:
      return state;
  }
}
