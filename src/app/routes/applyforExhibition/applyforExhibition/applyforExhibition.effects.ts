import { NzNotificationService } from 'ng-zorro-antd'

import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromApply from './applyforExhibition.action'
import { ApplyService } from '../../../core/services/apply.service'
import { LocalStorageService } from '../../../core/services/localstorage.service'

@Injectable()
export class ApplyEffects {
    @Effect()
    fetchCheckingExhibition$ = this.actions$
        .ofType(fromApply.FETCH_CHECKING_EXHIBITION)
        .map(
            (action:fromApply.FetchCheckingExhibitionAction) =>action.payload
        )
        .switchMap((param)=>{
            return this.applyService
            .fetchCheckingExhibition(param)
            .map(checkingExhibition => new fromApply.FetchCheckingExhibitionSuccessAction(checkingExhibition))
            .catch(err =>Observable.of(new fromApply.FetchCheckingExhibitionFailureAction))
        })
    @Effect()
    applyForm$ = this.actions$
        .ofType(fromApply.SUBMIT_FORM)
        .map(
            (action:fromApply.SubmitFormAction) =>action.applyRecords
        )
        .switchMap((param)=>{
            return this.applyService
               .submitForm(param)
               .concatMap(()=>[
                   new fromApply.SubmitFormSuccessAction(),
                   new fromApply.FetchCheckingExhibitionAction()
               ])
               .catch(()=>Observable.of(new fromApply.SubmitFormFailureAction()))
        })
    @Effect({ dispatch: false })
    applyFormSuccess$ = this.actions$
        .ofType(fromApply.SUBMIT_FORM_SUCCESS)
        .do((_) => {
        this.notify.success("展会申请",'会展申请已提交,请耐心等待审核结果!')
        })
    
    @Effect({ dispatch: false })
    applyFormFailure$ = this.actions$
        .ofType(fromApply.SUBMIT_FORM_FAILURE)
        .do((_) => {
        this.notify.error('展会申请', '会展申请提交失败,请尝试重新填写表单!')
        })
      
    constructor(
        private actions$:Actions,
        private applyService:ApplyService,
        private local:LocalStorageService,
        private notify:NzNotificationService
    ){}
}