import { Routes } from "@angular/router";
import { ClientLayoutComponent } from "../layouts/client-layout/client-layout.component";
import { GetAllClientsContainerComponent } from "../containers/get-all-clients-container/get-all-clients-container.component";

export const clientRoutes: Routes = [
    {
        path: '',
        component: ClientLayoutComponent,
        children: [
          {
            path: '',
            component: GetAllClientsContainerComponent
          }
        ]
      }
];