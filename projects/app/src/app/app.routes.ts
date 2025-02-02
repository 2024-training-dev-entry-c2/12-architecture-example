import { Routes } from '@angular/router';
import { MainLayoutComponent } from 'shared';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: ()=> import('shared').then(m => m.sharedRoutes)
      },
      {
        path: 'clients',
        loadChildren: ()=> import('clients').then(m => m.clientRoutes)
      },
      {
        path: 'menus',
        loadChildren: () => import('menu').then(m => m.menuRoutes)
      },
      {
        path: 'dish',
        loadChildren: () => import('dish').then(m => m.dishRoutes)
      },
      {
        path: 'order',
        loadChildren: () => import('order').then(m => m.orderRoutes)
      },
    ]
  }
];
