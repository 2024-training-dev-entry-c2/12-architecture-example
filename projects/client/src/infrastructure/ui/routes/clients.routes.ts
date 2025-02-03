import { Routes } from "@angular/router";
import { ClientComponent } from "../containers/client/client.component";
import { BodyComponent } from "shared";

export const clientsRoutes: Routes = [
  {
    path: '',
    component: BodyComponent,
    children: [
      {
        path: '',
        component: ClientComponent
      }
    ]
  }
];