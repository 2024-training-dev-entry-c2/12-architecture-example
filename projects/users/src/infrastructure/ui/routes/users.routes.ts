import { Routes } from "@angular/router";

import { AuthComponent } from "../containers/auth/auth.component";
import { DashboardComponent } from "../containers/dashboard/dashboard.component";
import { LayoutComponent, authGuard } from "shared";
import { UserComponent } from "../containers/user/user.component";

export const usersRoutes: Routes= [
    {
        path: 'login',
        component: AuthComponent
    },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [ authGuard ],
        children: [
            {
                path: '',
                component: DashboardComponent
            },
            {
                path: 'user',
                component: UserComponent
            }
        ]

    }
];