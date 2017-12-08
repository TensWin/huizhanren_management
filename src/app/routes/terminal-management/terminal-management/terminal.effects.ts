import { NzNotificationService } from 'ng-zorro-antd'

import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromTerminal from './terminal.action'
import { TerminalService } from '../../../core/services/terminal.service'
import { LocalStorageService } from '../../../core/services/localstorage.service'


@Injectable()
export class TerminalEffects {
  @Effect()
  fetchExhibitor$ = this.actions$
    .ofType(fromTerminal.FETCH_EXHIBITOR)
    .map(
        (action:fromTerminal.FetchExhibitorAction)=>action.payload
    )
    .switchMap((param)=>{
        return this.terminalService
        .fetchExhibitor(param)      
        .map(exhibitor => new fromTerminal.FetchExhibitorSuccessAction(exhibitor))
        .catch(err =>Observable.of(new fromTerminal.FetchExhibitorFailureAction()))
    })
  @Effect()
  fetchExhibition$ = this.actions$
    .ofType(fromTerminal.FETCH_EXHIBITION)
    .map(
      (action:fromTerminal.FetchExhibitionAction)=>action.ExName
    )
    .switchMap((Name)=>{
      return this.terminalService
      .fetchExhibition(Name)
      .map(arr=>arr.filter(obj=>obj.ExName === Name))      
      .map(exhibition=> {return new fromTerminal.FetchExhibitionSuccessAction(exhibition)})      
      .catch(err =>Observable.of(new fromTerminal.FetchExhibitionFailureAction()))
    })
  @Effect()
  SortExhibition$ = this.actions$
    .ofType(fromTerminal.SORT_EXHIBITION_NAME)
    .map(
      (action:fromTerminal.SortExhibitionNameAction)=>action.payload
    )
    .switchMap((param)=>{
      return this.terminalService
      .sortExhibition(param)      
      .map(exhibitor => new fromTerminal.FetchExhibitorSuccessAction(exhibitor))
      .catch(err =>Observable.of(new fromTerminal.FetchExhibitorFailureAction()))
    })
  constructor(
    private actions$: Actions,
    private terminalService: TerminalService,
    private local: LocalStorageService,
    private notify: NzNotificationService
  ) {}
}