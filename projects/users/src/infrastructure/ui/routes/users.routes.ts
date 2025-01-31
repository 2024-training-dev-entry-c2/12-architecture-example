import { Routes } from "@angular/router";
import { MainLayoutComponent } from "../layouts/main-layout/main-layout.component";
import { CreateUsersComponent } from "../containers/create-users/create-users.component";
import { AuthComponent } from "../containers/auth/auth.component";

export const usersRoutes: Routes = [
  /*  {
     path: '',
     redirectTo: 'login',
     pathMatch: 'full'
   },
   {
     path: 'login',
     component: AuthComponent
   }, */
  {
    path: 'a',
    component: MainLayoutComponent,
    children: [
      {
        path: 'create2',
        component: CreateUsersComponent
      },
      {
        path: 'login',
        component: AuthComponent
      },
    ]
  },

];