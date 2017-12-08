import { NgModule } from '@angular/core';
import { ExhibitionDetailComponent } from './exhibitionDetail.component'
import { GetKeyNameService } from '../../../core/services/getKeyName.service';
import { SharedModule } from '../../../../share/share.module'
@NgModule({
    imports: [

    ],
    exports: [],
    declarations: [
      ExhibitionDetailComponent
    ],
    providers: [GetKeyNameService],
  })
  export class ExhibitionDetailModule { }