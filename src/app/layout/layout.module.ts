import { NgModule } from '@angular/core'

import { StoreModule } from '@ngrx/store'
// import { reducers } from './reducers'

import { SharedModule } from '../../share/share.module'
// import { LayoutComponent } from './layout.component'


@NgModule({
  imports: [
    SharedModule,
    // StoreModule.forFeature('layout', reducers)
  ],
  providers: [],
  declarations: [
    // LayoutComponent
  ],
})
export class LayoutModule {}