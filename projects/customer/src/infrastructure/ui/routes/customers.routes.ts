import { Routes } from '@angular/router';
import { CustomerLayoutComponent } from '../layouts/customer-layout/customer-layout.component';
import { CustomersComponent } from '../components/customers/customers.component';

export const customerRoutes: Routes = [
  {
    path: '',
    component: CustomerLayoutComponent,
    children: [{ path: '', component: CustomersComponent }],
  },
];
