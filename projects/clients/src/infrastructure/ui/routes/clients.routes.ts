import { Routes } from '@angular/router';

import { SectionClientsContentComponent } from '../containers/section-clients-content/section-clients-content.component';
import { NavbarContainerComponent } from 'shared';
import { MainLayoutComponent } from 'shared';
import { FooterContainerComponent } from 'shared';


export const clientsRoutes: Routes = [
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
        component: SectionClientsContentComponent,
      },
      {
        path: '', 
        component: FooterContainerComponent,
        outlet: 'footer',
      }
    ],
  },
];
