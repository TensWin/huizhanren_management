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
    private visitorUrl = '/v1/data/InvitationInfo?role=O&organizerId='
    private exhibitorUrl = '/v1/data/ExhibitionInvitationInfo?role=O&organizerId='
    private optVistiorUrl = '/v1/data/InvitationInfo'
    private optExhibitorUrl = '/v1/data/ExhibitionInvitationInfo'
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
           .get(this.serverUrl + this.visitorUrl + this.local.organizerId)
           .map(resp =>(resp as APIResponse).result.map((item) => ({
                _id:item._id,
                createAt:item.CreatedAt.slice(0,-3),
                state:item.State,
                name:item.Name,
                title:item.JobTitle,
                company:item.CompName,
                // industry:item.industry,
                area:item.Province,
                organizer:item.Organizer
                })))
           .map(arr => arr.filter(obj=>obj.state === "未审核").concat(arr.filter(obj=>obj.state !== "未审核")))          
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
          .get(this.serverUrl + this.exhibitorUrl + this.local.organizerId)
          .map(resp => (resp as APIResponse).result.map((item) => ({
            _id:item._id,
            createAt:item.CreatedAt.slice(0,-3),
            state:item.State,
            name:item.companyName,
            // logo:item.logo,
            booth:item.BoothNo,
            industry:item.Industry,
            area:item.boothArea
            })))
          .map(arr => arr.filter(obj=>obj.state === "未审核").concat(arr.filter(obj=>obj.state !== "未审核")))               
          .catch(this.handleError)
    }

    rejectVisitor(_id) {
        // return Observable.of(true).delay(1e3)
        return this.http
            .put(this.serverUrl + this.optVistiorUrl +'/'+ _id,{
                params:{setValue:{State:"审核未通过"}}
            })
            .catch(this.handleError)
    }
    agreeVisitor(_id) {
        // return Observable.of(true).delay(1e3)
        return this.http
            .put(this.serverUrl + this.optVistiorUrl +'/'+ _id,{
                params:{setValue:{State:"未答复"}}
            })
            .catch(this.handleError)
    }
    rejectExhibitor(_id){
        return this.http
            .put(this.serverUrl + this.optExhibitorUrl +'/'+ _id,{
                params:{setValue:{State:"审核未通过"}}
            })
            .catch(this.handleError)
    }
    agreeExhibitor(_id){
        return this.http
            .put(this.serverUrl + this.optExhibitorUrl +'/'+ _id,{
                params:{setValue:{State:"未答复"}}
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