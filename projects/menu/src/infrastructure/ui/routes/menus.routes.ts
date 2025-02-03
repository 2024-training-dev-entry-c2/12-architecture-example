import { Routes } from "@angular/router";
import { DashboardLayoutComponent, SidebarContainerComponent } from "shared";
import { CreateMenuFormContainerComponent } from "../container/create-menu-form-container/create-menu-form-container.component";
import { UpdateMenuFormContainerComponent } from "../container/update-menu-form-container/update-menu-form-container.component";

export const menuRoutes: Routes =[
  {
        path: '',
        component: DashboardLayoutComponent,
        children: [
          {
            path: '',
            component: SidebarContainerComponent,
            outlet: 'secondary',
          },
          {
            path: 'view',
            loadComponent: () => import('../container/view-menu-container/view-menu-container.component').then(m => m.ViewMenuContainerComponent)
          },
          {
            path: 'create',
            component: CreateMenuFormContainerComponent
          },
          {
            path: 'update/:id',
            component: UpdateMenuFormContainerComponent
          },
          {
            path: '',
            redirectTo: 'view',
            pathMatch: 'full',
          }
        ]
      },
]
