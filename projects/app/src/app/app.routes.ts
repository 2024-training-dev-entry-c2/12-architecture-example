import { Routes } from '@angular/router';
import { MainLayoutComponent } from 'shared';
import { TestComponent } from './test.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: TestComponent,
      },
      {
        path: 'customers',
        loadChildren: () => import('customer').then((m) => m.customerRoutes),
      },
      {
        path: 'dishes',
        loadChildren: () => import('dish').then((m) => m.dishRoutes),
      },
      {
        path: 'menus',
        loadChildren: () => import('menu').then((m) => m.menuRoutes),
      },
    ],
  },
];
