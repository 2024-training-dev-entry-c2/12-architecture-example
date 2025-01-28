import { Routes } from '@angular/router';

import { NavbarContainerComponent } from 'shared';
import { MainLayoutComponent } from 'shared';
import { FooterContainerComponent } from 'shared';


export const ordersRoutes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: NavbarContainerComponent,
        outlet: 'header',
      },
      {
        path: '', 
        component: FooterContainerComponent,
        outlet: 'footer',
      }
    ],
  },
];
