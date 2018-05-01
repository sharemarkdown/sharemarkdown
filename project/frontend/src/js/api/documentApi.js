/* global Promise*/


import axios from 'axios/index'

export const documentApi ={
  get_documents,
  get_document,
  save_content,
  create_document,
  share_document,
  get_files,
  delete_document,
  create_folder,
  // save_document,
};



function get_documents(){
  return new Promise((resolve, reject) =>{
    axios.get('/sharemarkdown/api/files')
      .then( response => {
        resolve(response.data)
      })
      .catch( error => {
        reject(error)
      })
  })

}
function get_files(id){
  return new Promise((resolve, reject) =>{
    axios.get('/sharemarkdown/api/files/' + id)
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

function create_document(file_name, folder_id){
  return new Promise((resolve, reject) =>{
    axios.post('/sharemarkdown/api/documents', {"file_name": file_name, "parent_folder": folder_id})
      .then( response => {
        resolve(response.data)
      })
      .catch( error => {
        reject(error)
      })
  })
}

function create_folder(folder_name, folder_id){
  return new Promise((resolve, reject) => {
    axios.post('/sharemarkdown/api/folders', {"folder_name": folder_name, "parent_folder": folder_id})
      .then( response => {
        resolve(response.data)
      })
      .catch( error => {
        reject(error)
      })
  })
}

function share_document(file_id, username){
  return new Promise((resolve, reject) => {
    axios.post('/sharemarkdown/api/share/doc',{"document": file_id, "user": username})
      .then(
        ()=>{
          resolve()
        }
      )
      .catch( error => {
        reject(error)
      })

  })
}

function delete_document(id){
  return new Promise((resolve, reject) => {
    axios.delete('/sharemarkdown/api/document/'+id)
      .then( response => {
        resolve(response)
      })
      .catch( error => {
        reject(error)
      })
  })
}
