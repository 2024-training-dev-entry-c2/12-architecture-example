import { Routes } from "@angular/router";
import { DashboardLayoutComponent, SidebarContainerComponent } from "shared";

export const ordersRoutes: Routes = [

  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        component: SidebarContainerComponent,
        outlet: 'secondary',
      },
      {
        path: 'view',
        loadComponent: () => import('../container/view-orders-container/view-orders-container.component').then(m => m.ViewOrdersContainerComponent)
      },
      {
        path: '',
        redirectTo: 'view',
        pathMatch: 'full',
      }
    ]
  },


]
