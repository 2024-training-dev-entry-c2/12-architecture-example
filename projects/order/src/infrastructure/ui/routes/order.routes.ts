import { Routes } from "@angular/router";
import { SubLayoutComponent } from "shared";
import { OrderContainerComponent } from "../containers/order-container/order-container.component";

export const orderRoutes: Routes = [
    {
        path: '',
        component: SubLayoutComponent,
        children: [
          {
            path: '',
            component: OrderContainerComponent
          },
        ]
      }
];