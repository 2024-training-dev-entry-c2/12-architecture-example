import { Routes } from "@angular/router";
import { MainLayoutComponent } from "../layouts/main-layout/main-layout.component";
import { CreateUsersComponent } from "../containers/create-users/create-users.component";

export const usersRoutes: Routes = [
  {
    path: 'create',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: CreateUsersComponent
      }
    ]
  }
];