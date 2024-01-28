import { Component, effect } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

import { AppRoutes } from '../../../../app.routes';
import { CustomDialogService } from '../../../../shared/services/custom-dialog.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  standalone: true,
  imports: [
    MatFormField,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    MatLabel,
    MatCard,
    MatError,
    ReactiveFormsModule,
    MatInput,
    MatButton,
    MatProgressSpinner
  ],
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent {
  protected loading = false;
  readonly signInForm: FormGroup;

  constructor(
    private readonly supabase: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly dialogService: CustomDialogService,
    private readonly authService: AuthService
  ) {
    effect(() => {
      if (this.authService.isLogged()) {
        this.router.navigate(['/', AppRoutes.todo]);
      }
    });
    this.signInForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  async signIn(): Promise<void> {
    if (this.signInForm.valid) {
      try {
        this.loading = true;
        this.supabase.signIn(this.signInForm.value).then(res => {
          if (res.error) {
            this.dialogService.openDialog({
              title: 'Error',
              message: res.error.message
            });
          }
        });
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        }
      } finally {
        this.signInForm.reset();
        this.loading = false;
      }
    }
  }

  async signUp(): Promise<void> {
    if (this.signInForm.valid) {
      try {
        this.loading = true;
        this.supabase.signUpNewUser(this.signInForm.value).then(res => {
          if (res.error) {
            this.dialogService.openDialog({
              title: 'Error',
              message: res.error.message
            });
          } else {
            this.dialogService.openDialog({
              title: 'Success',
              message: 'Please check your email for verification link'
            });
          }
        });
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        }
      } finally {
        this.signInForm.reset();
        this.loading = false;
      }
    }
  }
}
