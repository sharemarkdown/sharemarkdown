import { documentConstants } from '../constants'

export function documents(state={}, action){
  switch (action.type){
    case documentConstants.GET_DOCUMENT_REQUEST:
      return state;
    case documentConstants.GET_DOCUMENT_SUCCESS:
      return Object.assign({}, {documents: action.documents})
    case documentConstants.GET_DOCUMENT_FAILURE:
      return state;

    case documentConstants.EDIT_DOCUMENT_REQUEST:
      return Object.assign({}, state, {current_document: action.document})

    case documentConstants.SAVE_DOCUMENT_REQUEST:
      return Object.assign({}, state, {current_document: action.document})

    case documentConstants.SHARE_DOCUMENT_REQUEST:
      return Object.assign({}, state, {share_request: true})
    case documentConstants.SHARE_DOCUMENT_SUCCESS:
      return Object.assign({}, state, {share_request: false})
    case documentConstants.SHARE_DOCUMENT_CANCEL:
      return Object.assign({}, state, {share_request: false})

    case documentConstants.CREATE_DOCUMENT_SUCCESS:
      return Object.assign({}, state, {create_document_request: false, documents: action.documents, current_document: action.document})
    case documentConstants.CREATE_DOCUMENT_REQUEST:
      return Object.assign({}, state, {create_document_request: true, create_type: "New File"})
    case documentConstants.CREATE_DOCUMENT_CANCEL:
      return Object.assign({}, state, {create_document_request: false})

    case documentConstants.CREATE_FOLDER_SUCCESS:
      return Object.assign({}, state, {create_folder_request: false})
    case documentConstants.CREATE_FOLDER_REQUEST:
      return Object.assign({}, state, {create_folder_request: true, create_type: "New Folder"})
    case documentConstants.CREATE_FOLDER_CANCEL:
      return Object.assign({}, state, {create_folder_request: false})

    case documentConstants.CLEAR_DOCUMENT:
      return {}
    default:
      return state;
  }
}