import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { reducers } from './reducers'
import { InvitationEffects } from './invitation-index/invitation.effects'
import { SharedModule } from '../../../share/share.module'
import { Routes,RouterModule } from '@angular/router'

import { ApplyForInvitationComponent } from './invitation-index/invitation.component'

export const routes:Routes = [
    {
        path:'',
        component:ApplyForInvitationComponent
    }
]


@NgModule({
    imports:[
        RouterModule.forChild(routes),
        SharedModule,
        StoreModule.forFeature('applyforInvitation',reducers),
        EffectsModule.forFeature([InvitationEffects])
    ],
    exports:[],
    declarations:[
        ApplyForInvitationComponent,
    ],
    providers: [],

})
export class ApplyforInvitationModule {}