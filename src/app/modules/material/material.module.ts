import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSortModule, MatTableModule, MatProgressBarModule, MatMenuModule,
  MatSidenavModule,
  MatListModule,
  MatToolbarModule,
  MatCardModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    MatButtonModule, MatTableModule, MatFormFieldModule,
    MatInputModule, MatIconModule, MatSortModule, MatProgressBarModule,
    MatMenuModule, MatSidenavModule, MatListModule, MatToolbarModule,
    MatCardModule
  ],
  exports: [
    MatButtonModule, MatTableModule, MatFormFieldModule,
    MatInputModule, MatIconModule, MatSortModule, MatProgressBarModule,
    MatMenuModule, MatSidenavModule, MatListModule, MatToolbarModule,
    MatCardModule
  ]
})
export class MaterialModule { }
