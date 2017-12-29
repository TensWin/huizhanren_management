import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { PageChooseParams } from '../../routes/applyforInvitation/invitation-index/invitation.action'
import { VisitorInvitation,ExhibitorInvitation } from '../../routes/applyforInvitation/models/applyforInvitation.model'
import { LocalStorageService } from '../../core/services/localstorage.service'
import { APIResponse } from '../interceptor/api-error-interceptor'

export const emptyPageChooseParams: PageChooseParams = {
    pageIndex: 1,
    pageSize: 10
}
@Injectable()
export class InvitationService {
    private serverUrl = 'http://huizhanren.xiaovbao.cn'
    private visitorUrl = '/v1/data/org/invitationInfo?exhibitionId='
    private exhibitorUrl = '/v1/data/org/ExhibitionInvitationInfo?exhibitionId='
    private optVistiorUrl = '/v1/data/update/inviinfo'
    private optExhibitorUrl = '/v1/data/update/exhiinviinfo'
    constructor(
        private http:HttpClient,
        private local:LocalStorageService
    ){}
    fetchInvitation(params = emptyPageChooseParams): Observable<VisitorInvitation[]>{
        // return Observable.of([{
        //             name:'name1',
        //             title:'title1',
        //             company:'company1',
        //             industry:'industry1',
        //             area:'area1',
        //             organizer:'organizer1'
        //             }]).delay(1e3)
        return this.http
           .get(this.serverUrl + this.visitorUrl + this.local.exhibitionId)
           .map(resp =>(resp as APIResponse).result
                .map((item) => {
                    console.log(item)
                    if (item.Type == '0'){
                        console.log(0)
                        return {
                            _id:item._id,
                            createAt:item.CreatedAt.slice(0,-3),
                            state:item.State,
                            name:item.Initator[0].Name,
                            company:item.Initator[0].CompName,
                            // industry:item.industry,
                        }
                    }else if(item.Type == '1'){
                        // console.log(1)
                        let audience = item.Initator[0].LinkList.map(item=>item.LinkName).join(",")
                        return {
                            _id:item._id,
                            createAt:item.CreatedAt.slice(0,-3),
                            state:item.State,
                            name:item.Receiver[0].CompName,
                            company:audience,
                            // industry:item.industry,
                        }
                    }
                })).do(a=>console.log(a))
           .map(arr => arr.filter(obj=>obj.state === "2").concat(arr.filter(obj=>obj.state !== "2")))          
           .catch(this.handleError)
    }
    fetchExhibitor(params = emptyPageChooseParams) :Observable<ExhibitorInvitation[]>{
        // return Observable.of([{
        //     name:'name1',
        //     logo:'logo1',
        //     booth:'booth1',
        //     industry:'industry1',
        //     area:'area1',
        //     }]).delay(1e3)
        return this.http 
          .get(this.serverUrl + this.exhibitorUrl + this.local.exhibitionId).do(a=>console.log(a))
          .map(resp => (resp as APIResponse).result.map((item) => {
              if(item.Receiver == false){
                   return ({
                        _id:item._id,
                        createAt:item.CreatedAt.slice(0,-3),
                        state:item.State,
                        name:"未注明",
                        // booth:item.Receiver[0].BoothNo,
                        initatorComp:item.Initator[0].companyName
                   })
              }else{
                  return ({
                        _id:item._id,
                        createAt:item.CreatedAt.slice(0,-3),
                        state:item.State,
                        name:item.Receiver[0].companyName,
                        // booth:item.Receiver[0].BoothNo,
                        initatorComp:item.Initator[0].companyName
                  })
              }
          }))
          .map(arr => arr.filter(obj=>obj.state === "2").concat(arr.filter(obj=>obj.state !== "2")))               
          .catch(this.handleError)
    }

    rejectVisitor(_id) {
        // return Observable.of(true).delay(1e3)
        return this.http
            .put(this.serverUrl + this.optVistiorUrl,{
                params:{"InvitationInfoId":_id,setValue:{State:"1"}}
            })
            .catch(this.handleError)
    }
    agreeVisitor(_id) {
        // return Observable.of(true).delay(1e3)
        return this.http
            .put(this.serverUrl + this.optVistiorUrl,{
                params:{"InvitationInfoId":_id,setValue:{State:"2"}}
            })
            .catch(this.handleError)
    }
    rejectExhibitor(_id){
        return this.http
            .put(this.serverUrl + this.optExhibitorUrl,{
                params:{"ExhiInvInfoId":_id,setValue:{State:"1"}}
            })
            .catch(this.handleError)
    }
    agreeExhibitor(_id){
        return this.http
            .put(this.serverUrl + this.optExhibitorUrl,{
                params:{"ExhiInvInfoId":_id,setValue:{State:"2"}}
            })
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