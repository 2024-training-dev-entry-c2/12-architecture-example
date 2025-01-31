import { Routes } from '@angular/router';
import { DashboardLayoutComponent, SidebarContainerComponent } from 'shared';

export const customersRoutes: Routes = [
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
          loadComponent: () => import('../container/view-customer-container/view-customer-container.component').then(m => m.ViewCustomerContainerComponent)
        },
        {
          path: '',
          redirectTo: 'view',
          pathMatch: 'full',
        }
      ]
    },

]
