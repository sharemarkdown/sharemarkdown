import {userConstants } from '../constants'

export function user(state={}, action){
  switch (action.type){
    case userConstants.LOGIN_SUCCESS:
      return Object.assign({}, state, {
          logged_in: true,
          logging_in: false,
          user: action.user,
        }
      );
    case userConstants.LOGOUT:
      return {};
      case user
    default:
      return state;
  }
}