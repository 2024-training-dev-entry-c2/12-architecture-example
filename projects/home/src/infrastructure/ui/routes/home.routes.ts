import { Routes } from '@angular/router';
import { HomeLayoutComponent } from '../layouts/home-layout/home-layout.component';
import { ShowHomeComponent } from '../containers/show-home/show-home.component';

export const homeRoutes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [{ path: '', component: ShowHomeComponent }],
  },
];
