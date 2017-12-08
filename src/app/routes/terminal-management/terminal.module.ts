import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { reducers } from './reducers'
import { TerminalEffects } from './terminal-management/terminal.effects'
import { SharedModule } from '../../../share/share.module'
import { Routes,RouterModule } from '@angular/router'

import { TerminalComponent } from './terminal-management/terminal.component'
import { ExhibitionDetailComponent } from './child-component/exhibitionDetail.component'
import { GetKeyNameService } from '../../core/services/getKeyName.service';

export const routes: Routes = [
  {
    path: '',
    component: TerminalComponent
  },
  {
    path: 'exhibitionDetail',
    component: ExhibitionDetailComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    StoreModule.forFeature('terminalManagement',reducers),
    EffectsModule.forFeature([TerminalEffects])
  ],
  exports: [],
  declarations: [
    TerminalComponent,
    ExhibitionDetailComponent
  ],
  providers: [GetKeyNameService]
})
export class TerminalModule { }
