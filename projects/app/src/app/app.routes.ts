import { Routes } from '@angular/router';
import { DashboardComponent } from '../../../shared/src/infrastructure/ui/layouts/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {
                path: 'clients',
                loadChildren: () => import('clients').then(m => m.clientsRoutes)
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
                path: '',
                redirectTo: 'clients',
                pathMatch: 'full'
            }
        ]
    }
];