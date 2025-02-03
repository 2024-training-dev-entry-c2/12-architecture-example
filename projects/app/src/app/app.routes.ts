import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'dashboard/home',
    loadChildren: () => import('home').then(m => m.homeRoutes)
  },

  {
    path: 'dashboard/customer',
    loadChildren: () => import('customers').then(m => m.customersRoutes)
  },
  {
    path: 'dashboard/dishes',
    loadChildren: () => import('dishes').then(m => m.dishesRoutes)
  },
  {
    path: 'dashboard/menu',
    loadChildren: () => import('menu').then(m => m.menuRoutes)
  },
  {
    path: 'dashboard/orders',
    loadChildren: () => import('orders').then(m => m.ordersRoutes)
  },
  {
    path:'',
    redirectTo: 'dashboard/home',
    pathMatch: 'full'
  }

];
