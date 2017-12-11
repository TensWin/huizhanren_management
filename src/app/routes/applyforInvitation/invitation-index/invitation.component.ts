import { Component, OnInit } from '@angular/core'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'
import { Router, ActivatedRoute } from '@angular/router'

import { Subject } from 'rxjs/Subject'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Observable } from 'rxjs/Observable'
import { Store } from '@ngrx/store'


import {
  State,
  getInvitation,
  getExhibitor,
  getLength
} from '../reducers'
import {
  FetchExhibitorAction,
  FetchInvitationAction,
  RejectVisitorAction,
  AgreeVisitorAction,
  RejectExhibitorAction,
  AgreeExhibitorAction,
  FetchVisitorLengthAction
} from './invitation.action'

import { VisitorInvitation, ExhibitorInvitation } from '../models/applyforInvitation.model'
import { log } from 'util';

@Component({
  selector: 'app-invitation-page',
  templateUrl: './invitation.component.html',
  styleUrls:['./invitation.component.css']
})
export class ApplyForInvitationComponent {
  FetchInvitation$: Observable<any>
  FetchExhibitor$: Observable<any>
  InvitationLength$: Observable<any>
  rejectVisitor(_id) {
    const self = this
    this.confirmServ.confirm({
      title: '审核操作',
      content: '您确认要拒绝该约请?',
      onOk() {
        self.store.dispatch(new RejectVisitorAction(_id))
      },
      onCancel() {
      }
    });
  }

  agreeVisitor(_id) {
    const self = this
    this.confirmServ.confirm({
      title: '审核操作',
      content: '确定同意该约请吗?',
      onOk() {
        self.store.dispatch(new AgreeVisitorAction(_id))
      },
      onCancel() {

      }
    });
  }

  rejectExhibitor(_id) {
    const self = this
    this.confirmServ.confirm({
      title: '审核操作',
      content: '您确认要拒绝该约请?',
      onOk() {
        self.store.dispatch(new RejectExhibitorAction(_id))
      },
      onCancel() {
      }
    });
  }

  agreeExhibitor(_id) {
    const self = this
    this.confirmServ.confirm({
      title: '审核操作',
      content: '确定同意该约请吗?',
      onOk() {
        self.store.dispatch(new AgreeExhibitorAction(_id))
      },
      onCancel() {

      }
    });
  }
  Vindex = 1
  Vsize = 10
  Eindex = 1
  Esize = 10
  chooseInvitorData(index, size) {
    this.store.dispatch(new FetchInvitationAction({ pageIndex: index, pageSize: size }))
  }
  chooseExhibitorData(index, size) {
    this.store.dispatch(new FetchExhibitorAction({ pageIndex: index, pageSize: size }))
  }
  constructor(
    private store: Store<any>,
    private confirmServ: NzModalService
  ) { }
  ngOnInit() {
    this.initDataSource()
    this.initFetchInvitation()
    this.initFetchExhibitor()
  }
  private initDataSource() {
    this.FetchInvitation$ = this.store.select(getInvitation)
    this.FetchExhibitor$ = this.store.select(getExhibitor)
    this.InvitationLength$ = this.store.select(getLength)
  }
  private initFetchInvitation(): void {
    this.store.dispatch(new FetchInvitationAction())
  }
  private initFetchExhibitor(): void {
    this.store.dispatch(new FetchExhibitorAction())

  }
}