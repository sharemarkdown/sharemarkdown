/* global console */

import {userConstants} from '../constants'
import {alertActions} from './alertActions'
import {documentActions} from './documentActions'

import { userApi } from '../api/index';
// import {history} from '../../router/history';
import {push} from "react-router-redux";
export const userActions ={
  register,
  login,
  logout,
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
          dispatch(push("/login"));
          dispatch(alertActions.success("Register Success"));

        },
        error => {
            var msg = 'Register Fail';
            if (error.response.data['username']) {
                msg = error.response.data['username']
            }
            dispatch(alertActions.error(msg));
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
          dispatch(push("/"));
          dispatch(alertActions.success("Login Success"));

        },
        error => {
            dispatch(alertActions.error("Login Fail"));
            console.log(error)
        }
      )
  };

}

function logout(){
  function logout(){ return {type: userConstants.LOGOUT,}}

  return dispatch => {
     dispatch(alertActions.clear());
     dispatch(documentActions.clear_documents());
     dispatch(logout());
     dispatch(push("/"));
  }
}
