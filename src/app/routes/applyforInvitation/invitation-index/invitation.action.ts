import { Action } from '@ngrx/store'
import { VisitorInvitation, ExhibitorInvitation } from '../models/applyforInvitation.model'

export const FETCH_INVITATION = 'Fetch Invitation'
export const FETCH_INVITATION_SUCCESS = 'Fetch Invitation Success'
export const FETCH_INVITATION_FAILURE = 'Fetch Invitation Failure'

export const FETCH_EXHIBITOR = 'Fetch Detail'
export const FETCH_DETAIL_SUCCESS = 'Fetch Detail Success'
export const FETCH_DETAIL_FAILURE = 'Fetch Detail Failure'

export const REJECT_VISITOR = 'Reject Visitor'
export const REJECT_VISITOR_SUCCESS = 'Reject Visitor Success'
export const REJECT_VISITOR_FAILURE = 'Reject Visitor Failure'

export const AGREE_VISITOR = 'Agree Visitor'
export const AGREE_VISITOR_SUCCESS = 'Agree Visitor Success'
export const AGREE_VISITOR_FAILURE = 'Agree Visitor Failure'

export const REJECT_EXHIBITOR = 'Reject Exhibitor'
export const REJECT_EXHIBITOR_SUCCESS = 'Reject Exhibitor Success'
export const REJECT_EXHIBITOR_FAILURE = 'Reject Exhibitor Failure'

export const AGREE_EXHIBITOR = 'Agree Exhibitor'
export const AGREE_EXHIBITOR_SUCCESS = 'Agree Exhibitor Success'
export const AGREE_EXHIBITOR_FAILURE = 'Agree Exhibitor Failure'

export const FETCH_VISITOR_LENGTH = 'Fetch Vistor Length'

export interface PageChooseParams {
    pageIndex: number,
    pageSize: number
}
// export const emptyPageChooseParams: PageChooseParams = {
//     pageIndex: 1,
//     pageSize: 10
// }

export class FetchVisitorLengthAction implements Action {
    readonly type = FETCH_VISITOR_LENGTH
    constructor(public length: number) { }
}

export class FetchInvitationAction implements Action {
    readonly type = FETCH_INVITATION
    constructor(public payload?: PageChooseParams) { }
}
export class FetchInvitationSuccessAction implements Action {
    readonly type = FETCH_INVITATION_SUCCESS
    constructor(public invitation: VisitorInvitation[]) { }
}
export class FetchInvitationFailureAction implements Action {
    readonly type = FETCH_INVITATION_FAILURE
}

export class FetchExhibitorAction implements Action {
    readonly type = FETCH_EXHIBITOR
    constructor(public payload?: PageChooseParams) { }
}
export class FetchExhibitorSuccessAction implements Action {
    readonly type = FETCH_DETAIL_SUCCESS
    constructor(public exhibitor: ExhibitorInvitation[]) { }
}
export class FetchExhibitorFailureAction implements Action {
    readonly type = FETCH_DETAIL_FAILURE
}

export class RejectVisitorAction implements Action {
    readonly type = REJECT_VISITOR
    constructor(public _id: string) { }
}
export class RejectVisitorSuccessAction implements Action {
    readonly type = REJECT_VISITOR_SUCCESS
}
export class RejectVisitorFailureAction implements Action {
    readonly type = REJECT_VISITOR_FAILURE
}

export class AgreeVisitorAction implements Action {
    readonly type = AGREE_VISITOR
    constructor(public _id: string) { }
}
export class AgreeVisitorSuccessAction implements Action {
    readonly type = AGREE_VISITOR_SUCCESS
}
export class AgreeVisitorFailureAction implements Action {
    readonly type = AGREE_VISITOR_FAILURE
}

export class RejectExhibitorAction implements Action {
    readonly type = REJECT_EXHIBITOR
    constructor(public _id: string) { }
}
export class RejectExhibitorSuccessAction implements Action {
    readonly type = REJECT_EXHIBITOR_SUCCESS
}
export class RejectExhibitorFailureAction implements Action {
    readonly type = REJECT_EXHIBITOR_FAILURE
}

export class AgreeExhibitorAction implements Action {
    readonly type = AGREE_EXHIBITOR
    constructor(public _id: string) { }
}
export class AgreeExhibitorSuccessAction implements Action {
    readonly type = AGREE_EXHIBITOR_SUCCESS
}
export class AgreeExhibitorFailureAction implements Action {
    readonly type = AGREE_EXHIBITOR_FAILURE
}

export type Actions =
    FetchInvitationAction |
    FetchInvitationSuccessAction |
    FetchInvitationFailureAction |

    FetchExhibitorAction |
    FetchExhibitorSuccessAction |
    FetchExhibitorFailureAction |

    RejectVisitorAction |
    RejectVisitorSuccessAction |
    RejectVisitorFailureAction |

    AgreeVisitorAction |
    AgreeVisitorSuccessAction |
    AgreeVisitorFailureAction |

    RejectExhibitorAction |
    RejectExhibitorSuccessAction |
    RejectExhibitorFailureAction |

    AgreeExhibitorAction |
    AgreeExhibitorSuccessAction |
    AgreeExhibitorFailureAction |

    FetchVisitorLengthAction