import { Routes } from '@angular/router';
import { ViewCustomerContainerComponent } from '../container/view-customer-container/view-customer-container.component';

export const customersRoutes: Routes = [
  {
    path: 'view',
    loadComponent: () => import('../components/view-customer/view-customer.component').then(module => module.ViewCustomerComponent)
    /* children:[
      {
        path: 'view',
        loadComponent: () => import('@components/customer/components/view-customer/view-customer.component').then(module => module.ViewCustomerComponent)

      },
      {
        path: 'create',
        component: CustomerFormComponent
      },
      {
        path: 'update/:id',
        component: UpdateCustomerFormComponent
      },
      ] */
    },
    {
      path: '',
      redirectTo: 'view',
      pathMatch: 'full',
    }
]
