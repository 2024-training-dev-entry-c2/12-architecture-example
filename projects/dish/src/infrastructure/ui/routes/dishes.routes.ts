import { Routes } from "@angular/router";
import { BodyComponent } from "shared";
import { DishComponent } from "../containers/dish/dish.component";

export const dishesRoutes: Routes = [
  {
    path: '',
    component: BodyComponent,
    children: [
      {
        path: '',
        component: DishComponent
      }
    ]
  }
];