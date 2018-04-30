import {documentConstants} from '../constants'
import {documentApi} from '../api'
import {push} from "react-router-redux";

export const documentActions={
  get_documents,
  edit_documents,
  save_content,
  create_document,
  clear_documents,
  share_document,
  get_files,
  delete_document,
};

function get_documents(){
  function request() { return {type: documentConstants.GET_DOCUMENT_REQUEST, }}
  function success(documents){return {type: documentConstants.GET_DOCUMENT_SUCCESS, documents}}


  return dispatch => {
    dispatch(request({}));
    documentApi.get_documents()
      .then(
        data => {
          dispatch(success(data));
        }
      )
  };

}

function get_files(id){
  function request() { return {type: documentConstants.GET_DOCUMENT_REQUEST, }}
  function success(documents){return {type: documentConstants.GET_DOCUMENT_SUCCESS, documents}}


  return dispatch => {
    dispatch(request({}));
    documentApi.get_files(id)
      .then(
        data => {
          dispatch(success(data));
        }
      )
  };

}


function edit_documents(id){
  function request(document) {return {type: documentConstants.EDIT_DOCUMENT_REQUEST, document}}

  return dispatch => {
    documentApi.get_document(id)
      .then(
        document =>{
          dispatch(request(document));
        }
      )
  }
}

function save_content(id, file_name, content){
  function success(document){return {type: documentConstants.SAVE_DOCUMENT_REQUEST, document}}

  return dispatch => {
    documentApi.save_content(id, file_name, content)
      .then(
        data => {
          dispatch(success(data))
        }
      )
  }
}

function create_document(title, folder_id){

  function success(document) {return {type: documentConstants.CREATE_DOCUMENT_SUCCESS, document}}
  function request() {return {type: documentConstants.CREATE_DOCUMENT_REQUEST,}}
  return dispatch => {
    dispatch(request())

    documentApi.create_document(title, folder_id)
      .then(
        (data) => {
          dispatch(push("/second"))
          dispatch(success(data))

        }
      )
  }
}

function delete_document(id, folder_id){
  function success() {return {type: documentConstants.DELETE_DOCUMENT_SUCCESS, }}
  return dispatch => {
    documentApi.delete_document(id)
      .then(
        () => {
          dispatch(success());
          if(folder_id === null){
            dispatch(get_documents());
          }
          else{
            dispatch(get_files(folder_id));
          }

        }
      )
  }
}

function share_document(file_id, username){
  function request() {return {type: documentConstants.SHARE_DOCUMENT_REQUEST,}}
  function success() {return {type: documentConstants.SHARE_DOCUMENT_SUCCESS}}

  return dispatch => {
    dispatch(request())
    documentApi.share_document(file_id, username)
      .then(
        () =>
          dispatch(success())
      )
  }
}


function clear_documents(){
  return {type: documentConstants.CLEAR_DOCUMENT, }
}


