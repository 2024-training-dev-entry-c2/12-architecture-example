import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('shared').then(m => m.sharedRoutes)
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
