import { Routes } from '@angular/router';
import { MainLayoutComponent } from 'shared';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('home').then((m) => m.homeRoutes),
      },
      {
        path: 'customers',
        loadChildren: () => import('customer').then((m) => m.customerRoutes),
      },
      {
        path: 'menus',
        loadChildren: () => import('menu').then((m) => m.menuRoutes),
      },
      {
        path: 'dishes',
        loadChildren: () => import('dish').then((m) => m.dishRoutes),
      },
      {
        path: 'orders',
        loadChildren: () => import('order').then((m) => m.orderRoutes),
      },
    ],
  },
];
