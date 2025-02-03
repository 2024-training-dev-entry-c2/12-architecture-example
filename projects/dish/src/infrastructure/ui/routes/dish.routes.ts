import { Routes } from "@angular/router";
import { DishMainLayoutComponent } from "../layouts/dish-main-layout/dish-main-layout.component";
import { DishContainerComponent } from "../containers/dish-container/dish-container.component";

export const dishRoutes: Routes = [
    {
        path: '',
        component: DishMainLayoutComponent,
        children: [
            {
                path: '',
                component: DishContainerComponent
            }
        ]
    }
];