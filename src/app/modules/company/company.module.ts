import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyFormComponent } from './components/company-form/company-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CompanyFormComponent],
  imports: [
    SharedModule,
    FormsModule,
    CompanyRoutingModule
  ]
})
export class CompanyModule { }
