import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('dashboard').then(m => m.dashboardRoutes)
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
