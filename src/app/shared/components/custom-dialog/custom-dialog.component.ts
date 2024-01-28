import { Component, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

import { DialogData } from '../../services/custom-dialog.service';

@Component({
  selector: 'app-custom-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButton, MatDialogClose],
  template: `
    <h1 mat-dialog-title>{{ data.title }}</h1>
    <div mat-dialog-content>
      {{ data.message }}
    </div>
    <div class="dialog-button" mat-dialog-actions align="end">
      <button mat-raised-button mat-dialog-close>Close</button>
    </div>
  `,
  styles: [
    `
      .dialog-button {
        padding: 24px;
      }
    `
  ]
})
export class CustomDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) protected readonly data: DialogData) {}
}
