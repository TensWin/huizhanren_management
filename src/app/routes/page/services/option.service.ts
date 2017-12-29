import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs/Observable'

import { LocalStorageService } from '../../../core/services/localstorage.service'
import { APIResponse } from '../../../core/interceptor/api-error-interceptor'
import {
  User
} from '../models/user.model'

@Injectable()
export class OptionService {
  // private url = 'http://192.168.0.129:3012'
  private url = 'http://huizhanren.xiaovbao.cn'
  private loginUrl = '/v1/data/org/getExhibition?TenantId='
  constructor(
    private http: HttpClient,
    private local:LocalStorageService
  ) { }

  baseInfo(
    tenantId
  ): Observable<User[]> {
    // return Observable.of('login success').delay(1e3)

    return this.http
      .get(this.url + this.loginUrl + this.local.tenantId)       
      .map(res => (res as any).result)   
      .map(e => e.map(obj=>({
        ExName:obj.ExName,
        RecordId:obj.RecordId
      }))).do(a=>console.log(a))
      .catch(this.handleError)
  }

  private handleError(error: any) {
    let errMsg = error.status ?
      `${error.status}`
      : error.message ? error.message
        : '服务器繁忙 请稍候'

    if (errMsg === '500') {
      errMsg = '服务器繁忙 请稍候'
    }
    // console.error(errMsg) // log to console instead
    return Observable.throw(errMsg)
  }
}