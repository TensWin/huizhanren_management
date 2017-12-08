import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { FormGroup, FormBuilder, FormControl } from '@angular/forms'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'
import { Subject } from 'rxjs/Subject'
import { Store } from '@ngrx/store';

import {
  State,
  getAudience
} from '../reducers'
import {
  FetchAudienceAction,
  SearchAudienceAction
} from './data.action'
import { Audience } from '../models/audience.model'
import { DestroyService } from '../../../core/services/destroy.service'
import { ViewMoreComponent } from '../modals/viewMore.component';

export interface SearchOption {
  tel: string
}
@Component({
  selector: 'app-data-page',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
  providers: [DestroyService]
})
export class DataComponent {
  phoneSearch = new FormGroup({
    phone: new FormControl()
  })

  Audience$: Observable<any>

  searchSub: Subject<SearchOption> = new Subject<SearchOption>()
  viewMoreSub: Subject<any> = new Subject<any>()
  search() {
    this.searchSub.next({
      tel: this.phoneSearch.value.phone
    })
  }
  viewMore() {
    this.viewMoreSub.next()
  }
  constructor(
    private store: Store<any>,
    private destroyService: DestroyService,
    private modalService: NzModalService
  ) { }
  ngOnInit() {
    this.initDataSource()
    this.initFetchAudience()
    this.initSearchAudience()
    this.initViewMore()
  }
  private initDataSource() {
    this.Audience$ = this.store.select(getAudience)
  }
  private initFetchAudience(): void {
    this.store.dispatch(new FetchAudienceAction())
  }
  private initSearchAudience(): void {
    this.searchSub.takeUntil(this.destroyService).subscribe(e => {
      this.store.dispatch(new SearchAudienceAction(e))
      this.phoneSearch.reset()
    })
    this.Audience$ = this.store.select(getAudience)
  }
  private initViewMore(): void {
    const viewMore$ = this.viewMoreSub
      .asObservable()
      .mergeMap(() => {
        return this.modalService.open({
          title: '全部展商',
          content: ViewMoreComponent,
          wrapClassName: 'modal-lg',
          footer: false,
          maskClosable: false
        })
      })
      .filter(e => {
        return typeof e !== 'string'
      })
      .takeUntil(this.destroyService)

    viewMore$.subscribe(() => {

    })
  }
}

