import { Component,OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder,FormControl } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from "rxjs/Observable";

import {
    State,
    getExhibition,
    getExhibitor
} from '../reducers'
import { FetchExhibitionAction } from '../terminal-management/terminal.action'
import { GetKeyNameService } from '../../../core/services/getKeyName.service';

@Component({
    selector: 'app-exhibitionDetail-page',
    templateUrl:'./exhibitionDetail.component.html',
    styleUrls:['./exhibitionDetail.component.css']
  })
export class ExhibitionDetailComponent {
    Exhibition$:Observable<any>
    ExName:string
    constructor(
        private store: Store<any>,
        private getKeyName:GetKeyNameService
    ){}
    
    ngOnInit() {
        this.initChildData()
        this.initFetchExhibition()      
    }
    private initChildData(){
        this.Exhibition$ = this.store.select(getExhibition)
    }
    private initFetchExhibition():void{
        this.ExName = this.getKeyName.keyName
        this.store.dispatch(new FetchExhibitionAction(this.ExName))
    }
}
















