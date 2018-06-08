import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import { MessageDialogComponent } from '../common/message-dialog.component';
import { ConfirmDialogComponent } from '../common/confirm-dialog.component';

@Injectable()
export class DialogService {

  constructor(private dialog: MatDialog) { }

  message(text: string) {
    const dialogRef = this.dialog.open(MessageDialogComponent, { data: { text } });
    return dialogRef.afterClosed();
  }

  confirm(text: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: { text } });
    return dialogRef.afterClosed();
  }

}
