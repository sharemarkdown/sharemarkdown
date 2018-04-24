/* global Promise */

import axios from 'axios';

export const userApi ={
  register,
  login
};

function register(user){
  return new Promise((resolve, reject) => {
    axios.post('/sharemarkdown/api/register', user)
      .then( response => {
        resolve(response)
      })
      .catch ( error => {
        reject(error)
      })
  })

}

function login(user){
  return new Promise((resolve, reject) =>{
    axios.post('/sharemarkdown/api/login', user)
      .then( response => {
        resolve(response)
      })
      .catch( error => {
        reject(error)
      })
  })
}
