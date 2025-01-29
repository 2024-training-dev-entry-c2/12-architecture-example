import { Routes } from "@angular/router";
import { MainLayoutComponent } from "../../layouts/main-layout/main-layout.component";
import { CreateClientComponent } from "../../containers/create-client/create-client.component";
import { ListClientComponent } from "../../containers/list-client/list-client.component";


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
    ]
  }
];