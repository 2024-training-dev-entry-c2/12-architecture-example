import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'clientes',
    loadChildren: () => import('clients').then(m => m.clientsRoutes)
  },
  // {
  //   path: '',
  //   loadChildren: () => import('home').then(m => m.homeRoutes)
  // }
];
