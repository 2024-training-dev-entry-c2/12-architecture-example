import { Routes } from "@angular/router";
import { LayoutMenuComponent } from "../layouts/layout-menu/layout-menu.component";
import { GetAllMenuCointainerComponent } from "../containers/get-all-menu-cointainer/get-all-menu-cointainer.component";
import { FormMenuContainerComponent } from "../containers/form-menu-container/form-menu-container.component";
import { GetByIdMenuContainerComponent } from "../containers/get-by-id-menu-container/get-by-id-menu-container.component";


export const routes: Routes = [
    {
        path: '',
        component: LayoutMenuComponent,
        children: [
            { path: '', component: GetAllMenuCointainerComponent },
            { path: 'agregar', component: FormMenuContainerComponent },
            { path: 'actualizar/:id', component: FormMenuContainerComponent },
            { path: 'buscar', component: GetByIdMenuContainerComponent },
        ],
    },
];