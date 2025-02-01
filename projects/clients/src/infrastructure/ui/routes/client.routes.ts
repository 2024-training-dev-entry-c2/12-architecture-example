import { Routes } from "@angular/router";
import { MainLayoutComponent } from "shared";
import { ClientComponent } from "../containers/client/client.component";

export const clientsRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: ClientComponent
            }
        ]
    }
];