import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../components/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor(private dialog: MatDialog) { }

  public errorManager(error: string | Error | unknown): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { error: error }
    });
  }
}
