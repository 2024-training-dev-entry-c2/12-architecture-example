import { Routes } from "@angular/router";
import { MainLayoutComponent } from "../layouts/main-layout/main-layout.component";
import { CreateUsersComponent } from "../containers/create-users/create-users.component";
import { AuthComponent } from "../containers/auth/auth.component";
import { DashboardContainerComponent } from "../containers/dashboard/dashboard.component";
import { CustomerComponent } from "../components/application/customer/customer.component";

export const usersRoutes: Routes = [
  /* {
     path: '',
     redirectTo: 'login',
     pathMatch: 'full'
   },*/
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: 'main',
    component: DashboardContainerComponent,
    children: [
      {
        path: 'create2',
        component: CreateUsersComponent
      },
      {
        path: 'customer',
        component: CustomerComponent
      },
      {
        path: 'user',
        component: CustomerComponent
      },
    ]
  },

];