const initialstate = {
  currentUser: "",
  currentWishlist: [],
  currentWishListId: [],
  currentCart: [],
  currentCartIdList: [],
  currentTotalCartPrice: "",
};

export default function reducer(state = initialstate, action) {
  switch (action.type) {
    case "LOGIN":
      return Object.assign({}, state, {
        currentUser: action.payload.user,
      });
    case "RELOAD-WISHLIST":
      return Object.assign({}, state, {
        currentWishlist: action.payload.wishlist,
        currentWishlistId: action.payload.wishlistId,
      });
    case "RELOAD-CART":
      return Object.assign({}, state, {
        currentCart: action.payload.cart,
        currentCartIdList: action.payload.cartIdList,
        currentTotalCartPrice: action.payload.totalCartPrice,
      });
    case "LOGOUT":
      return Object.assign({}, state, initialstate);
    default:
      return state;
  }
}
