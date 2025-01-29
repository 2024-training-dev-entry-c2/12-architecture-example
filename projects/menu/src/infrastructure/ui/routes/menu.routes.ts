import { Routes } from "@angular/router";
import { MainLayoutComponent } from "../layouts/main-layout/main-layout.component";
import { MenuContainerComponent } from "../containers/menu-container/menu-container.component";

export const menuRoutes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                component: MenuContainerComponent
            }
        ]
    }
];