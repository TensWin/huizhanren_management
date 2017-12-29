import { Routes } from '@angular/router'
import { AppComponent } from '../app.component'
import { HallComponent } from "./hall/hall.component"
import { LoginComponent } from './page/login/login.component'
import { OptionComponent } from './page/option/option.component'
import { LayoutComponent } from '../../app/layout/layout.component'
import { AuthGuard } from '../core/services/auth-guard.service'
export const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'option',component: OptionComponent
  },
  {
    path: '',
    component: LayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/hall',
        pathMatch: 'full'
      },
      {
        path: 'terminal-management',
        loadChildren: 'app/routes/terminal-management/terminal.module#TerminalModule'
      },
      {
        path: 'hall',
        component: HallComponent
      },
      {
        path: 'applyForExhibition',
        loadChildren: 'app/routes/applyforExhibition/applyforExhibition.module#ApplyforExhibitionModule'
      },
      {
        path: 'data-management',
        loadChildren: 'app/routes/data-management/data.module#DataModule'
      },
      {
        path: 'applyForInvitation',
        loadChildren: 'app/routes/applyforInvitation/applyforInvitation.module#ApplyforInvitationModule'
      },
      {
        path: '**',
        component: HallComponent
      }
    ]
  }
]
