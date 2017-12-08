import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from "rxjs/Observable";
import { Subject } from 'rxjs/Subject'


import {
  State,
  getExhibition,
  getExhibitor
} from '../reducers'
import {
  FetchExhibitorAction,
  FetchExhibitionAction,
  AddExhibitionAction,
  DeleteExhibitionAction,
  UpdateExhibitionAction,
  SearchExhibitionNameAction,
  SortExhibitionNameAction,
  FetchExhibitorParam,
  SortExhibitionParam
} from './terminal.action'
import { Exhibition, Exhibitor } from '../models/exhibition.model'
import { GetKeyNameService } from '../../../core/services/getKeyName.service';
import { DestroyService } from '../../../core/services/destroy.service'


export interface SearchOption {
  ItemName: string,
  CompName: string
}
export interface SortOption {
  type: string
}
@Component({
  selector: 'app-terminal-page',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css'],
  providers: [DestroyService]
})
export class TerminalComponent {
  searchForm = new FormGroup({
    name: new FormControl(),
    company: new FormControl()
  })

  search() {
    this.searchSub.next({
      ItemName: this.searchForm.value.name,
      CompName: this.searchForm.value.company
    })
  }
  sort(str) {
    this.sortSub.next({
      type: str
    })
  }
  info(contentTpl) {
    this.confirmServ.confirm({
      title: '您是否确认要删除这项内容',
      content: '',
      onOk() { },
    });
  }
  Exhibition$: Observable<any>
  Exhibitor$: Observable<any>

  searchSub: Subject<SearchOption> = new Subject<SearchOption>()
  sortSub: Subject<SortOption> = new Subject<SortOption>()
  constructor(
    private confirmServ: NzModalService,
    private fb: FormBuilder,
    private store: Store<any>,
    private router: Router,
    private route: ActivatedRoute,
    private getkeyName: GetKeyNameService,
    private destroyService: DestroyService
  ) { }
  ngOnInit() {
    this.initDataSource()
    this.initFetchExhibitor()
    this.initSearch()
    this.initSort()
    this.initSubscriber()
  }
  private initDataSource() {
    this.Exhibitor$ = this.store.select(getExhibitor)
  }
  private initFetchExhibitor(): void {
    this.store.dispatch(new FetchExhibitorAction())
  }
  private initSubscriber(): void {
    this.initSearch()
    this.initSort()
  }
  private initSearch(): void {
    this.searchSub.takeUntil(this.destroyService).subscribe(e => {
      const fetchExhibitorParam: FetchExhibitorParam = {
        Organizer: '中国自行车协会'
      }
      if (e.ItemName) {
        fetchExhibitorParam.ItemName = e.ItemName
      }
      if (e.CompName) {
        fetchExhibitorParam.CompName = e.CompName
      }
      this.store.dispatch(new FetchExhibitorAction(fetchExhibitorParam))
      this.searchForm.reset()
    })
  }
  private initSort(): void {
    this.sortSub.takeUntil(this.destroyService).subscribe(e => {
      const sortExhibitionParam: SortExhibitionParam = {
        Organizer: '中国自行车协会'
      }
      if (e.type) {
        sortExhibitionParam.type = e.type
      }
      this.store.dispatch(new SortExhibitionNameAction(sortExhibitionParam))
    })
  }
  public getExName(name): void {
    this.getkeyName.keyName = name
  }
}
