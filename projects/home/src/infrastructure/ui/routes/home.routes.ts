import { Routes } from "@angular/router";
import { DashboardLayoutComponent, SidebarContainerComponent } from "shared";

export const homeRoutes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children:[
      {
        path:'',
        component: SidebarContainerComponent,
        outlet: 'secondary'
      },
      {
        path:'view',
        loadComponent: () => import('../container/home-view-container/home-view-container.component').then(module => module.HomeViewContainerComponent)
      },
      {
        path: '',
        redirectTo: 'view',
        pathMatch: 'full'
      }
    ]
  },
]
