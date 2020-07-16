const initialstate = {
  showModal: false,
};

export default function reducer(state = initialstate, action) {
  if (action.type === "SHOW-LOGIN-MODAL") {
    state.showModal = true;
  }
  if (action.type === "CLOSE-LOGIN-MODAL") {
    state.showModal = false;
  }
  return { ...state };
}
