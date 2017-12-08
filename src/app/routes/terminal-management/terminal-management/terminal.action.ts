import { Action } from '@ngrx/store';
import { Exhibition,Exhibitor } from '../models/exhibition.model';

export const FETCH_EXHIBITION = 'Fetch Exhibition';
export const FETCH_EXHIBITION_SUCCESS = 'Fetch Exhibition Success';
export const FETCH_EXHIBITION_FAILURE = 'Fetch Exhibition Failure';

export const ADD_EXHIBITION = 'Add Exhibition';
export const ADD_EXHIBITION_SUCCESS = 'Add Exhibition Success';
export const ADD_EXHIBITION_FAILURE = 'Add Exhibition Failure';

export const DELETE_EXHIBITION = 'Delete Exhibition';
export const DELETE_EXHIBITION_SUCCESS = 'Delete Exhibition Success';
export const DELETE_EXHIBITION_FAILURE = 'Delete Exhibition Failure';

export const UPDATE_EXHIBITION = 'Update Exhibition';
export const UPDATE_EXHIBITION_SUCCESS = 'Update Exhibition Success';
export const UPDATE_EXHIBITION_FAILURE = 'Update Exhibition Failure';

export const FETCH_EXHIBITOR = 'Fetch Exhibitor';
export const FETCH_EXHIBITOR_SUCCESS = 'Fetch Exhibitor Success';
export const FETCH_EXHIBITOR_FAILURE = 'Fetch Exhibitor Failure';


export const DETAIL_EXHIBITION = 'Detail Exhibition';
export const DETAIL_EXHIBITION_SUCCESS = 'Detail Exhibition Success';
export const DETAIL_EXHIBITION_FAILURE = 'Detail Exhibition Failure';

export const SORT_EXHIBITION_NAME = 'Sort Exhibiton Name';
export const SORT_EXHIBITION_NAME_SUCCESS = 'Sort Exhibiton Name Success';
export const SORT_EXHIBITION_NAME_FAILURE = 'Sort Exhibiton Name Failure';

export const SEARCH_EXHIBITION_NAME = 'Search Exhibition Name';
export const SEARCH_EXHIBITION_NAME_SUCCESS = 'Search Exhibition Name Success';
export const SEARCH_EXHIBITION_NAME_FAILURE = 'Search Exhibition Name Failure';

export interface FetchExhibitorParam {
    Organizer:string,
    ItemName?:string,
    CompName?:string
}
export const emptyFetchExhibitorParam:FetchExhibitorParam = {
    Organizer:'中国自行车协会'
}
export interface SortExhibitionParam {
    Organizer:string,
    type?:string
}
export const emptySortExhibitionParam:SortExhibitionParam = {
    Organizer:'中国自行车协会'
}

export class FetchExhibitionAction implements Action{
    readonly type = FETCH_EXHIBITION;
    constructor( public ExName:string ){}
}
export class FetchExhibitionSuccessAction implements Action{
    readonly type = FETCH_EXHIBITION_SUCCESS;
    constructor( public exhibition:Exhibition[] ){}
}
export class FetchExhibitionFailureAction implements Action{
    readonly type = FETCH_EXHIBITION_FAILURE;
}

export class AddExhibitionAction implements Action{
    readonly type = ADD_EXHIBITION;
}
export class AddExhibitionSuccessAction implements Action{
    readonly type = ADD_EXHIBITION_SUCCESS;
    constructor( public exhibition:Exhibition[] ){}
}
export class AddExhibitionFailureAction implements Action{
    readonly type = ADD_EXHIBITION_FAILURE;
}

export class DeleteExhibitionAction implements Action{
    readonly type = DELETE_EXHIBITION;
}
export class DeleteExhibitionSuccessAction implements Action{
    readonly type = DELETE_EXHIBITION_SUCCESS;
    constructor( public exhibition:Exhibition[] ){}
}
export class DeleteExhibitionFailureAction implements Action{
    readonly type = DELETE_EXHIBITION_FAILURE;
}

export class UpdateExhibitionAction implements Action{
    readonly type = UPDATE_EXHIBITION;
}
export class UpdateExhibitionSuccessAction implements Action{
    readonly type = UPDATE_EXHIBITION_SUCCESS;
    constructor(public exhibition:Exhibition[] ){}
}
export class UpdateExhibitionFailureAction implements Action{
    readonly type = UPDATE_EXHIBITION_FAILURE;
}

export class FetchExhibitorAction implements Action{
    readonly type = FETCH_EXHIBITOR;
    constructor(public payload:FetchExhibitorParam = emptyFetchExhibitorParam){}
}
export class FetchExhibitorSuccessAction implements Action{
    readonly type = FETCH_EXHIBITOR_SUCCESS;
    constructor(public exhibitor:Exhibitor[] ){}
}
export class FetchExhibitorFailureAction implements Action{
    readonly type = FETCH_EXHIBITOR_FAILURE;
}

export class DetailExhibitionAction implements Action{
    readonly type = DETAIL_EXHIBITION;
}
export class DetailExhibitionSuccessAction implements Action{
    readonly type = DETAIL_EXHIBITION_SUCCESS;
}
export class DetailExhibitionFailureAction implements Action{
    readonly type = DETAIL_EXHIBITION_FAILURE;
}

export class SortExhibitionNameAction implements Action{
    readonly type = SORT_EXHIBITION_NAME;
    constructor(public payload:SortExhibitionParam = emptySortExhibitionParam){}
}
export class SortExhibitionNameSuccessAction implements Action{
    readonly type = SORT_EXHIBITION_NAME_SUCCESS;
    constructor(public exhibitor:Exhibitor[] ){}
}
export class SortExhibitionNameFailureAction implements Action{
    readonly type = SORT_EXHIBITION_NAME_FAILURE;
}

export class SearchExhibitionNameAction implements Action{
    readonly type = SEARCH_EXHIBITION_NAME;
}
export class SearchExhibitionNameSuccessAction implements Action{
    readonly type = SEARCH_EXHIBITION_NAME_SUCCESS;
}
export class SearchExhibitionNameFailureAction implements Action{
    readonly type = SEARCH_EXHIBITION_NAME_FAILURE;
}

export type Actions =
FetchExhibitionAction |
FetchExhibitionSuccessAction |
FetchExhibitionFailureAction |

AddExhibitionAction |
AddExhibitionSuccessAction |
AddExhibitionFailureAction |

DeleteExhibitionAction |
DeleteExhibitionSuccessAction |
DeleteExhibitionFailureAction |

UpdateExhibitionAction |
UpdateExhibitionSuccessAction |
UpdateExhibitionFailureAction |

FetchExhibitorAction |
FetchExhibitorSuccessAction |
FetchExhibitorFailureAction |

DetailExhibitionAction |
DetailExhibitionSuccessAction |
DetailExhibitionFailureAction |

SortExhibitionNameAction |
SortExhibitionNameSuccessAction |
SortExhibitionNameFailureAction |

SearchExhibitionNameAction |
SearchExhibitionNameSuccessAction |
SearchExhibitionNameFailureAction 

