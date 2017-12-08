import { Component, Input, OnInit } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { NzModalSubject, NzNotificationService } from 'ng-zorro-antd'

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable'

import { ApplyRecords } from '../models/apply.model'
import { Store } from '@ngrx/store'
import { State,uploadExhibition } from '../reducers'
import { SubmitFormAction,FetchCheckingExhibitionAction } from '../applyforExhibition/applyforExhibition.action'

import * as moment from 'moment'; 

@Component({
    selector: 'app-apply-form',
    templateUrl:'./applyForm.component.html', 
    styleUrls:['./applyForm.component.css']
  })
  export class ApplyFormComponent implements OnInit {
      applyForm: FormGroup
      applySub: Subject<any> = new Subject<any>()     

      _startDate = null;
      _endDate = null;
      newArray = (len) => {
        const result = [];
        for (let i = 0; i < len; i++) {
          result.push(i);
        }
        return result;
      };
      _startValueChange = () => {
        if (this._startDate > this._endDate) {
          this._endDate = null;
        }
      };
      _endValueChange = () => {
        if (this._startDate > this._endDate) {
          this._startDate = null;
        }
      };
      _disabledStartDate = (startValue) => {
        if (!startValue || !this._endDate) {
          return false;
        }
        return startValue.getTime() >= this._endDate.getTime();
      };
      _disabledEndDate = (endValue) => {
        if (!endValue || !this._startDate) {
          return false;
        }
        return endValue.getTime() <= this._startDate.getTime();
      };
      get _isSameDay() {
        return this._startDate && this._endDate && moment(this._startDate).isSame(this._endDate, 'day')
      }

      constructor(
        private subject: NzModalSubject,
        private fb: FormBuilder,
        private store: Store<State>,
        private notify: NzNotificationService
      ){}
      getFormControl(name) {
        return this.applyForm.controls[name]
      }
      getFormControlError(name: string, error: string) {
        return this.getFormControl(name).dirty && this.getFormControl(name).hasError(error)
      }
      cancel() {
        this.subject.destroy('onCancel')
      }
      ok() {
        this.applyForm.value.StartTime = moment(this._startDate).format("YYYY/MM/DD")
        this.applyForm.value.EndTime = moment(this._endDate).format("YYYY/MM/DD")
        this.applySub.next(this.applyForm.value)
        this.subject.destroy('onOk') 
      }
      ngOnInit(){
          this.buildForm()
          this.initSubscriber()
      }
      private buildForm(): void {
        this.applyForm = this.fb.group({
          ItemName: [null, Validators.required],
          Organizer: [null, [Validators.required]],
          Place: [null, [Validators.required]],
          StartTime: [null, [Validators.required]],
          EndTime: [null, [Validators.required]],
          description: [null]
        })
      }
      private initSubscriber(): void {
        this.applySub
          .map(item=>({
              ExName:item.ItemName,
              Organizer:item.Organizer,
              Place:item.Place,
              StartTime:item.StartTime,
              EndTime:item.EndTime
          }))
          .subscribe(value => {    
              this.store.dispatch(new SubmitFormAction(value))
          })
      }
  }