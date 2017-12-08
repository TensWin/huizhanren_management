import { Action } from '@ngrx/store';
import { Audience } from '../models/audience.model';

export const FETCH_AUDIENCE = 'Fetch Audience'
export const FETCH_AUDIENCE_SUCCESS = 'Fetch Audience Success'
export const FETCH_AUDIENCE_FAILURE = 'Fetch Audience Failure'

export const SEARCH_AUDIENCE = 'Search Audience'
export const SEARCH_AUDIENCE_SUCCESS = 'Search Audience Success'
export const SEARCH_AUDIENCE_FAILURE = 'Search Audience Failure'

export interface FetchAudienceParam {
    tel:string
}

export class FetchAudienceAction implements Action{
    readonly type = FETCH_AUDIENCE
}
export class FetchAudienceSuccessAction implements Action{
    readonly type = FETCH_AUDIENCE_SUCCESS
    constructor(public audiences:Audience[]){}
}
export class FetchAudienceFailureAction implements Action{
    readonly type = FETCH_AUDIENCE_FAILURE
}

export class SearchAudienceAction implements Action{
    readonly type = SEARCH_AUDIENCE
    constructor(public tel:FetchAudienceParam){}
}
export class SearchAudienceSuccessAction implements Action{
    readonly type = SEARCH_AUDIENCE_SUCCESS
    constructor(public audience:Audience[]){}
}
export class SearchAudienceFailureAction implements Action{
    readonly type = SEARCH_AUDIENCE_FAILURE
}

export type Actions = 
FetchAudienceAction | 
FetchAudienceSuccessAction | 
FetchAudienceFailureAction |

SearchAudienceAction |
SearchAudienceSuccessAction |
SearchAudienceFailureAction
