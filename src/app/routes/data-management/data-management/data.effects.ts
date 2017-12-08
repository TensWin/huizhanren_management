import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromData from './data.action'
import { LocalStorageService } from '../../../core/services/localstorage.service'
import { DataService } from '../../../core/services/data.service'

@Injectable()
export class DataEffects {
    @Effect()
    fetchAudience$ = this.actions$
        .ofType(fromData.FETCH_AUDIENCE)
        .switchMap(() => {
            return this.dataService
                .fetchAudience()
                .map(audiences => new fromData.FetchAudienceSuccessAction(audiences))
                .catch(err => Observable.of(new fromData.FetchAudienceFailureAction()))
        })
    @Effect()
    searchAudience$ = this.actions$
        .ofType(fromData.SEARCH_AUDIENCE)
        .map(
        (action: fromData.SearchAudienceAction) => action.tel
        )
        .switchMap((param) => {
            return this.dataService
                .searchAudience(param)
                .map(audience => new fromData.SearchAudienceSuccessAction(audience))
                .catch(err => Observable.of(new fromData.SearchAudienceFailureAction()))
        })
    constructor(
        private actions$: Actions,
        private dataService: DataService,
        private local: LocalStorageService
    ) { }
}