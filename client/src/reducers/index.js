<<<<<<< HEAD
import { combineReducers } from 'redux';

import movies from './movies'

export default combineReducers({ movies });
=======
import { combineReducers } from "redux";

import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
>>>>>>> sina
