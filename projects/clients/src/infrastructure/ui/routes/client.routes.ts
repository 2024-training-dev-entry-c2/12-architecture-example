import { Routes } from "@angular/router";
import { GetAllClientsContainerComponent } from "../containers/get-all-clients-container/get-all-clients-container.component";
import { SubLayoutComponent } from "shared";

export const clientRoutes: Routes = [
    {
        path: '',
        component: SubLayoutComponent,
        children: [
          {
            path: '',
            component: GetAllClientsContainerComponent
          }
        ]
    }
];