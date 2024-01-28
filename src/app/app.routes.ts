import { Routes } from '@angular/router';

import { authGuard } from './shared/guards/auth.guard';

export const AppRoutes = {
  auth: 'auth',
  todo: 'todo'
};

export const routes: Routes = [
  {
    path: '',
    redirectTo: AppRoutes.auth,
    pathMatch: 'full'
  },
  {
    path: AppRoutes.auth,
    loadComponent: () => import('./modules/auth/components/auth-login/auth-login.component').then(m => m.AuthLoginComponent)
  },
  {
    path: AppRoutes.todo,
    loadComponent: () => import('./modules/to-do/to-do.component').then(m => m.ToDoComponent),
    canActivate: [authGuard]
  }
];
