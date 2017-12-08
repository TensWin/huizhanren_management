import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { Exhibition,Exhibitor } from '../../routes/terminal-management/models/exhibition.model'
import { FetchExhibitorParam,SortExhibitionParam } from '../../routes/terminal-management/terminal-management/terminal.action'
import { APIResponse } from '../interceptor/api-error-interceptor'


@Injectable()
export class TerminalService {
  private serverUrl = 'http://huizhanren.xiaovbao.cn'
  private queryExhibitionUrl = '/v1/data/querybycondition/Exhibition/2e8d7c6a6cac2fac3990bc9e7bad2dbf/5a1d1298fce99c7421e9b645'
  private insertExhibitionUrl = '/v1/data/insert/Exhibition/2e8d7c6a6cac2fac3990bc9e7bad2dbf/5a1d1298fce99c7421e9b645'
  private updateExhibitionUrl = 'v1/data/update/Exhibition/5a093aef115b609457d0cc29/c3ede3d1d8576cdb52464810886b2fbf/5a0936b9115b609457d0cba3'
  private exhibitorUrl = '/v1/sys/Company'
  constructor(private http: HttpClient) {}

  fetchExhibitor(
    param: FetchExhibitorParam
  ): Observable<Exhibitor[]> {
    let query = `?Organizer=${param.Organizer}`
    if (!param.ItemName && !param.CompName){
      return this.http
        .get(this.serverUrl + this.exhibitorUrl + query)
        .map(resp => (resp as APIResponse).result.map(
          (item) => ({
            ItemName: item.ItemName,
            companyName: item.companyName,
            ispay: true,
            startTime: item.startTime,
            endTime: item.endTime
          })))
        .catch(this.handleError)
    } else if(param.ItemName && param.CompName){
      return this.http
        .get(this.serverUrl + this.exhibitorUrl + query)
        .map(resp => (resp as APIResponse).result.map(
          (item) => ({
            ItemName: item.ItemName,
            companyName: item.companyName,
            ispay: true,
            startTime: item.startTime,
            endTime: item.endTime
          })))
        .map(arr=>arr.filter(obj=>
          obj.ItemName.includes(param.ItemName) && obj.companyName.includes(param.CompName)))
        .catch(this.handleError)
    }else{
      return this.http
        .get(this.serverUrl + this.exhibitorUrl + query)
        .map(resp => (resp as APIResponse).result.map(
          (item) => ({
            ItemName: item.ItemName,
            companyName: item.companyName,
            ispay: true,
            startTime: item.startTime,
            endTime: item.endTime
          })))        
        .map(
          arr=>arr.filter(obj=>obj.ItemName.includes(param.ItemName) || obj.companyName.includes(param.CompName))
        )
        .catch(this.handleError)
    }
  }
  fetchExhibition(ExName:string): Observable<Exhibition[]> {
    return this.http
      .post(this.serverUrl + this.queryExhibitionUrl,{})
      .map(resp => (resp as APIResponse).result.map(
        (item) => ({
          ExName:item.ExName,
          Organizer:item.Organizer,
          Place:item.Place,
          StartTime:item.StartTime,
          EndTime:item.EndTime,
          CreatedBy:item.CreatedBy
        })
      ))             
      .catch(this.handleError)
  }
  addExhibition(exhibition:Exhibition): Observable<any> {
    return this.http
      .post(this.insertExhibitionUrl, {
        record : exhibition
      })
      .map(resp => (resp as APIResponse).result)
      .catch(this.handleError)
  }
  sortExhibition(
    param: SortExhibitionParam
  ): Observable<any> {
    let query = `?Organizer=${param.Organizer}`
    if (param.type === "ispay") {
      return this.http
        .get(this.serverUrl + this.exhibitorUrl + query)
        .map(resp => (resp as APIResponse).result.map(
          (item) => ({
            ItemName: item.ItemName,
            companyName: item.companyName,
            ispay: true,
            startTime: item.startTime,
            endTime: item.endTime
          })
        ))
        .map((arr) => 
          {return arr.filter(obj => obj.ispay === true).concat(arr.filter(obj => obj.ispay === false))}
        )
        .catch(this.handleError)
    } else if (param.type === "startTime") {
      return this.http
        .get(this.serverUrl + this.exhibitorUrl + query)
        .map(resp => (resp as APIResponse).result.map(
          (item) => ({
            ItemName: item.ItemName,
            companyName: item.companyName,
            ispay: true,
            startTime: item.startTime,
            endTime: item.endTime
          })
        ))
        .map((arr) => 
        arr.sort(
          (b,a) => parseInt(a.startTime.replace("/",'')) - parseInt(b.startTime.replace("/",''))
          )
        )
        .catch(this.handleError)
    }
    
  }
  private handleError(error: any) {
    const errMsg = error.message
      ? error.message
      : error.status ? `${error.status} - ${error.statusText}` : 'Server error'
    console.error(errMsg) // log to console instead
    return Observable.throw(errMsg)
  }
}