import {Routes} from '@angular/router';
import {authGuard} from "./shared/guards/auth.guard";

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
    loadChildren: () => import('./modules/to-do/to-do.module').then(m => m.ToDoModule),
    canActivate: [authGuard]
  }];
