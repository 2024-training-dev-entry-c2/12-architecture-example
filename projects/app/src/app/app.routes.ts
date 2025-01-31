import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('dashboard').then(m => m.dashboardRoutes)
  },
  {
    path: 'dashboard/home',
    loadChildren: () => import('home').then(m => m.homeRoutes)
  },

  {
    path: 'dashboard/customer',
    loadChildren: () => import('customers').then(m => m.customersRoutes)
  },
  {
    path:'',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
  // {
  //   path: '',
  //   loadChildren: () => import('home').then(m => m.homeRoutes)
  // }
];
