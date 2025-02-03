import { Routes } from '@angular/router';
import { MainLayoutComponent } from 'shared';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        loadChildren: () => import('overview').then(m => m.overviewRoutes),
    },
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
        path: 'orders',
        component: MainLayoutComponent,
        loadChildren: () => import('order').then(m => m.orderRoutes),
    }
];
