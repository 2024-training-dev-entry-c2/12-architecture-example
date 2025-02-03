import { Routes } from "@angular/router";
import { LayoutDishComponent } from "../layouts/layout-dish/layout-dish.component";
import { GetAllDishContainerComponent } from "../containers/get-all-dish-container/get-all-dish-container.component";
import { FormDishConteinerComponent } from "../containers/form-dish-conteiner/form-dish-conteiner.component";
import { FormByIdDishContainerComponent } from "../containers/form-by-id-dish-container/form-by-id-dish-container.component";
export const routes: Routes = [
    {
        path: '',
        component: LayoutDishComponent,
        children: [
            { path: '', component: GetAllDishContainerComponent },
            { path: 'agregar', component: FormDishConteinerComponent },
            { path: 'actualizar/:id', component: FormDishConteinerComponent },
            { path: 'buscar', component: FormByIdDishContainerComponent },
        ],
    },
];