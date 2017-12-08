import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { 
    State,
    // getCaptchaKey 
} from '../reducers'

import * as fromLogin from './login.action'
import { LoginService, errorMsgMap } from '../services/login.service'
// import { ACLService } from 'app/core/acl/acl.service'
// import { MenuService } from 'app/core/services/menu.service'
import { LocalStorageService } from '../../../core/services/localstorage.service'


@Injectable()
export class LoginEffects {
  @Effect()
  loginRequest$ = this.actions$
    .ofType(fromLogin.LOGIN_REQUEST)
    .map((action: fromLogin.LoginRequestAction) => action.payload)
    .switchMap(({ name, password}) => {
      return this.loginService
        .login(name, password)
        .map(function(user) {
          return new fromLogin.LoginSuccessAction(user)})
        .catch(errorMsg => {
          const msg = errorMsgMap[errorMsg] || errorMsg
          return Observable.of(new fromLogin.LoginFailureAction(msg))
        })
    })

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$
    .ofType(fromLogin.LOGIN_SUCCESS)
    .map((action: fromLogin.LoginSuccessAction) => action.user)
    .do(({ 
      tenantId, userId, name, companyName, organizerId
     }) => {
      this.localStorage.set('userId', userId)
      this.localStorage.set('tenantId', tenantId)
      this.localStorage.set('name', name)
      this.localStorage.set('companyName', companyName)
      this.localStorage.set('organizerId', organizerId)
      this.router.navigate(['hall'])
    })   

//   @Effect()
//   fetchCaptch$ = this.actions$.ofType(fromLogin.FETCH_CAPTCHA).switchMap(() => {
//     return this.loginService
//       .fetchCaptcha()
//       .map(captcha => new fromLogin.FetchCaptchaSuccessAction(captcha))
//       .catch(e => Observable.of(new fromLogin.FetchCaptchaFailureAction()))
//   })

  @Effect({ dispatch: false })
  logout$ = this.actions$.ofType(fromLogin.LOGOUT)
  .do(() => {
    // this.localStorage.remove('token')
    this.localStorage.remove('tenantId')

    this.router.navigate(['login'])
  })

  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private router: Router,
    private store: Store<State>,
    // private aclService: ACLService,
    // private menuService: MenuService,
    private localStorage: LocalStorageService
  ) {}
}
