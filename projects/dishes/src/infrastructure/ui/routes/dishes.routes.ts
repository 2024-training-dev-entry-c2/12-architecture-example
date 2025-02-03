import { Routes } from "@angular/router";
import { DishComponent } from "../containers/dish/dish.component";

export const dishesRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: DishComponent
            }
        ]
    }
];