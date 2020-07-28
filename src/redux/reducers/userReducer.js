const initialstate = {
  currentUser: "",
  currentWishlist: [],
  currentWishListId: [],
  currentCart: [],
  currentCartIdList: [],
  currentTotalCartPrice: "",
  currentOwned: [],
  currentOwnedIdList: [],
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
    case "RELOAD-OWNED":
      return Object.assign({}, state, {
        currentOwned: action.payload.owned,
        currentOwnedIdList: action.payload.ownedIdList,
      });
    case "LOGOUT":
      return Object.assign({}, state, initialstate);
    default:
      return state;
  }
}
