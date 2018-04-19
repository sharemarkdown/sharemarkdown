import {alertConstant } from '../constants'

export function alert(state={}, action){
  switch (action.type){
    case alertConstant.SUCCESS:
      return Object.assign({}, {type: "alert-success", message: action.message});
    case alertConstant.CLEAR:
      return {};
    case alertConstant.ERROR:
      return Object.assign({}, {type: "alert-error", message: action.message});
    default:
      return state;
  }
}