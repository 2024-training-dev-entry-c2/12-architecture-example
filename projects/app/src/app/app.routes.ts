import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('users').then((m) => m.usersRoutes),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
