import { Routes } from "@angular/router";
import { BodyComponent } from "shared";
import { MenuComponent } from "../containers/menu/menu.component";

export const menusRoutes: Routes = [
  {
    path: '',
    component: BodyComponent,
    children: [
      {
        path: '',
        component: MenuComponent
      }
    ]
  }
];