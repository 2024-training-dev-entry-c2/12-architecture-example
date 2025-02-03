import { Routes } from "@angular/router";
import { SubLayoutComponent } from "shared";
import { DishContainer } from "../containers/dish-container/dish-container.component";

export const dishRoutes: Routes = [
    {
        path: '',
        component: SubLayoutComponent,
        children: [
          {
            path: '',
            component: DishContainer
          }
        ]
    }
];