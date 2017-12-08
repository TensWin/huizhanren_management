import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreRouterConnectingModule } from '@ngrx/router-store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { AppComponent } from './app.component';
import { HallComponent } from "./routes/hall/hall.component";
import { routes } from "./routes/routes";
import { LoginComponent } from "./routes/page/login/login.component";

import { PagesModule } from './routes/page/pages.module'
import { TerminalService } from "./core/services/terminal.service";
import { ApplyService } from "./core/services/apply.service";
import { RoutesModule } from "./routes/routes.module";
import { NoopInterceptor } from './core/services/NoopInterceptor';
import { reducers } from './reducers/index';
import { LocalStorageService } from './core/services/localstorage.service';
import { DataService } from './core/services/data.service';
import { InvitationService } from './core/services/invitation.service'
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './core/services/auth-guard.service'
@NgModule({
  declarations: [
    AppComponent, 
    HallComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
    PagesModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    NgZorroAntdModule.forRoot(),
    StoreModule.forRoot(reducers),
    StoreRouterConnectingModule,
    StoreDevtoolsModule.instrument({
      maxAge: 42
    }),
    EffectsModule.forRoot([])
  ],
  providers: [
    TerminalService,
    ApplyService,
    LocalStorageService,
    DataService,
    InvitationService,
    AuthGuard
    //   {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: NoopInterceptor,
    //   multi: true,
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
