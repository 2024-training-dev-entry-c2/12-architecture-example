import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('users').then((m) => m.usersRoutes),
  },
  {
    path: 'customers',
    loadChildren: () => import('customer').then((m) => m.customerRoutes),
  },
  //{
  //   path: '',
  //   loadChildren: () => import('home').then(m => m.homeRoutes)
  // }
];
