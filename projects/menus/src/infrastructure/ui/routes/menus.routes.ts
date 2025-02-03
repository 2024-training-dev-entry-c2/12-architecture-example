import { Routes } from "@angular/router";
import { MenuContainerComponent } from "../containers/menu-container/menu-container.component";
import { HomeComponent } from "../components/home/home.component";

export const menusRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'menus',
    component: MenuContainerComponent,
  }
];