import {Routes} from '@angular/router';
import {redirectUnauthorizedTo} from "@angular/fire/auth-guard";

export const AppRoutes = {
  Auth: 'auth',
  ToDo: 'todo'
}

export const routes: Routes = [
  {
    path: '',
    redirectTo: AppRoutes.Auth,
    pathMatch: 'full',
  },
  {
    path: AppRoutes.Auth,
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: AppRoutes.ToDo,
    canActivate: [redirectUnauthorizedTo],
    loadChildren: () => import('./modules/to-do/to-do.module').then(m => m.ToDoModule),
  }];
