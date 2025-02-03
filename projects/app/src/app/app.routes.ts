import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'app/login',
    pathMatch: 'full'
  },
  {
    path: 'app',
    loadChildren: () => import('users').then(m => m.usersRoutes)
  },
  {
    path: '**', 
    redirectTo: 'app/login',
  }
];



