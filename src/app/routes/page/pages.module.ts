import { NgModule } from '@angular/core';
import { SharedModule } from '../../../share/share.module'
 
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { reducers } from './reducers'

import { LoginEffects } from './login/login.effects'
// import { RegisterEffects } from './register/register.effects'
import { OptionEffects } from './option/option.effects'
import { LoginService } from './services/login.service'
// import { RegisterService } from './services/register.service'

// import { RegisterComponent } from './register/register.component'
// import { RegisterSuccessComponent } from './register-success/register-success.component'
import { OptionService } from './services/option.service'
import { LoginComponent } from './login/login.component'
// import { LockComponent } from './lock/lock.component'
import { ForgetComponent } from './forget/forget.component';
import { OptionComponent } from './option/option.component'

const effects = [
    LoginEffects, 
    // RegisterEffects
    OptionEffects
]
@NgModule({
    imports:[
        SharedModule,
        StoreModule.forFeature('pages',reducers),
        EffectsModule.forFeature(effects)
    ],
    declarations:[
        // RegisterComponent,
        LoginComponent,
        ForgetComponent,
        OptionComponent
    ],
    providers:[
        LoginService,
        // RegisterService
        OptionService
    ]
})
export class PagesModule{

}