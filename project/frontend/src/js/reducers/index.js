import { combineReducers } from "redux";
import articleReducer from "./articleReducer";
import {register} from "./registerReducer";
import {login} from "./authReducer";
import {alert} from "./alertReducer";
import { routerReducer} from 'react-router-redux'


export default combineReducers({
  articles: articleReducer,
  register,
  login,
  alert,
  router: routerReducer,
});
