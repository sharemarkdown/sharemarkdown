import {userConstants } from '../constants'

export function login(state={}, action){
  switch (action.type){
    case userConstants.LOGIN_REQUEST:
      return Object.assign({}, state, {logging_in: true});
    case userConstants.LOGIN_SUCCESS:
      return Object.assign({}, state, {
          logged_in: true,
          logging_in: false,
          user: action.user,
        }
        );
    case userConstants.LOGOUT:
      return {};
    default:
      return state;
  }
}