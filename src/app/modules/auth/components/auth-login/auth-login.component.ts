import {Component, effect} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {AuthService} from "../../services/auth.service";
import {MatInput} from "@angular/material/input";
import {Router} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {AppRoutes} from "../../../../app.routes";
import {CustomDialogService} from "../../../../shared/services/custom-dialog.service";

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
    ReactiveFormsModule,
    MatInput,
    MatButton
  ],
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent {
  loading = false;
  signInForm: FormGroup;

  constructor(
    private readonly supabase: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly dialogService: CustomDialogService,
    private readonly authService: AuthService
  ) {
    effect(() => {
      if (this.authService.isLogged()) {
        this.router.navigate(['/', AppRoutes.ToDo]);
      }
    });
    this.signInForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    })
  }

  async signIn(): Promise<void> {
    try {
      this.loading = true
      this.supabase.signIn(this.signInForm.value).then((res) => {
        if (res.data?.user?.role === 'authenticated') {
          this.router.navigate(['/', AppRoutes.ToDo]);
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

  async signUp(): Promise<void> {
    try {
      this.loading = true;
      this.supabase.signUpNewUser(this.signInForm.value).then((res) => {
         if (res.error) {
           console.error(res.error);
         } else {
           this.dialogService.openDialog({
              title: 'Success',
              message: 'Please check your email for verification link',
           })
         }
      });
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      this.signInForm.reset()
      this.loading = false
    }
  }
}
