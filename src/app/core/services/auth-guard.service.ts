import { Injectable } from '@angular/core'
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router'

import { LocalStorageService } from './localstorage.service'


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private localStorage: LocalStorageService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.localStorage.get('tenantId')) {
      return true
    }

    this.router.navigate(['login'])
    console.warn('no tenantId store in client!')
    return false
  }
}
