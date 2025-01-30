import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('home').then((m) => m.homeRoutes),
  },
  {
    path: 'users',
    loadChildren: () => import('users').then((m) => m.usersRoutes),
  },
  {
    path: 'customers',
    loadChildren: () => import('customer').then((m) => m.customerRoutes),
  },
];
