
import { combineReducers } from 'redux';
import movies from "./movies";
import { userReducer } from "./userReducer";

export default combineReducers({ movies: movies, user: userReducer });
