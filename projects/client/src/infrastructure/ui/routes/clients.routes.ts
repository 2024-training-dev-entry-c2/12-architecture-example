import { Routes } from "@angular/router";
import { LayoutClientComponent } from "../layouts/layout-client/layout-client.component";
import { GetAllClientComponent } from "../containers/get-all-client/get-all-client.component";
import { FormClientConteinerComponent } from "../containers/form-client-conteiner/form-client-conteiner.component";
import { FormGetByIdClientComponent } from "../containers/form-get-by-id-client/form-get-by-id-client.component";
export const routes: Routes = [
    {
        path: '',
        component: LayoutClientComponent,
        children: [
            { path: '', component: GetAllClientComponent },
            { path: 'agregar', component: FormClientConteinerComponent },
            { path: 'actualizar/:id', component: FormClientConteinerComponent },
            // { path: 'eliminar/:id', component: DeleteComponent },
            { path: 'buscar', component: FormGetByIdClientComponent },
        ],
    },
];

// export default routes;