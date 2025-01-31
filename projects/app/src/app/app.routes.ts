import { Routes } from '@angular/router';
import { MainLayoutComponent } from 'shared';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'clients',
        loadChildren: ()=> import('clients').then(m => m.clientRoutes)
      },
      {
        path: 'menus',
        loadChildren: () => import('menu').then(m => m.menuRoutes)
      }
    ]
  }
];
