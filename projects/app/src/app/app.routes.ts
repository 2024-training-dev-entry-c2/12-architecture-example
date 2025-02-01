import { Routes } from '@angular/router';
import { MainLayoutComponent } from 'shared';
  
export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [     
      {
        path: '',
        loadChildren: () => import('home').then((m) => m.homeRoutes),
      },  
      {    
        path: 'client',
        loadChildren: () => import('client').then((m) => m.clientRoutes),
      }, 
      {      
        path: 'menu',   
        loadChildren: () => import('menus').then((m) => m.menusRoutes),
      },   

      { 
        path: 'orders', 
        loadChildren: () => import('orders').then((m) => m.OrderRoutes),
      },  
      {   
        path: 'dashboard', 
        loadChildren: () => import('dashboard').then((m) => m.dashboardRoutes),
      }  
    ],  
  },    
]; 

 
    