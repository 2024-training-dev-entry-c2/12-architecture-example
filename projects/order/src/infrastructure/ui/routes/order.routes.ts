import { OrderContainerComponent } from "../containers/order-container/order-container.component";
import { OrderMainLayoutComponent } from "../layouts/order-main-layout/order-main-layout.component";

export const orderRoutes = [
    {
        path: '',
        component: OrderMainLayoutComponent,
        children: [
            {
                path: '',
                component: OrderContainerComponent 
            }
        ]
    }
];