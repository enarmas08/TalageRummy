import { Inject, Injectable } from "@angular/core";
import { ErrorHandlingService } from "../services/error-handling.service";
import { OnInit } from '@angular/core';
import { ErrorDialogComponent } from "../components/error-dialog/error-dialog.component";
import { MatDialog } from "@angular/material/dialog";

export class ComponentBase {

  constructor(private dialog: MatDialog) {
  }

  public errorManager(error: string | Error | unknown): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      data: { error, message: "Erreur Angular" }
    });
  }

}
