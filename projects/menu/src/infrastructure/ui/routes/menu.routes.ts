import { Routes } from "@angular/router";
import { MenuComponent } from "../containers/menu/menu.component";

export const menuRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: MenuComponent
            }
        ]
    }
];