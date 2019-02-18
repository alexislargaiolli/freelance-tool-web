import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSortModule, MatTableModule, MatProgressBarModule, MatMenuModule,
  MatSidenavModule,
  MatListModule,
  MatToolbarModule,
  MatCardModule,
  MatDialogModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatButtonToggleModule,
  MAT_DATE_FORMATS
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

export const CUSTOM_DATE_FORMATS = {
  parse: {
    dateInput: 'L',
  },
  display: {
    dateInput: 'L',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'L',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [],
  imports: [
    MatButtonModule, MatTableModule, MatFormFieldModule,
    MatInputModule, MatIconModule, MatSortModule, MatProgressBarModule,
    MatMenuModule, MatSidenavModule, MatListModule, MatToolbarModule,
    MatCardModule, CdkTableModule, MatDialogModule, MatSelectModule,
    MatSlideToggleModule, MatCheckboxModule, MatDatepickerModule, MatMomentDateModule,
    MatButtonToggleModule
  ],
  exports: [
    MatButtonModule, MatTableModule, MatFormFieldModule,
    MatInputModule, MatIconModule, MatSortModule, MatProgressBarModule,
    MatMenuModule, MatSidenavModule, MatListModule, MatToolbarModule,
    MatCardModule, CdkTableModule, MatDialogModule, MatSelectModule,
    MatSlideToggleModule, MatCheckboxModule, MatDatepickerModule,
    MatMomentDateModule, MatButtonToggleModule
  ],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
  ]
})
export class MaterialModule { }
