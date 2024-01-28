import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { Router } from '@angular/router';

import { AppRoutes } from '../../../../app.routes';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-to-do-toolbar',
  standalone: true,
  imports: [MatIcon, MatToolbar],
  template: `
    <mat-toolbar color="primary">
      <h3>
        todo app
        @if (userEmail) {
          - {{ userEmail }}
        }
      </h3>
      <mat-icon (click)="signOut()">logout</mat-icon>
    </mat-toolbar>
  `
})
export class ToDoToolbarComponent {
  protected readonly userEmail = this.auth.user()?.email;

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  signOut() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/', AppRoutes.auth]);
    });
  }
}
