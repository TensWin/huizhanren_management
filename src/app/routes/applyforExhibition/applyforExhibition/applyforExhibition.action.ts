import { Action } from '@ngrx/store'
import { ApplyRecords } from '../models/apply.model'

export const BUILD_FORM = 'Build Form'
export const BUILD_FORM_SUCCESS = 'Build Form Success'
export const BUILD_FORM_FAILURE = 'Build Form Failure'

export const SUBMIT_FORM = 'Submit form'
export const SUBMIT_FORM_SUCCESS = 'Submit form Success'
export const SUBMIT_FORM_FAILURE = 'Submit form Failure'

export const FETCH_CHECK_RESULT = 'Fetch Check Result'
export const FETCH_CHECK_RESULT_SUCCESS = 'Fetch Check Result Success'
export const FETCH_CHECK_RESULT_FAILURE = 'Fetch Check Result Failure'

export const FETCH_PASS_EXHIBITION = 'Fetch Pass Exhibition'
export const FETCH_PASS_EXHIBITION_SUCCESS = 'Fetch Pass Exhibition Success'
export const FETCH_PASS_EXHIBITION_FAILURE = 'Fetch Pass Exhibition Failure'

export const FETCH_CHECKING_EXHIBITION = 'Fetch Checking Exhibition'
export const FETCH_CHECKING_EXHIBITION_SUCCESS = 'Fetch Checking Exhibition Success'
export const FETCH_CHECKING_EXHIBITION_FAILURE = 'Fetch Checking Exhibition Failure'

export interface FetchCheckParam{
    ExName:string
}
export const emptyFetchCheckParam:FetchCheckParam ={
    ExName:''
}

export class BuildFormAction implements Action {
    readonly type = BUILD_FORM
}
export class BuildFormSuccessAction implements Action {
    readonly type = BUILD_FORM_SUCCESS
}
export class BuildFormFailureAction implements Action {
    readonly type = BUILD_FORM_FAILURE
}

export class SubmitFormAction implements Action {
    readonly type = SUBMIT_FORM
    constructor(public applyRecords:ApplyRecords){}
}
export class SubmitFormSuccessAction implements Action {
    readonly type = SUBMIT_FORM_SUCCESS
}
export class SubmitFormFailureAction implements Action {
    readonly type = SUBMIT_FORM_FAILURE
}

export class FetchCheckResultAction implements Action {
    readonly type = FETCH_CHECK_RESULT
}
export class FetchCheckResultSuccessAction implements Action {
    readonly type = FETCH_CHECK_RESULT_SUCCESS
}
export class FetchCheckResultFailureAction implements Action {
    readonly type = FETCH_CHECK_RESULT_FAILURE
}

export class FetchPassExhibitionAction implements Action {
    readonly type = FETCH_PASS_EXHIBITION
}
export class FetchPassExhibitionSuccessAction implements Action {
    readonly type = FETCH_PASS_EXHIBITION_SUCCESS
}
export class FetchPassExhibitionFailureAction implements Action {
    readonly type = FETCH_PASS_EXHIBITION_FAILURE
}

export class FetchCheckingExhibitionAction implements Action {
    readonly type = FETCH_CHECKING_EXHIBITION
    constructor(public payload:FetchCheckParam = emptyFetchCheckParam){}
}
export class FetchCheckingExhibitionSuccessAction implements Action {
    readonly type = FETCH_CHECKING_EXHIBITION_SUCCESS
    constructor(public applyRecords:ApplyRecords[] ){}
}
export class FetchCheckingExhibitionFailureAction implements Action {
    readonly type = FETCH_CHECKING_EXHIBITION_FAILURE
}

export type Actions = 
BuildFormAction |
BuildFormSuccessAction |
BuildFormFailureAction |

SubmitFormAction |
SubmitFormSuccessAction |
SubmitFormFailureAction |

FetchCheckResultAction |
FetchCheckResultSuccessAction |
FetchCheckResultFailureAction |

FetchPassExhibitionAction |
FetchPassExhibitionSuccessAction |
FetchPassExhibitionFailureAction |

FetchCheckingExhibitionAction |
FetchCheckingExhibitionSuccessAction | 
FetchCheckingExhibitionFailureAction 
