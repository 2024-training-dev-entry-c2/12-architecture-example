import { Routes } from '@angular/router';
import { MainLayoutComponent } from '../../../shared/src/infrastructure/ui/layouts/main-layout/main-layout.component';

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
    // {
    //     path: 'dishes',
    //     loadChildren: () => import('dish').then(m => m.dishRoutes)
    // },
    // {
    //     path: 'orders',
    //     loadChildren: () => import('order').then(m => m.orderRoutes)
    // }
];
