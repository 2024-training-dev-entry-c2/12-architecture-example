import { Routes } from "@angular/router";

import { ListClientComponent } from "../../containers/list-client/list-client.component";


export const clientRoutes:Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListClientComponent
      },

    ]
  }
];