import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {DialogData} from "../../services/custom-dialog.service";
@Component({
  selector: 'app-custom-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose
  ],
  template: `
    <h1 mat-dialog-title>{{ data.title }}</h1>
    <div mat-dialog-content>
      {{ data.message }}
    </div>
    <div class="dialogButton" mat-dialog-actions>
      <button mat-raised-button mat-dialog-close>Close</button>
    </div>
  `,
  styles: `
    .dialogButton {
      display: flex;
      justify-content: flex-end;
      padding: 24px;
    }
  `
})
export class CustomDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }
}
