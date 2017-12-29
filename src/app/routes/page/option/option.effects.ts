import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { 
    State
} from '../reducers'

import * as fromOption from './option.action'
import { OptionService } from '../services/option.service'
import { LocalStorageService } from '../../../core/services/localstorage.service'


@Injectable()
export class OptionEffects {
  @Effect()
  baseInfo$ = this.actions$
    .ofType(fromOption.BASE_INFO)
    .map((action: fromOption.BaseInfoAction) => action.tenantId)
    .switchMap((tenantId) => {
      return this.optionService
        .baseInfo(tenantId)
        .map(user =>{
         return new fromOption.BaseInfoSuccessAction(user)
        })         
        .catch(errorMsg =>
          Observable.of(new fromOption.BaseInfoFailureAction())
        )
    })

  @Effect({ dispatch: false })
  chooseOption$ = this.actions$
    .ofType(fromOption.CHOOSE_OPTION)
    .map((action: fromOption.ChooseOptionAction) => action.project)
    .do((project) => {
      this.localStorage.set('project', project)
      // this.router.navigate(['hall'])
    })   

  constructor(
    private actions$: Actions,
    private optionService: OptionService,
    private router: Router,
    private store: Store<State>,
    private localStorage: LocalStorageService
  ) {}
}