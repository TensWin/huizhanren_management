import * as fromData from './data.action'
import { Audience } from '../models/audience.model'

export interface State {
    loading: boolean
    audience: Audience[]
}
const initialState: State = {
    loading: false,
    audience: []
}
export function reducer(
    state: State = initialState,
    action: fromData.Actions
): State {
    switch (action.type){
        case fromData.FETCH_AUDIENCE:
            return {
                loading: true,
                ...state
            }
        case fromData.FETCH_AUDIENCE_SUCCESS:
            return {
                loading: false,
                audience: action.audiences,
            }
        case fromData.SEARCH_AUDIENCE:
            return {
                loading: true,
                ...state
            }
        case fromData.SEARCH_AUDIENCE_SUCCESS:
            return {
                loading: false,
                audience: action.audience,
            }
        default:
            return state
    }
   }
export const getLoading = (state:State) => state.loading
export const getAudience = (state:State) => state.audience
