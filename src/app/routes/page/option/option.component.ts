import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable'
import { Store } from '@ngrx/store'
import {
  State,
  getOptionLoading,
  getUserInfo
} from '../reducers'
import {
  BaseInfoAction
} from './option.action'
import { User } from '../models/user.model'
import { Router } from '@angular/router'
import { LocalStorageService } from '../../../core/services/localstorage.service'
@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {
  // options = [];
  // selectedOption;
  tenantId : string
  selectedOption
  BaseInfo$: Observable<any>
  constructor(
    private router: Router,
    private store: Store<any>,
    private local: LocalStorageService
  ) { }
  
  ngOnInit() {
    this.initDataSource()
    this.initBaseInfo()
    // setTimeout(_ => {
    //   this.options = [
    //     { value: '项目一能有多长长', label: '项目一能有多长长' },
    //     { value: 'lucy', label: 'Lucy' },
    //     { value: 'disabled', label: 'Disabled', disabled: true }
    //   ];
    //   this.selectedOption = this.options[ 0 ];
    // }, 100);
  }
  private initDataSource(){
    this.BaseInfo$ = this.store.select(getUserInfo)
    console.log(this.BaseInfo$)
  }
  private initBaseInfo(): void {
    this.tenantId = this.local.tenantId
    console.log(this.tenantId)
    this.store.dispatch(new BaseInfoAction(this.tenantId))
  }
  enter(){
    console.log(this.selectedOption)
    this.local.set('exhibitionId', this.selectedOption)
    this.router.navigate(['hall'])
  }
}
