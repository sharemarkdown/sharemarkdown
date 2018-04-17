import {userConstants } from '../constants'

export function register(state={}, action){
  switch (action.type){
    case userConstants.REGISTER_REQUEST:
      return Object.assign({}, state, {registering: true});
    case userConstants.REGISTER_SUCCESS:
      return Object.assign({}, state, {registered: true, registering: false});
    case userConstants.REGISTER_FAILURE:
      return state;
    default:
      return state;
  }
}