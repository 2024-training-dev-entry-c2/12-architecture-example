import { Routes } from '@angular/router';
import { MainLayoutComponent } from 'shared';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'clients',
        loadChildren: () => import('client').then(m => m.clientsRoutes)
      },
      {
        path: 'menus',
        loadChildren: () => import('menu').then(m => m.menusRoutes)
      },
      {
        path: 'dishes',
        loadChildren: () => import('dish').then(m => m.dishesRoutes)
      }, 
      {
        path: 'orders',
        loadChildren: () => import('order').then(m => m.ordersRoutes)
      }
    ]
  }
];
