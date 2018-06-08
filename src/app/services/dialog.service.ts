import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import { MessageDialogComponent } from '../common/message-dialog.component';
import { ConfirmDialogComponent } from '../common/confirm-dialog.component';

@Injectable()
export class DialogService {

  constructor(dialog: MatDialog) { }

  message(text: string) {
  }

  confirm(text: string) {
  }

}
