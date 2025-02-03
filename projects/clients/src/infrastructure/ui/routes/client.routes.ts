import { Routes } from "@angular/router";
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