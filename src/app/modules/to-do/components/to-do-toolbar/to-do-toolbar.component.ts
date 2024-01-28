import {Component, Input} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {AppRoutes} from "../../../../app.routes";
import {Router} from "@angular/router";
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-to-do-toolbar',
  standalone: true,
  imports: [
    MatIcon,
    MatToolbar
  ],
  template: `
    <mat-toolbar color="primary">
      <h3>todo app - {{ userEmail }}</h3>
      <mat-icon (click)="signOut()">logout</mat-icon>
    </mat-toolbar>
  `,
  styles: [`
    mat-toolbar {
      display: flex;
      width: 100%;
      justify-content: space-between;
      padding: 1rem;
      border-radius: 0.8rem 0.8rem 0 0;
    }
    @media screen and (max-width: 1200px) {
      mat-toolbar {
        border-radius: 0;
      }
    }
  `]
})
export class ToDoToolbarComponent {
  @Input({required: true}) userEmail: string;

  constructor(private readonly auth: AuthService, private router: Router) { }

  signOut() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/', AppRoutes.Auth]);
    });
  }
}
