import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTerminal from '../terminal-management/terminal.reducer';
import * as fromRoot from '../../../reducers/index'

export interface TerminalState {
    terminal:fromTerminal.State
}

export interface State extends fromRoot.State{
    terminalManagement:TerminalState
}
export const reducers = {
    terminal:fromTerminal.reducer
}

export const getTerminalModuleState = createFeatureSelector<TerminalState>('terminalManagement')

export const getTerminalState = createSelector(getTerminalModuleState,(state:TerminalState)=>state.terminal)
export const getExhibition = createSelector(
    getTerminalState,
    fromTerminal.getExhibition
)
export const getExhibitor = createSelector(
    getTerminalState,
    fromTerminal.getExhibitor
)