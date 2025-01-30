import { Routes } from "@angular/router";
import { MainLayoutComponent } from "../layouts/main-layout/main-layout.component";
import { ClientContainerComponent } from "../containers/client-container/client-container.component";

export const clientRoutes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                component: ClientContainerComponent
            }
        ]
    }
];