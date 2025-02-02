import { Routes } from '@angular/router';
import { LayoutComponent } from 'shared';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('home').then((m) => m.homeRoute),
      },
      {
        path: 'clientes',
        loadChildren: () => import('clients').then((m) => m.clientsRoutes),
      },
      {
        path: 'platos',
        loadChildren: () => import('dish').then((m) => m.dishRoutes),
      },
      {
        path: 'menus',
        loadChildren: () => import('menu').then((m) => m.menuRoutes),
      },
      {
        path: 'ordenes',
        loadChildren: () => import('orders').then((m) => m.orderRoutes),
      },
    ],
  },
];
