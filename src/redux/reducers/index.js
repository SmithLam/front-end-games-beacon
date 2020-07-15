import { combineReducers } from "redux";
import userReducer from "./userReducer";
import appReducer from "./appReducer";
import gameReducer from "./gameReducer";

const rootReducer = combineReducers({
  user: userReducer,
  app: appReducer,
  game: gameReducer,
});

export default rootReducer;
