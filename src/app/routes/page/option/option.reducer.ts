import * as fromOption from './option.action'
import { User } from '../models/user.model'

export interface State {
  loading: boolean,
  userinfo: User[]
}

const initialState: State = {
  loading: false,
  userinfo: []
}

type Action = fromOption.Actions

export function reducer(
  state: State = initialState,
  action: Action): State {
  switch (action.type) {
    case fromOption.BASE_INFO:
      return {
        ...state,
        loading: true
      }
    case fromOption.BASE_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        userinfo:action.user
      }
    case fromOption.BASE_INFO_FAILURE:      
      return {
        ...state,
        loading: false,
      }
    case fromOption.CHOOSE_OPTION:
      return {
        ...state,
        loading: true
      }
    case fromOption.CHOOSE_OPTION_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case fromOption.CHOOSE_OPTION_FAILURE:      
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}

export const getLoading = (state: State) => state.loading
export const getUserInfo = (state: State) => state.userinfo