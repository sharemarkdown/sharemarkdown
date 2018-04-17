import { combineReducers } from "redux";
import articleReducer from "./articleReducer";
import {register} from "./registerReducer";
import {login} from "./authReducer";

export default combineReducers({
  articles: articleReducer,
  register,
  login
});
