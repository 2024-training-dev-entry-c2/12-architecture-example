import { Routes } from '@angular/router';
import { MainLayoutComponent } from 'shared';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: 'client',
                loadChildren: () => import('../../../clients/src/infrastructure/ui/routes/client.routes').then(m => m.clientsRoutes)
            }
        ]
    }
];