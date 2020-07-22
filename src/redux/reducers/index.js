import { combineReducers } from "redux";
import userReducer from "./userReducer";
import appReducer from "./appReducer";
import gameReducer from "./gameReducer";
import modalReducer from "./modalReducer"

const rootReducer = combineReducers({
  user: userReducer,
  app: appReducer,
  game: gameReducer,
  modal: modalReducer,
});

export default rootReducer;
