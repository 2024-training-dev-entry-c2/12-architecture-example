import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'menus',
        loadChildren: () => import('menu').then(m => m.menuRoutes)
    }
    // {
    //     path: 'clients',
    //     loadChildren: () => import('client').then(m => m.clientRoutes)
    // },
    // {
    //     path: 'dishes',
    //     loadChildren: () => import('dish').then(m => m.dishRoutes)
    // },
    // {
    //     path: 'orders',
    //     loadChildren: () => import('order').then(m => m.orderRoutes)
    // }
];
