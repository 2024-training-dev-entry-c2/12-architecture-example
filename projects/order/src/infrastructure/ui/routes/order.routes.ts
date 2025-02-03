import { Routes } from "@angular/router";
import { LayoutOrderComponent } from "../layouts/layout-order/layout-order.component";
import { GetAllOrderContainerComponent } from "../containers/get-all-order-container/get-all-order-container.component";
import { FormOrderContainerComponent } from "../containers/form-order-container/form-order-container.component";
import { GetByIdOrderContainerComponent } from "../containers/get-by-id-order-container/get-by-id-order-container.component";

export const routes: Routes = [
    {
        path: '',
        component: LayoutOrderComponent,
        children: [
            { path: '', component: GetAllOrderContainerComponent },
            { path: 'agregar', component: FormOrderContainerComponent },
            { path: 'actualizar/:id', component: FormOrderContainerComponent },
            { path: 'buscar', component: GetByIdOrderContainerComponent },
        ],
    },
];