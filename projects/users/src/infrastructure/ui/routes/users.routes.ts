import { Routes } from "@angular/router";
import { CreateUsersComponent } from "../containers/create-users/create-users.component";
import { AuthComponent } from "../containers/auth/auth.component";
import { DashboardContainerComponent } from "../containers/dashboard/dashboard.component";
import { CustomerComponent } from "../components/application/customer/customer.component";
import { UserAdminContainerComponent } from "../containers/user-admin-container/user-admin-container.component";
import { authGuard } from "shared";

export const usersRoutes: Routes = [
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: 'main',
    component: DashboardContainerComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'account',
        component: CustomerComponent
      },
      {
        path: 'user',
        component: CreateUsersComponent
      },
    ]
  },

];