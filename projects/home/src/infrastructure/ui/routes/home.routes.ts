import { Routes } from '@angular/router';

import { NavbarContainerComponent } from 'shared';
import { MainLayoutComponent } from 'shared';
import { FooterContainerComponent } from 'shared';
import { SectionMainContentComponent } from '../containers/section-main-content/section-main-content.component';


export const homeRoutes: Routes = [
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
        component: SectionMainContentComponent,
      },
      {
        path: '', 
        component: FooterContainerComponent,
        outlet: 'footer',
      }
    ],
  },
];
