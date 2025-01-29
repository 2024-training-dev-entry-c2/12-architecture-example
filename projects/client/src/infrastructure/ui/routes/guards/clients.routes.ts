import { Routes } from "@angular/router";

import { CreateClientComponent } from "../../containers/create-client/create-client.component";
import { ListClientComponent } from "../../containers/list-client/list-client.component";
import { MainLayoutComponent } from "shared";
import { UpdateClientComponent } from "../../containers/update-client/update-client.component";


export const clientRoutes:Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: ListClientComponent
      },
      {
        path: 'add',
        component: CreateClientComponent
      },
      {
        path: ':id',
        component: UpdateClientComponent
      }

    ]
  }
];