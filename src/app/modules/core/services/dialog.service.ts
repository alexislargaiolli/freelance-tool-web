import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '@core/components/confirm-dialog/confirm-dialog.component';

@Injectable({
    providedIn: 'root'
})
export class DialogsService {

    constructor(private dialog: MatDialog) { }

    public confirm(title: string, message: string): Observable<boolean> {

        let dialogRef: MatDialogRef<ConfirmDialogComponent>;

        dialogRef = this.dialog.open(ConfirmDialogComponent);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed();
    }

    public confirmGeneric(): Observable<boolean> {
        return this.confirm('Confirmation', 'Êtes-vous sûr ?');
    }

}
