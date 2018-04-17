/* global console */

import {userConstants} from '../constants'

import { userApi } from '../api/index';
// import {history} from '../../router/history';

export const userActions ={
  register,
  login
};

function register(user_){
  function request() { return {type: userConstants.REGISTER_REQUEST, }}
  function success() { return {type: userConstants.REGISTER_SUCCESS, }}

  return dispatch => {
    dispatch(request({}));
    const user = {
      "username" : user_.username,
      "password" : user_.password,
      "first_name": user_.firstName,
      "last_name" : user_.lastName,
      "email" : user_.email,
    }
    userApi.register(user)
      .then(
        () =>{
          dispatch(success());
          // history.push("/login");

        },
        error => {
          console.log(error);
        }
      )
  };

}

function login(username, password){
  function request() { return {type: userConstants.LOGIN_REQUEST, }}
  function success(user) { return {type: userConstants.LOGIN_SUCCESS, user}}
  return dispatch => {
    dispatch(request({}));
    const user = {
      "username" : username,
      "password" : password
    }
    userApi.login(user)
      .then(
        user =>{
          dispatch(success(Object.assign({}, user.data, {"username":username})));

        },
        error => {
          console.log(error);
        }
      )
  };

}