import { Routes } from "@angular/router";
import { BodyComponent } from "shared";
import { OrderComponent } from "../containers/order/order.component";

export const ordersRoutes: Routes = [
  {
    path: '',
    component: BodyComponent,
    children: [
      {
        path: '',
        component: OrderComponent
      }
    ]
  }
];