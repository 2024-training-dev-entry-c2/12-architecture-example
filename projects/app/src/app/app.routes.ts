import { Routes } from '@angular/router';
import { LayoutComponent } from 'shared';

export const routes: Routes = [
  {
    path: 'inicio',
    component: LayoutComponent,
    children: [
      {
        path: "client",
        loadChildren: () => import('clients').then(m => m.clientsRoutes)
      },


    ],
  },

];
