import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { CurrentCompanyInterceptor } from './interceptors/current-company.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [LoginComponent, LayoutComponent, HeaderComponent, SidenavComponent, ConfirmDialogComponent],
  imports: [
    SharedModule,
    FormsModule,
    RouterModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CurrentCompanyInterceptor,
      multi: true
    },
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class CoreModule { }
