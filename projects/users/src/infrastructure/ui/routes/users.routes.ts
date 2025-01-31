import { Routes } from "@angular/router";
import { CreateUsersComponent } from "../containers/create-users/create-users.component";
import { LoginComponent } from "../containers/login/login.component";
import { authGuard } from "./guards/auth.guard";
import { MainLayoutComponent } from "shared";

export const usersRoutes: Routes = [
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'dashboard',
      component: MainLayoutComponent, canActivate: [authGuard],
      children: [
        {
          path: 'register',
          component: CreateUsersComponent
        }
      ]

    },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
  ];