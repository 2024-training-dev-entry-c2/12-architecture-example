import { Routes } from "@angular/router";

export const homeRoutes: Routes = [
  {
    path:'',
    loadComponent: () => import('../container/home-view-container/home-view-container.component').then(module => module.HomeViewContainerComponent)
  }
]
