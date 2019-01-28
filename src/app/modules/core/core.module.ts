import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

@NgModule({
  declarations: [LoginComponent, LayoutComponent, HeaderComponent, SidenavComponent],
  imports: [
    SharedModule,
    FormsModule,
    RouterModule
  ]
})
export class CoreModule { }
