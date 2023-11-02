import { combineReducers } from "redux";
import movies from "./movies";
import { userReducer } from "./userReducer";
import { onlineUsersReducer } from "./onLineUserReducer";

export default combineReducers({
  movies: movies,
  user: userReducer,
  onlineUsers: onlineUsersReducer,
});
