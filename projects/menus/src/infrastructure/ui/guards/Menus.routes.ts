import { Routes } from "@angular/router";

import { ListMenuComponent } from "../containers/list-menu/list-menu.component";
import { CreateMenuComponent } from "../containers/create-menu/create-menu.component";
import { UpdateMenuComponent } from "../containers/update-menu/update-menu.component";



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
      },{
        path: ':id',
        component: UpdateMenuComponent
      }
    ]
  }
];