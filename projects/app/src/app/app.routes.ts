import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: '',
        loadChildren: () => import('home').then(m => m.homeRoutes)
    },
   
    {
        path: 'clients',
        loadChildren: () => import('clients').then(m => m.clientsRoutes)
    },
   
];
 