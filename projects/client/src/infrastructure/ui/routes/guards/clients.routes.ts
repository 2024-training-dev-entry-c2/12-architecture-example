import { Routes } from "@angular/router";

import { CreateClientComponent } from "../../containers/create-client/create-client.component";
import { ListClientComponent } from "../../containers/list-client/list-client.component";
import { UpdateClientComponent } from "../../containers/update-client/update-client.component";


export const clientRoutes:Routes = [
  {
    path: '',
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