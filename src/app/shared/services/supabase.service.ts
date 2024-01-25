import {Injectable} from '@angular/core';
import {AuthChangeEvent, AuthSession, createClient, Session, SupabaseClient} from "@supabase/supabase-js";
import {environment} from "../../../environments/environment";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private readonly supabase: SupabaseClient;
  private _session: AuthSession | null = null;
  protected userSessionSubject: Subject<{id: string, email: string} | null> = new Subject<{id: string, email: string } | null>();

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    this._session = this.session;
  }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  get session(): AuthSession | null {
    this.supabase.auth.getSession().then(({data}) => {
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

  get userSessionData(): Observable<{id: string, email: string}> {
    return this.userSessionSubject.asObservable() as Observable<{id: string, email: string}>;
  }
}
