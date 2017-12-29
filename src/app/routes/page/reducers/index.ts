import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromLogin from '../login/login.reducer'
// import * as fromRegister from '../register/register.reducer'
import * as fromOption from '../option/option.reducer'
import * as fromRoot from '../../../reducers'

export interface PagesState {
  login: fromLogin.State
//   register: fromRegister.State
  option: fromOption.State
}

export interface State extends fromRoot.State {
  pages: PagesState
}

export const reducers = {
  login: fromLogin.reducer,
//   register: fromRegister.reducer
  option: fromOption.reducer
}

export const getPagesModuleState = createFeatureSelector<PagesState>('pages')

export const getLoginState = createSelector(getPagesModuleState, (state: PagesState) => state.login)
export const getLoginLoading = createSelector(
  getLoginState,
  fromLogin.getLoading
)
export const getLogin = createSelector(getLoginState, fromLogin.getLogin)
export const getLoginName = createSelector(getLoginState, fromLogin.getLoginName)
export const getTenantId = createSelector(getLoginState, fromLogin.getTenantId)
export const getLoginFailureMsg = createSelector(getLoginState, fromLogin.getLoginFailureMsg)
// export const getCaptchaUrl = createSelector(getLoginState, fromLogin.getCaptchaUrl)
// export const getCaptchaKey = createSelector(getLoginState, fromLogin.getCaptchaKey)


// export const getRegisterState = createSelector(
//   getPagesModuleState,
//   (state: PagesState) => state.register
// )
// export const getRegisterLoading = createSelector(
//   getRegisterState,
//   fromRegister.getLoading
// )
export const getOptionState = createSelector(
  getPagesModuleState, (state: PagesState) => state.option
)
export const getOptionLoading = createSelector(
  getOptionState,
  fromOption.getLoading
)
export const getUserInfo = createSelector(getOptionState, fromOption.getUserInfo)
