import { Injectable, signal } from '@angular/core';

import { SupabaseService, UserModel } from '../../../shared/services/supabase.service';

export interface AuthFormModel {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly isLogged = signal(false);
  readonly user = signal<UserModel | null>(null);

  constructor(private readonly supabase: SupabaseService) {}

  fetchUserFromSession(): void {
    this.supabase.authChanges((event, session) => {
      this.user.set({
        id: session?.user?.id as string,
        email: session?.user?.email as string
      });
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
    });
  }

  signOut() {
    return this.supabase.client.auth.signOut();
  }
}
