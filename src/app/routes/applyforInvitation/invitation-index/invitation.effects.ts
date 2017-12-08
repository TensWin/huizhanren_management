import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromApply from './invitation.action'
import { InvitationService } from '../../../core/services/invitation.service'
import { LocalStorageService } from '../../../core/services/localstorage.service'
import { VisitorInvitation } from '../models/applyforInvitation.model';
import { NzNotificationService } from 'ng-zorro-antd'
import { Exhibitor } from '../../terminal-management/models/exhibition.model';

@Injectable()
export class InvitationEffects {
    @Effect()
    fetchInvitation$ = this.actions$
        .ofType(fromApply.FETCH_INVITATION)
        .map(
        (action: fromApply.FetchInvitationAction) => action.payload
        )
        .switchMap((params) => {
            if (params) {
                return this.invitationService
                    .fetchInvitation(params)
                    .map(invitation => {
                        let cutarr = invitation.slice((params.pageIndex - 1) * params.pageSize, params.pageIndex * params.pageSize)
                        return new fromApply.FetchInvitationSuccessAction(cutarr)
                    })
                    .catch(err => Observable.of(new fromApply.FetchInvitationFailureAction()))
            } else {
                return this.invitationService
                    .fetchInvitation()
                    .concatMap((invitation) => {
                        let cutarr = invitation.slice(0, 10)
                        return [
                            new fromApply.FetchInvitationSuccessAction(cutarr),
                            new fromApply.FetchVisitorLengthAction(invitation.length)
                        ]
                    })
                    .catch(err => Observable.of(new fromApply.FetchInvitationFailureAction()))
            }
        })
    @Effect()
    fetchExhibitor$ = this.actions$
        .ofType(fromApply.FETCH_EXHIBITOR)
        .map(
        (action: fromApply.FetchExhibitorAction) => action.payload
        )
        .switchMap((params) => {
            return this.invitationService
                .fetchExhibitor(params)
                .map(exhibitor => new fromApply.FetchExhibitorSuccessAction(exhibitor))
                .catch(err => Observable.of(new fromApply.FetchExhibitorFailureAction())
                )
        })
    @Effect()
    rejectVisitor$ = this.actions$
        .ofType(fromApply.REJECT_VISITOR)
        .map((action: fromApply.RejectVisitorAction) => action._id)
        .switchMap((_id) => {
            return this.invitationService
                .rejectVisitor(_id)
                .concatMap(() => [
                    new fromApply.RejectVisitorSuccessAction(),
                    new fromApply.FetchInvitationAction()
                ])
                .catch(() => Observable.of(new fromApply.RejectVisitorFailureAction()))
        })
    @Effect()
    agreeVisitor$ = this.actions$
        .ofType(fromApply.AGREE_VISITOR)
        .map((action: fromApply.AgreeVisitorAction) => action._id)
        .switchMap((_id) => {
            return this.invitationService
                .agreeVisitor(_id)
                .concatMap(() => [
                    new fromApply.AgreeVisitorSuccessAction(),
                    new fromApply.FetchInvitationAction()
                ])
                .catch(() => Observable.of(new fromApply.AgreeVisitorFailureAction()))
        })
    @Effect()
    rejectExhibitor$ = this.actions$
        .ofType(fromApply.REJECT_EXHIBITOR)
        .map((action: fromApply.RejectExhibitorAction) => action._id)
        .switchMap((_id) => {
            return this.invitationService
                .rejectExhibitor(_id)
                .concatMap(() => [
                    new fromApply.RejectExhibitorSuccessAction(),
                    new fromApply.FetchExhibitorAction()
                ])
                .catch(() => Observable.of(new fromApply.RejectExhibitorFailureAction()))
        })
    @Effect()
    agreeExhibitor$ = this.actions$
        .ofType(fromApply.AGREE_EXHIBITOR)
        .map((action: fromApply.AgreeExhibitorAction) => action._id)
        .switchMap((_id) => {
            return this.invitationService
                .agreeExhibitor(_id)
                .concatMap(() => [
                    new fromApply.AgreeExhibitorSuccessAction(),
                    new fromApply.FetchExhibitorAction()
                ])
                .catch(() => Observable.of(new fromApply.AgreeExhibitorFailureAction()))
        })
    @Effect({ dispatch: false })
    rejectVisitorSuccess$ = this.actions$
        .ofType(fromApply.REJECT_VISITOR_SUCCESS)
        .do(() => {
            this.notify.success('约请审核结果', '该用户的约请已拒绝')
        })
    @Effect({ dispatch: false })
    rejectExhibitorSuccess$ = this.actions$
        .ofType(fromApply.REJECT_EXHIBITOR_SUCCESS)
        .do(() => {
            this.notify.success('约请审核结果', '该用户的约请已拒绝')
        })
    @Effect({ dispatch: false })
    rejectVisitorFailure$ = this.actions$
        .ofType(fromApply.REJECT_VISITOR_FAILURE)
        .do(() => {
            this.notify.error('约请审核结果', '该用户的约请拒绝失败!')
        })
    @Effect({ dispatch: false })
    rejectExhibitorFailure$ = this.actions$
        .ofType(fromApply.REJECT_EXHIBITOR_FAILURE)
        .do(() => {
            this.notify.error('约请审核结果', '该用户的约请拒绝失败!')
        })
    @Effect({ dispatch: false })
    AgreeVisitorSuccess$ = this.actions$
        .ofType(fromApply.AGREE_VISITOR_SUCCESS)
        .do(() => {
            this.notify.success('约请审核结果', '该用户的约请已通过')
        })
    @Effect({ dispatch: false })
    AgreeExhibitorSuccess$ = this.actions$
        .ofType(fromApply.AGREE_EXHIBITOR_SUCCESS)
        .do(() => {
            this.notify.success('约请审核结果', '该用户的约请已通过')
        })
    @Effect({ dispatch: false })
    AgreeVisitorFailure$ = this.actions$
        .ofType(fromApply.AGREE_VISITOR_FAILURE)
        .do(() => {
            this.notify.error('约请审核结果', '该用户的约请通过失败')
        })
    @Effect({ dispatch: false })
    AgreeExhibitorFailure$ = this.actions$
        .ofType(fromApply.AGREE_EXHIBITOR_FAILURE)
        .do(() => {
            this.notify.error('约请审核结果', '该用户的约请通过失败')
        })
    constructor(
        private actions$: Actions,
        private invitationService: InvitationService,
        private notify: NzNotificationService,
        private localStorage: LocalStorageService
    ) { }
}