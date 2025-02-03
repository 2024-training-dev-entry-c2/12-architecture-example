import { Routes } from "@angular/router";
import { MenuContainerComponent } from "../containers/menu-container/menu-container.component";
import { MenuMainLayoutComponent } from "../layouts/menu-main-layout/menu-main-layout.component";

export const menuRoutes: Routes = [
    {
        path: '',
        component: MenuMainLayoutComponent,
        children: [
            {
                path: '',
                component: MenuContainerComponent,
            }
        ]
    }
];