import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { InputAddressComponent } from './components/input-address/input-address.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [InputAddressComponent, InputAddressComponent],
  imports: [
    CommonModule, MaterialModule, FormsModule
  ],
  exports: [
    CommonModule, MaterialModule, InputAddressComponent
  ]
})
export class SharedModule { }
