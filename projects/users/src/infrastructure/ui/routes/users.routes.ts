import { Routes } from "@angular/router";
import { CreateUserContainerComponent } from "../containers/create-user-container/create-user-container.component";
import { LoginUserContainerComponent } from "../containers/login-user-container/login-user-container.component";
import { authGuard } from "shared";
import { DashboardLayoutComponent } from "../layouts/dashboard-layout/dashboard-layout.component";
import { LoginLayoutComponent } from "../layouts/login-layout/login-layout.component";

export const usersRoutes: Routes = [
    {
        path: 'login',
        component: LoginLayoutComponent,
        children: [
            {
                path:'',
                component: LoginUserContainerComponent,

            }
        ]
    },
    {
        path: 'dashboard',
        component: DashboardLayoutComponent,
        canActivate:[authGuard],
        data: { redirectTo: '/users/login' },
        children: [
            {
                path:'create',
                component: CreateUserContainerComponent,
            }
        ]
    }
]