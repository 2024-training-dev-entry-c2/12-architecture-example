import { Routes } from "@angular/router";
import { OrdenesLayoutComponent } from "../layouts/ordenes-layout/ordenes-layout.component";
import { OrdenesContainerComponent } from "../containers/ordenes-container/ordenes-container.component";

export const ordenesRoutes: Routes =[
  {
  path:'',
  component: OrdenesLayoutComponent,
  children: [
        {
          path: '',
          component: OrdenesContainerComponent
        }
      ]
}]
