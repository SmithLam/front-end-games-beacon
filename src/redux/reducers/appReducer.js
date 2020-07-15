const initialstate = {
  loaded: false,
};

export default function reducer(state = initialstate, action) {
  if (action.type === "LOADED") {
    state.loaded = true;
    console.log("this is loading state", state.loaded);
  }
  return { ...state };
}
