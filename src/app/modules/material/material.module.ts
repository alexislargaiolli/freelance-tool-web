import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSortModule, MatTableModule, MatProgressBarModule, MatMenuModule,
  MatSidenavModule,
  MatListModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    MatButtonModule, MatTableModule, MatFormFieldModule,
    MatInputModule, MatIconModule, MatSortModule, MatProgressBarModule,
    MatMenuModule, MatSidenavModule, MatListModule, MatToolbarModule
  ],
  exports: [
    MatButtonModule, MatTableModule, MatFormFieldModule,
    MatInputModule, MatIconModule, MatSortModule, MatProgressBarModule,
    MatMenuModule, MatSidenavModule, MatListModule, MatToolbarModule
  ]
})
export class MaterialModule { }
