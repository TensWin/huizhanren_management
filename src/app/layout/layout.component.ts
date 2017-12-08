import { Component } from '@angular/core';
import { Router, NavigationEnd, RouteConfigLoadStart, NavigationError } from '@angular/router';

// import { SettingsService } from '@core/services/settings.service';
// import { ScrollService } from '@core/services/scroll.service';
import { NzMessageService } from 'ng-zorro-antd';
const NAVTITLES=["会展大厅","智能终端管理","数据管理","我的展会","约请审核"];
const MAINTITLES=['主导航','管理系统'];
@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls:['./layout.component.css']
})
export class LayoutComponent {
    isFetching = false;
    
    navTitles = NAVTITLES;
    mainTitles = MAINTITLES;
    pickedTitle:string = '会展大厅';
    pickedMainTitle:string = '主导航';
    isCollapsed = false;
    pickedOption(navTitle):void{
      this.pickedTitle = navTitle;
      this.pickedMainTitle = navTitle == '会展大厅'? '主导航':'管理系统';
    }
    constructor(
        router: Router,
        // scroll: ScrollService,
        private _message: NzMessageService,
        // public settings: SettingsService
    ) {
        // scroll to top in change page
        router.events.subscribe(evt => {
            if (!this.isFetching && evt instanceof RouteConfigLoadStart) {
                this.isFetching = true;
            }
            if (evt instanceof NavigationError) {
                this.isFetching = false;
                _message.error(`无法加载${evt.url}路由`, { nzDuration: 1000 * 3 });
                return;
            }
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            // setTimeout(() => {
            //     scroll.scrollToTop();
            //     this.isFetching = false;
            // }, 100);
        });
    }
}