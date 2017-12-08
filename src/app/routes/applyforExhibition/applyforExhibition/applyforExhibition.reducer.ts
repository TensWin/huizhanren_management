import * as fromApply from './applyforExhibition.action'
import { ApplyRecords } from '../models/apply.model'

export interface State {
    loading: boolean
    applyRecord:ApplyRecords[]
}
const initialState: State = {
    loading:false,
    applyRecord:[]
}

export function reducer(
    state: State = initialState,
    action:fromApply.Actions
):State {
  switch(action.type){
    case fromApply.BUILD_FORM:
      return {
        ...state,
        loading:true
      }
    case fromApply.SUBMIT_FORM:
      return {
        ...state,
        loading:true
      }
    case fromApply.FETCH_CHECK_RESULT:
      return {
        ...state,
        loading:true
      }
    case fromApply.FETCH_CHECKING_EXHIBITION:
      return {
        ...state,
        loading:true
      }
    case fromApply.FETCH_CHECKING_EXHIBITION_SUCCESS:
      return {
        applyRecord:action.applyRecords,
        loading:false  
      }
    case fromApply.FETCH_PASS_EXHIBITION:
      return {
        ...state,
        loading:true
      }
    case fromApply.FETCH_PASS_EXHIBITION_FAILURE:
      return {
        ...state,
        loading:false
      }
    default:
      return state
  }
}

export const getLoading = (state:State) => state.loading
export const getapplyRecord = (state:State) => state.applyRecord