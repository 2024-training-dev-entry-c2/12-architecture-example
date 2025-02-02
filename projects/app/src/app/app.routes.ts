import { Routes } from '@angular/router';
import { BodyLayoutComponent } from 'shared';

export const routes: Routes = [
    { path: '', redirectTo: '/admin', pathMatch: 'full' },
    {
        path: 'admin', 
        component: BodyLayoutComponent,
        children: [
            {
                path: 'clientes',
                loadChildren: () => import('clients').then(c => c.clientsRoutes)
            },
            {
                path: 'menus',
                loadChildren: () => import('menus').then(m => m.menusRoutes)
            },
            {
                path: 'platos',
                loadChildren: () => import('dishes').then(d => d.dishesRoutes)
            },
            {
                path: 'pedidos',
                loadChildren: () => import('orders').then(o => o.ordersRoutes)
            }
        ]
    }
];
