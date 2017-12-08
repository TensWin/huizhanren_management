import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { reducers } from './reducers'
import { ApplyEffects } from './applyforExhibition/applyforExhibition.effects'
import { SharedModule } from '../../../share/share.module'
import { Routes,RouterModule } from '@angular/router'

import { ApplyForExhibitionComponent } from './applyforExhibition/applyforExhibition.component'
import { ApplyFormComponent } from './modals/applyForm.component'
export const routes:Routes = [
    {
        path:'',
        component:ApplyForExhibitionComponent
    }
]
export const modals = [
    ApplyFormComponent
]
@NgModule({
    imports:[
        RouterModule.forChild(routes),
        SharedModule,
        StoreModule.forFeature('applyforExhibition',reducers),
        EffectsModule.forFeature([ApplyEffects])
    ],
    exports:[],
    declarations:[
        ApplyForExhibitionComponent,
        ...modals
    ],
    providers: [],
    entryComponents: [
        ...modals
    ]
})
export class ApplyforExhibitionModule {  }