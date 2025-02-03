import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('menu').then((m) => m.menuRoutes),
  },
  {
    path: 'client',
    loadChildren: () => import('client').then((m) => m.LibRoutes),
  },
  {
    path: 'platos',
    loadChildren: () => import('platos').then((m) => m.LibRoutes),
  },
];
