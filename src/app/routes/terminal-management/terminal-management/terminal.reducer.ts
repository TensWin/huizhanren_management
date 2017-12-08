import * as fromTerminal from './terminal.action';
import { Exhibition, Exhibitor } from '../models/exhibition.model';
 
export interface State {
    loading: boolean
    exhibition: Exhibition[]
    exhibitor:Exhibitor[]
}
const initialState: State = {
    loading: false,
    exhibition: [],
    exhibitor:[]
}
export function reducer(
    state: State = initialState,
    action: fromTerminal.Actions
  ): State {
    switch (action.type) {
      case fromTerminal.FETCH_EXHIBITOR:
        return {
          ...state,
          loading: true
      }
      case fromTerminal.FETCH_EXHIBITOR_SUCCESS:
        return {
          ...state,
          loading: false,
          exhibitor: action.exhibitor
      }
      case fromTerminal.FETCH_EXHIBITION:
        return {
          ...state,
          loading: true
        }
      case fromTerminal.FETCH_EXHIBITION_SUCCESS:
        return {
          ...state,
          loading: false,
          exhibition: action.exhibition
        }
      case fromTerminal.ADD_EXHIBITION_SUCCESS:
        return {
          ...state,
          loading: false,
          exhibition: action.exhibition
        }
      case fromTerminal.DELETE_EXHIBITION_SUCCESS:
        return {
          ...state,
          loading: false,
          exhibition: action.exhibition
        }
  
      case fromTerminal.UPDATE_EXHIBITION_SUCCESS:
        return {
          ...state,
          loading: false,
          exhibition: action.exhibition
        }
      case fromTerminal.SORT_EXHIBITION_NAME:
        return {
          ...state,
          loading: true
        }
      case fromTerminal.SORT_EXHIBITION_NAME_SUCCESS:
        return {
          ...state,
          loading:false,
          exhibitor: action.exhibitor
        }
      default:
        return state
    }
  }

export const getLoading = (state:State) => state.loading
export const getExhibition = (state:State) => state.exhibition
export const getExhibitor = (state:State) => state.exhibitor