import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromApply from '../applyforExhibition/applyforExhibition.reducer';
import * as fromRoot from '../../../reducers/index'

export interface ApplyState {
    apply:fromApply.State
}

export interface State extends fromRoot.State{
    applyforExhibition:ApplyState
}
export const reducers = {
    apply:fromApply.reducer
}

export const getApplyModuleState = createFeatureSelector<ApplyState>('applyforExhibition')

export const getApplyState = createSelector(getApplyModuleState,(state:ApplyState)=>state.apply)
export const getCheckingExhibition = createSelector(
    getApplyState,
    fromApply.getapplyRecord
)
export const uploadExhibition = createSelector(
    getApplyState,
    fromApply.getLoading
)