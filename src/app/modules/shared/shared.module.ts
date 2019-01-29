import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { InputAddressComponent } from './components/input-address/input-address.component';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [InputAddressComponent, InputAddressComponent, LoadingComponent],
  imports: [
    CommonModule, MaterialModule, FormsModule
  ],
  exports: [
    CommonModule, MaterialModule, InputAddressComponent, LoadingComponent
  ]
})
export class SharedModule { }
