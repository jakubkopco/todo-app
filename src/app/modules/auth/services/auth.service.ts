import {Injectable} from '@angular/core'
import {SupabaseService} from "../../../shared/services/supabase.service";

export interface AuthFormModel {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private readonly supabase: SupabaseService) {
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
