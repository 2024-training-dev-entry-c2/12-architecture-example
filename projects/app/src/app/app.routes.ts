import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('auth').then((m) => m.authRoutes),
  },
];
