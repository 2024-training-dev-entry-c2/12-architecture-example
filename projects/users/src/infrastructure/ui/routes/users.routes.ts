import { Routes } from '@angular/router';
import { LoginUserComponent } from '../containers/login-user/login-user.component';
import { adminGuard, MainComponent } from 'shared';
import { DashboardComponent } from '../containers/dashboard/dashboard.component';
import { CreateUserComponent } from '../containers/create-user/create-user.component';

export const usersRoutes: Routes = [
  {
    path: 'login',
    component: LoginUserComponent,
  },
  {
    path: 'app',
    component: MainComponent,
    canActivate: [adminGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'users',
        component: CreateUserComponent,
      },
    ],
  },
];
