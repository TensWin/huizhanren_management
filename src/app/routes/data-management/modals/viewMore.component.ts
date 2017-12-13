import { Component, Input, OnInit } from '@angular/core'
import { Pipe, PipeTransform } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable'


import { Store } from '@ngrx/store'
import {
    State,
    getAudience
  } from '../reducers'
  import {
    FetchAudienceAction,
    SearchAudienceAction
  } from '../data-management/data.action'
import * as moment from 'moment'; 

@Component({
    selector: 'app-viewMore',
    templateUrl:'./viewMore.component.html', 
    // styleUrls:['./viewMore.component.css']
  })
export class ViewMoreComponent implements OnInit {
    private _tel:string
    @Input()
    public set telphone(value:string){
        this._tel = value
    }
    Audience$: Observable<any>
    constructor(
        private store: Store<any>,
    ){}
    ngOnInit(){
        this.store.dispatch(new FetchAudienceAction())
        this.Audience$ = this.store.select(getAudience)       
    }
}

