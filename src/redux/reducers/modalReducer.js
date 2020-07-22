const initialstate = {
  showModal: false,
};

export default function reducer(state = initialstate, action) {
  switch (action.type) {
    case "SHOW-LOGIN-MODAL":
      return Object.assign({}, state, { showModal: true });
    case "CLOSE-LOGIN-MODAL":
      return Object.assign({}, state, { showModal: false });
    default:
      return state;
  }
}
