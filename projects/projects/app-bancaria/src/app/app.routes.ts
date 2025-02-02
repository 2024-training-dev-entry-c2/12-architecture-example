import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('user').then((m) => m.userRoutes),
  },
  
];
