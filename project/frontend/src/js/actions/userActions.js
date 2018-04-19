/* global console */

import {userConstants} from '../constants'
import {alertActions} from './alertActions'

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
          dispatch(alertActions.success("Register Success"));


        },
        error => {
          for (let i in error.data){
            dispatch(alertActions.error(error.data[i]));
          }

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
          for (let i in error.data){
            console.log(error.data[i])
          }
        }
      )
  };

}

function logout(){
  return {type: userConstants.LOGOUT, }
}
