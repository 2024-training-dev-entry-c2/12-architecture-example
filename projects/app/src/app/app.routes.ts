import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'client',
    loadChildren: () => import('client').then(m => m.clientRoutes)
    
  },  

  // {  
  //   path: '',
  //   loadChildren: () => import('home').then(m => m.homeRoutes)
  // }
];
