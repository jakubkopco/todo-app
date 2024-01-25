import {Injectable} from '@angular/core';
import {CustomDialogComponent} from "../components/custom-dialog/custom-dialog.component";
import {MatDialog} from "@angular/material/dialog";

export interface DialogData {
  title: string;
  message: string;
}


@Injectable({
  providedIn: 'root'
})
export class CustomDialogService {

  constructor(private dialog: MatDialog) {
  }

  openDialog(data: DialogData) {
    this.dialog.open(CustomDialogComponent, {
      width: '25%',
      data: {
        title: data.title,
        message: data.message
      }
    });
  }
}
