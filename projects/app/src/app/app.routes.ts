import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: '',
        loadChildren: () => import('home').then(m => m.homeRoutes)
    },
   

    {
        path: 'dishes',
        loadChildren: () => import('dishes').then(m => m.dishesRoutes)
    },


    {
        path: 'menus',
        loadChildren: () => import('menus').then(m => m.menusRoutes)
    },

    {
        path: 'orders',
        loadChildren: () => import('orders').then(m => m.ordersRoutes)
    },



    {
        path: 'clients',
        loadChildren: () => import('clients').then(m => m.clientsRoutes)
    },

    
    
];
 