import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { reducers } from './reducers'
import { DataEffects } from './data-management/data.effects'
import { SharedModule } from '../../../share/share.module'
import { DataComponent } from './data-management/data.component'
import { Routes,RouterModule } from '@angular/router'

import { ViewMoreComponent } from './modals/viewMore.component'

export const routes:Routes = [
  {
      path:'',
      component:DataComponent
  }
]
export const modals = [
  ViewMoreComponent
]
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    StoreModule.forFeature('dataManagement',reducers),
    EffectsModule.forFeature([DataEffects])
  ],
  exports: [],
  declarations: [
    DataComponent,
    ...modals
  ],
  providers: [],
  entryComponents: [
    ...modals
  ]
})
export class DataModule {}
