import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable, Inject } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { Audience } from '../../routes/data-management/models/audience.model'
import { FetchAudienceParam } from '../../routes/data-management/data-management/data.action'
import { APIResponse } from '../interceptor/api-error-interceptor'

@Injectable()
export class DataService {
    private serverUrl = 'http://huizhanren.xiaovbao.cn'
    private queryAudienceUrl = '/v1/sys/ContactAction'
    constructor(private http: HttpClient){}
    fetchAudience():Observable<Audience[]> {
        return this.http
            .get(this.serverUrl + this.queryAudienceUrl)
            .map(resp => (resp as APIResponse).result)
            .catch(this.handleError)
    }
    searchAudience(
        param:FetchAudienceParam
    ):Observable<any>{
        return this.http
            .get(this.serverUrl + this.queryAudienceUrl)
            .map(resp => (resp as APIResponse).result.filter((single)=>single.tel === param.tel))          
            .catch(this.handleError)
    }
    private handleError(error: any) {
        const errMsg = error.message
          ? error.message
          : error.status ? `${error.status} - ${error.statusText}` : 'Server error'
        console.error(errMsg) // log to console instead
        return Observable.throw(errMsg)
    }
}