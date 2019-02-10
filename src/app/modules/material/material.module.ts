import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSortModule, MatTableModule, MatProgressBarModule, MatMenuModule,
  MatSidenavModule,
  MatListModule,
  MatToolbarModule,
  MatCardModule,
  MatDialogModule,
  MatSelectModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';

@NgModule({
  declarations: [],
  imports: [
    MatButtonModule, MatTableModule, MatFormFieldModule,
    MatInputModule, MatIconModule, MatSortModule, MatProgressBarModule,
    MatMenuModule, MatSidenavModule, MatListModule, MatToolbarModule,
    MatCardModule, CdkTableModule, MatDialogModule, MatSelectModule
  ],
  exports: [
    MatButtonModule, MatTableModule, MatFormFieldModule,
    MatInputModule, MatIconModule, MatSortModule, MatProgressBarModule,
    MatMenuModule, MatSidenavModule, MatListModule, MatToolbarModule,
    MatCardModule, CdkTableModule, MatDialogModule, MatSelectModule
  ]
})
export class MaterialModule { }
