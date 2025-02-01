import { Routes } from '@angular/router';
import { BodyLayoutComponent } from 'shared';

export const routes: Routes = [
    { path: '', redirectTo: '/admin', pathMatch: 'full' },
    {
        path: 'admin', 
        component: BodyLayoutComponent,
        loadChildren: () => import('clients').then(c => c.clientsRoutes)
    }
];
