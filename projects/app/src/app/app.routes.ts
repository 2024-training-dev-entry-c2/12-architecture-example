import { Routes } from '@angular/router';
import { LayoutComponent } from 'shared';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'client',
        loadChildren: () => import('clients').then((m) => m.clientsRoutes),
      },
      {
        path: 'dish',
        loadChildren: () => import('dish').then((m) => m.dishRoutes),
      },
      {
        path: 'menu',
        loadChildren: () => import('menu').then((m) => m.menuRoutes),
      },
    ],
  },
];
