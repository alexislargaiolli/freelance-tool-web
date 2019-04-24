import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { InputAddressComponent } from './components/input-address/input-address.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './components/loading/loading.component';
import { ValuesPipe } from './pipes/values.pipe';
import { PeriodSelectComponent } from './components/period-select/period-select.component';

@NgModule({
  declarations: [
    InputAddressComponent,
    InputAddressComponent,
    LoadingComponent,
    ValuesPipe,
    PeriodSelectComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    MaterialModule,
    InputAddressComponent,
    LoadingComponent,
    ValuesPipe,
    PeriodSelectComponent
  ]
})
export class SharedModule { }
