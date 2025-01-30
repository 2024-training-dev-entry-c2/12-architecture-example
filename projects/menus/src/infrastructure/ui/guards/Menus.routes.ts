import { Routes } from "@angular/router";


import { MainLayoutComponent } from "shared";
import { ListMenuComponent } from "../containers/list-menu/list-menu.component";
import { CreateMenuComponent } from "../containers/create-menu/create-menu.component";



export const menusRoutes:Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListMenuComponent
      },
      {
        path: 'add',
        component: CreateMenuComponent
      }
    ]
  }
];