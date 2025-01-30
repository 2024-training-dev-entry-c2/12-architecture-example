import { Routes } from "@angular/router";
import { SidebarContainerComponent } from "../container/sidebar-container/sidebar-container.component";

export const sharedRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('../layouts/dashboard-layout/dashboard-layout.component').then(m => m.DashboardLayoutComponent),
    children: [
      {
        path: '',
        component: SidebarContainerComponent,
        outlet: 'secondary',
      },
    ]
  }
];
