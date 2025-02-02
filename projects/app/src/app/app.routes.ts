import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from '../../../shared/src/public-api';

export const routes: Routes = [
   {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path:'',
        loadChildren: () => import('restaurant').then(r => r.restaurantRoutes)
      },
      {
        path:'ordenes',
        loadChildren: ()=> import('ordenes').then(o=> o.ordenesRoutes)
      },
      {
        path: 'clientes',
        loadChildren: () => import('clients').then(m => m.clientsRoutes)
      },
      {
        path: 'menu',
        loadChildren: () => import('menu').then(m => m.menuRoutes)
      }

    ]
  }
];
