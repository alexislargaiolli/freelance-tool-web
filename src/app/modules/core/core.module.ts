import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [LoginComponent, LayoutComponent, HeaderComponent, SidenavComponent, ConfirmDialogComponent],
  imports: [
    SharedModule,
    FormsModule,
    RouterModule
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class CoreModule { }
