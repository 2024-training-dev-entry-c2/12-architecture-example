import { Routes } from '@angular/router';
import { DashboardLayoutComponent, SidebarContainerComponent } from 'shared';
import { CustomerFormContainerComponent } from '../container/customer-form-container/customer-form-container.component';
import { UpdateCustomerContainerComponent } from '../container/update-customer-container/update-customer-container.component';

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
          path: 'create',
          component: CustomerFormContainerComponent
        },
        {
          path: 'update/:id',
          component: UpdateCustomerContainerComponent
        },
        {
          path: '',
          redirectTo: 'view',
          pathMatch: 'full',
        }
      ]
    },

]
