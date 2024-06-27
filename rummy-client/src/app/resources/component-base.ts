import { ErrorDialogComponent } from "../components/error-dialog/error-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { HttpErrorResponse } from "@angular/common/http";

export class ComponentBase {

  constructor(public dialog: MatDialog) { }

  public managerError(error: string | Error | HttpErrorResponse | unknown): void {
    let data: { error: any, message: string } | undefined;

    if (error instanceof HttpErrorResponse) {
      data = { error: error.error, message: error.error?.message || error.message };
    } else if (error instanceof Error) {
      data = { error, message: error.message };
    } else if (typeof error === "string") {
      data = { error, message: error };
    } else {
      data = { error: 'Unknown error', message: 'An unknown error occurred' };
    }

    if (data) {
      this.dialog.open(ErrorDialogComponent, { data });
    }
  }
}
