import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromData from '../data-management/data.reducer';
import * as fromRoot from '../../../reducers/index'

export interface DataState {
    data:fromData.State
}

export interface State extends fromRoot.State{
    dataManagement:DataState
}

export const reducers = {
    data:fromData.reducer
}

export const getDataModuleState = createFeatureSelector<DataState>('dataManagement')

export const getDataState = createSelector(getDataModuleState,(state:DataState)=>state.data)
export const getAudience = createSelector(
    getDataState,
    fromData.getAudience
)