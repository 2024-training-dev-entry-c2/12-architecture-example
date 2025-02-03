import { Routes } from "@angular/router";

import { FormMenuContainerComponent } from "../containers/form-menu-container/form-menu-container.component";
import { SubLayoutComponent } from "shared";

export const menuRoutes: Routes = [
    {
        path: '',
        component: SubLayoutComponent,
        children: [
          {
            path: '',
            component: FormMenuContainerComponent
          },
          // {
          //   path: 'add-menu',
          //   component: FormMenuContainerComponent
          // },
          // {
          //   path: 'edit-menu/:id',
          //   component: FormMenuContainerComponent
          // }
        ]
      }
];