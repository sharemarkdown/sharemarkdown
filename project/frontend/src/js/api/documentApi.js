/* global Promise*/


import axios from 'axios/index'

export const documentApi ={
  get_documents,
  get_document,
  save_content,
  create_document,
  // save_document,
};



function get_documents(){
  return new Promise((resolve, reject) =>{
    axios.get('/sharemarkdown/api/documents')
      .then( response => {
        resolve(response.data)
      })
      .catch( error => {
        reject(error)
      })
  })

}

function get_document(id){
  return new Promise((resolve, reject) =>{
    axios.get('/sharemarkdown/api/document/'+id)
      .then( response => {
        resolve(response.data)
      })
      .catch( error => {
        reject(error)
      })
  })

}

function save_content(id, file_name, content){
  return new Promise((resolve, reject) =>{
    axios.put('/sharemarkdown/api/document/' + id, {"file_name": file_name, "content": content})
      .then( response => {
        resolve(response.data)
      })
      .catch( error => {
        reject(error)
      })
  })

}

function create_document(file_name){
  return new Promise((resolve, reject) =>{
    axios.post('/sharemarkdown/api/documents', {"file_name": file_name, "content": ""})
      .then( response => {
        resolve(response.data)
      })
      .catch( error => {
        reject(error)
      })
  })
}
