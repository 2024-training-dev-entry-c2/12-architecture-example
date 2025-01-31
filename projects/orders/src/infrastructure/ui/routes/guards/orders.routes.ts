import { Routes } from "@angular/router";
import { ListOrderComponent } from "../../containers/list-order/list-order.component";
import { CreateOrderComponent } from "../../containers/create-order/create-order.component";
import { UpdateOrderComponent } from "../../containers/update-order/update-order.component";


export const OrderRoutes:Routes=[
    {
        path:'',
        children: [ 
            {
                path: '',
                component: ListOrderComponent
            },
            {
                path: 'add',
                component: CreateOrderComponent
            },
            {
                path: ':id',
                component: UpdateOrderComponent
            }
        ]


    }
]