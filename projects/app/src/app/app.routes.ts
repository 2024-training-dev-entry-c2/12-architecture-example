import { Routes } from '@angular/router';
import { MainLayoutComponent } from 'shared';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: 'client',
                loadChildren: () => import('clients').then(m => m.clientsRoutes)
            },
            {
                path: 'menu',
                loadChildren: () => import('menu').then(m => m.menuRoutes)
            }
        ]
    }
];