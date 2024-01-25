import {CanActivateFn, Router} from '@angular/router';
import {SupabaseService} from "../services/supabase.service";
import {inject} from "@angular/core";
import {from, map, tap} from "rxjs";
import {AppRoutes} from "../../app.routes";


export const authGuard: CanActivateFn = () => {
  const authChanges = inject(SupabaseService).client.auth;
  const router = inject(Router);

  return from(authChanges.getSession()).pipe(
    map(({data}) => data.session),
    map(session => !!session),
    tap(isAuthenticated => {
      if (!isAuthenticated) {
        router.navigate(['/', AppRoutes.Auth]);
      }
    })
  )
};
