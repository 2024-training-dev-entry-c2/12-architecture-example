import { Routes } from "@angular/router";
import { DashboardLayoutComponent, SidebarContainerComponent } from "shared";
import { UpdateDishesFormContainerComponent } from "../container/update-dishes-form-container/update-dishes-form-container.component";
import { CreateDishFormContainerComponent } from "../container/create-dish-form-container/create-dish-form-container.component";



export const dishesRoutes: Routes = [
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
          loadComponent: () => import('../container/view-dishes-container/view-dishes-container.component').then(m => m.ViewDishesContainerComponent)
        },
        {
          path: 'update/:id',
          component: UpdateDishesFormContainerComponent
        },
        {
          path: 'create/:id',
          component: CreateDishFormContainerComponent
        },
        {
          path: '',
          redirectTo: 'view',
          pathMatch: 'full',
        }
      ]
    },
]
