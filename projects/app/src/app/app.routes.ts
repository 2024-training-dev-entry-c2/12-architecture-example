import { Routes } from '@angular/router';
import { MainLayoutComponent } from 'shared';

export const routes: Routes = [
  // {
  //   path: 'users',
  //   loadChildren: () => import('users').then(m => m.usersRoutes)
  // },
  {
    path: '',
    component: MainLayoutComponent,
    loadChildren: () => import('users').then(m => m.usersRoutes)
  },
  {
    path: 'clients',
    component: MainLayoutComponent,
    loadChildren: () => import('clients').then(m => m.clientRoutes)
  }
];
