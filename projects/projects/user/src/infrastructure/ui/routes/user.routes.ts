import { Routes } from '@angular/router';
import { authGuard } from 'shared';
import { LoginComponent } from '../components/login/login.component';
import { AuthContainerComponent } from '../containers/auth-container/auth-container.component';
import { DashboardContainerComponent } from '../containers/dashboard-container/dashboard-container.component';

export const userRoutes: Routes = [
  {
    path: '',
    component: AuthContainerComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'dashboard',
    canActivate:[authGuard],
    component: DashboardContainerComponent
  },
];
