import { Routes } from "@angular/router";
import { ClientMainLayoutComponent } from "../layouts/client-main-layout/client-main-layout.component";
import { ClientContainerComponent } from "../containers/client-container/client-container.component";

export const clientRoutes: Routes = [
    {
        path: '',
        component: ClientMainLayoutComponent,
        children: [
            {
                path: '',
                component: ClientContainerComponent
            }
        ]
    }
];