import { documentConstants } from '../constants'

export function documents(state={}, action){
  switch (action.type){
    case documentConstants.GET_DOCUMENT_REQUEST:
      return state;
    case documentConstants.GET_DOCUMENT_SUCCESS:
      return Object.assign({}, state, {documents: action.documents})
    case documentConstants.GET_DOCUMENT_FAILURE:
      return state;
    case documentConstants.EDIT_DOCUMENT_REQUEST:
      return Object.assign({}, state, {current_document: action.document})
    case documentConstants.SAVE_DOCUMENT_REQUEST:
      return Object.assign({}, state, {current_document: action.document})
    case documentConstants.CREATE_DOCUMENT_SUCCESS:
      return Object.assign({}, state, {documents: action.documents, current_document: action.document})
    case documentConstants.CLEAR_DOCUMENT:
      return {}
    default:
      return state;
  }
}