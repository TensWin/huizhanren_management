import { Component, OnInit } from '@angular/core'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'
import { Router, ActivatedRoute } from '@angular/router'

import { Subject } from 'rxjs/Subject'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Observable } from 'rxjs/Observable'
import { Store } from '@ngrx/store'

import {
  State,
  getCheckingExhibition,
  uploadExhibition
} from '../reducers'
import {
  BuildFormAction,
  SubmitFormAction,
  FetchCheckResultAction,
  FetchPassExhibitionAction,  
  FetchCheckingExhibitionAction  
} from './applyforExhibition.action'

import { ApplyFormComponent } from '../modals/applyForm.component'
import { ApplyRecords } from '../models/apply.model'
import { DestroyService } from '../../../core/services/destroy.service'

@Component({
  selector: 'app-applyforEx-page',
  templateUrl:'./applyforExhibition.component.html',
  styleUrls:['./applyforExhibition.component.css'],
  providers: [DestroyService]  
})
export class ApplyForExhibitionComponent{
  CheckingExhibition$: Observable<any>
  
  FormBuildSub: Subject<void> = new Subject<void>()
  
  toApply(){
    this.FormBuildSub.next()
  }

  constructor(
    private destroyService:DestroyService,
    private store: Store<any>,
    private modalService:NzModalService
  ){}
  ngOnInit(){
    this.initDataSource()
    this.initFetchCheckingExhibition()
    this.initApply()
  }
  private initDataSource(){
    this.CheckingExhibition$ = this.store.select(getCheckingExhibition)
  }
  private initFetchCheckingExhibition():void{
    this.store.dispatch(new FetchCheckingExhibitionAction())
  }
  private initApply(): void {
    const applyforExhibition$ = this.FormBuildSub
      .asObservable()
      .mergeMap(() => {
        return this.modalService.open({
          title: '申请展会',
          content: ApplyFormComponent,
          wrapClassName: 'modal-lg',
          footer: false,
          maskClosable: false
        })
      })
      .filter(e => {
        return typeof e !== 'string'
      })
      .takeUntil(this.destroyService)

    applyforExhibition$.subscribe((applyRecords: ApplyRecords) => {
    })
  }
}