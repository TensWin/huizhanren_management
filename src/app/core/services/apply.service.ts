import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { ApplyRecords } from '../../routes/applyforExhibition/models/apply.model'
import { FetchCheckParam } from '../../routes/applyforExhibition/applyforExhibition/applyforExhibition.action'
import { APIResponse } from '../interceptor/api-error-interceptor'


@Injectable()
export class ApplyService {
    private serverUrl = 'http://huizhanren.xiaovbao.cn'
    private insertExhibitionUrl = '/v1/data/insert/Exhibition/2e8d7c6a6cac2fac3990bc9e7bad2dbf/5a1d1298fce99c7421e9b645'
    private queryExhibitionUrl = '/v1/data/querybycondition/Exhibition/2e8d7c6a6cac2fac3990bc9e7bad2dbf/5a1d1298fce99c7421e9b645'
    constructor(private http:HttpClient){}

    fetchCheckingExhibition(
        param:FetchCheckParam
    ): Observable<ApplyRecords[]>{
        return this.http
           .post(this.serverUrl + this.queryExhibitionUrl,{
               "ExName":''
           })   
           .map(resp =>(resp as APIResponse).result.map(
               (item) => ({
                    ExName:item.ExName,
                    Organizer:item.Organizer,
                    Place:item.Place,
                    StartTime:item.StartTime,
                    EndTime:item.EndTime,
                    CreatedAt:item.CreatedAt.split(" ")[0]
               })
           ))
           .catch(this.handleError)
    }
    submitForm(
        param:ApplyRecords
    ) :Observable<any>{
        return this.http 
          .post(this.serverUrl + this.insertExhibitionUrl,{params:{record:param}})
          .map(resp => (resp as APIResponse).result)
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
