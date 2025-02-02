import { Routes } from '@angular/router';
import { FormLayoutComponent } from '../layouts/form-layout/form-layout.component';
import { LoginComponent } from '../containers/login/login.component';
import { MainLayoutComponent } from '../layouts/main-layout/main-layout.component';
import { RegisterComponent } from '../containers/register/register.component';
import { authGuard } from './guards/auth.guard';
import { tokenGuard } from './guards/token.guard';
import { UsersContainerComponent } from '../containers/users-container/users-container.component';

export const authRoutes: Routes = [
  {
    path: 'auth',
    component: FormLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [tokenGuard],
    children: [
      {
        path: '',
        redirectTo: 'register',
        pathMatch: 'full',
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'admins',
        component: UsersContainerComponent,
      },
    ],
  },
];
