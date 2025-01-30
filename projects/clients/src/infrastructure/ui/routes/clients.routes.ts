import { Routes } from "@angular/router";
import { GetClientsLayoutComponent } from "../layouts/get-clients-layout/get-clients-layout.component";
import { ClientContainerComponent } from "../containers/client-container/client-container.component";

export const clientsRoutes: Routes = [
  {
    path: 'get',
    component: GetClientsLayoutComponent,
    children: [
      {
        path: '',
        component: ClientContainerComponent
      }
    ]
  }
];
