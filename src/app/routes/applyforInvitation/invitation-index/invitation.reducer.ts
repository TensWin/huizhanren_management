import * as fromApply from './invitation.action'
import { VisitorInvitation, ExhibitorInvitation } from '../models/applyforInvitation.model'

export interface State {
  loading: boolean
  invitation: VisitorInvitation[]
  exhibitor: ExhibitorInvitation[]
  length: number
}
const initialState: State = {
  loading: false,
  invitation: [],
  exhibitor: [],
  length: 0
}

export function reducer(
  state: State = initialState,
  action: fromApply.Actions
): State {
  switch (action.type) {
    case fromApply.FETCH_INVITATION:
      return {
        ...state,
        loading: true
      }
    case fromApply.FETCH_INVITATION_SUCCESS:
      return {
        ...state,
        loading: false,
        invitation: action.invitation
      }
    case fromApply.FETCH_EXHIBITOR:
      return {
        ...state,
        loading: true
      }
    case fromApply.FETCH_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        exhibitor: action.exhibitor
      }
    case fromApply.FETCH_VISITOR_LENGTH:
      return {
        ...state,
        length: action.length
      }
    case fromApply.AGREE_VISITOR:
      return {
        ...state,
        loading: false
      }
    case fromApply.AGREE_VISITOR_SUCCESS:
    case fromApply.AGREE_VISITOR_FAILURE:
    case fromApply.REJECT_VISITOR:
      return {
        ...state,
        loading: false
      }
    case fromApply.REJECT_VISITOR_SUCCESS:
    case fromApply.REJECT_VISITOR_FAILURE:
    case fromApply.AGREE_EXHIBITOR:
      return {
        ...state,
        loading: false
      }
    case fromApply.AGREE_EXHIBITOR_SUCCESS:
    case fromApply.AGREE_EXHIBITOR_FAILURE:
    case fromApply.REJECT_EXHIBITOR:
      return {
        ...state,
        loading: false
      }
    case fromApply.REJECT_EXHIBITOR_SUCCESS:
    case fromApply.REJECT_EXHIBITOR_FAILURE:
    default:
      return state
  }
}

export const getLoading = (state: State) => state.loading
export const getInvitation = (state: State) => state.invitation
export const getDetail = (state: State) => state.exhibitor
export const getLength = (state: State) => state.length