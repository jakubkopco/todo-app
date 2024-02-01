import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CustomDialogComponent } from '../components/custom-dialog/custom-dialog.component';

export interface DialogData {
  title: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomDialogService {
  constructor(private readonly dialog: MatDialog) {}

  openDialog(data: DialogData) {
    this.dialog.open(CustomDialogComponent, {
      data: {
        title: data.title,
        message: data.message
      }
    });
  }
}
