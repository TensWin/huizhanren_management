import { Action } from '@ngrx/store'
import { User } from '../models/user.model'
import { Observable } from 'rxjs/Observable'

export const BASE_INFO = 'Base Info'
export const BASE_INFO_SUCCESS = 'Base Info Success'
export const BASE_INFO_FAILURE = 'Base Info Failure'

export const CHOOSE_OPTION = 'Choose Option'
export const CHOOSE_OPTION_SUCCESS = 'Choose Option Success'
export const CHOOSE_OPTION_FAILURE = 'Choose Option Failure'

export class BaseInfoAction implements Action {
  readonly type = BASE_INFO
  constructor(public tenantId: string) {}
}
export class BaseInfoSuccessAction implements Action {
  readonly type = BASE_INFO_SUCCESS
  constructor(public user: User[]) {}
}
export class BaseInfoFailureAction implements Action {
  readonly type =BASE_INFO_FAILURE
  constructor() {}
}

export class ChooseOptionAction implements Action {
  readonly type = CHOOSE_OPTION
  constructor(public project: string) {}
}
export class ChooseOptionSuccessAction implements Action {
  readonly type = CHOOSE_OPTION_SUCCESS
  constructor() {}
}
export class ChooseOptionFailureAction implements Action {
  readonly type =CHOOSE_OPTION_FAILURE
  constructor() {}
}

export type Actions =
BaseInfoAction |
BaseInfoSuccessAction |
BaseInfoFailureAction |

ChooseOptionAction |
ChooseOptionSuccessAction |
ChooseOptionFailureAction
