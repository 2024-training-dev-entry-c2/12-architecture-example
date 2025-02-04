import { Routes } from "@angular/router";
import { OrderComponent } from "../containers/order/order.component";

export const ordersRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: OrderComponent
            }
        ]
    }
];