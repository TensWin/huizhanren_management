import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromApply from '../invitation-index/invitation.reducer';
import * as fromRoot from '../../../reducers/index'

export interface ApplyState {
    apply:fromApply.State
}
export interface State extends fromRoot.State{
    applyforInvitation:ApplyState
}
export const reducers = {
    apply:fromApply.reducer
}

export const getApplyModuleState = createFeatureSelector<ApplyState>('applyforInvitation')

export const getApplyState = createSelector(getApplyModuleState,(state:ApplyState)=>state.apply)
export const getInvitation = createSelector(
    getApplyState,
    fromApply.getInvitation
)
export const getExhibitor = createSelector(
    getApplyState,
    fromApply.getDetail
)
export const getLength = createSelector(
    getApplyState,
    fromApply.getLength
)