import { Injectable } from '@angular/core';
import { AuthChangeEvent, AuthSession, createClient, Session, SupabaseClient } from '@supabase/supabase-js';
import { Subject } from 'rxjs';

import { environment } from '../../../environments/environment';

export interface UserModel {
  id: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private readonly supabase: SupabaseClient;
  private _session: AuthSession | null = null;
  protected userSessionSubject: Subject<UserModel | null> = new Subject<UserModel | null>();

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    this._session = this.session;
  }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  get session(): AuthSession | null {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
      this.userSessionSubject.next({
        id: data.session?.user?.id as string,
        email: data.session?.user?.email as string
      });
    });
    return this._session;
  }

  get client(): typeof this.supabase {
    return this.supabase;
  }
}
