import { Routes } from "@angular/router";
import { GetMenuLayoutComponent } from "../layouts/get-menu-layout/get-menu-layout.component";
import { GetMenuContainerComponent } from "../containers/get-menu-container.component";

export const menuRoutes: Routes = [
  {
    path: '',
    component: GetMenuLayoutComponent,
    children: [
      {
        path: '',
        component: GetMenuContainerComponent
      }
    ]
  }
];
