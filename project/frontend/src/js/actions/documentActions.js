import {documentConstants} from '../constants'
import {documentApi} from '../api'

export const documentActions={
  get_documents,
  edit_documents,
  save_content,
  create_document,
  clear_documents,
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

function edit_documents(document){
  function request(document) {return {type: documentConstants.EDIT_DOCUMENT_REQUEST, document}}

  return dispatch => {
    dispatch(request(document));
  }
}

function save_content(id, content){
  function success(document){return {type: documentConstants.SAVE_DOCUMENT_REQUEST, document}}

  return dispatch => {
    documentApi.save_content(id, content)
      .then(
        data => {
          dispatch(success(data))
        }
      )
  }
}

function create_document(title){
  function success(documents, document) {return {type: documentConstants.CREATE_DOCUMENT_SUCCESS, documents, document}}

  return dispatch => {
    documentApi.create_document(title)
      .then(
        (data) => {

          dispatch(success(data, data[data.length-1]))
        }
      )
  }
}

function clear_documents(){
  return {type: documentConstants.CLEAR_DOCUMENT, }
}


