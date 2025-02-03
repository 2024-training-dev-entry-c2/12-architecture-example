import { Routes } from '@angular/router';
import { MainLayoutComponent } from 'shared';

export const routes: Routes = [
    {
        path: 'menus',
        component: MainLayoutComponent,
        loadChildren: () => import('menu').then(m => m.menuRoutes),
    },
    {
        path: 'clients',
        component: MainLayoutComponent,
        loadChildren: () => import('client').then(m => m.clientRoutes),
    },
    {
        path: 'dishes',
        component: MainLayoutComponent,
        loadChildren: () => import('dish').then(m => m.dishRoutes),
    },
    {
        path: 'orders',
        component: MainLayoutComponent,
        loadChildren: () => import('order').then(m => m.orderRoutes),
    }
];
