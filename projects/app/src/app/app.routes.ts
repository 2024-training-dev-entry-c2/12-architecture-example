import { Routes } from '@angular/router';
import { MainLayoutComponent } from 'shared';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [ 
      { 
        path: 'client', 
        loadChildren: () => import('client').then(m => m.clientRoutes)
      },
      { 
        path: 'menu',
        loadChildren: () => import('menus').then(m => m.menusRoutes)
      },{
        path: 'dish', 
        loadChildren: () => import('dishes').then(m => m.dishesRoutes)
      }
    ]
  }


];
