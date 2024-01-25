import {Injectable, signal} from '@angular/core'
import {SupabaseService} from "../../../shared/services/supabase.service";

export interface AuthFormModel {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly isLogged = signal(false);

  constructor(private readonly supabase: SupabaseService) {
    this.supabase.authChanges((event) => {
      this.isLogged.set(event === 'SIGNED_IN');
    });
  }
  signIn(user: AuthFormModel) {
    return this.supabase.client.auth.signInWithPassword(user);
  }

  signUpNewUser(user: AuthFormModel) {
    return this.supabase.client.auth.signUp({
      email: user.email,
      password: user.password,
      options: {
        emailRedirectTo: 'https://localhost:4200/todo'
      }
    })
  }

  signOut() {
    return this.supabase.client.auth.signOut();
  }
}
