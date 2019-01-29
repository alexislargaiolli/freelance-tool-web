import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-confirm-dialog',
    styleUrls: ['./confirm-dialog.component.scss'],
    template: ` <h2 mat-dialog-title>{{ title }}</h2>
                <mat-dialog-content>{{ message }}</mat-dialog-content>
                <mat-dialog-actions>
                    <button mat-stroked-button color="primary" mat-dialog-close>Annuler</button>
                    <button mat-flat-button color="primary" [mat-dialog-close]="true">Ok</button>
                </mat-dialog-actions>`,
})
export class ConfirmDialogComponent {
    public title: string;
    public message: string;

    constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) { }

    public accept() {
        this.dialogRef.close(true);
    }

    public decline() {
        this.dialogRef.close(false);
    }
}
