import { Routes } from '@angular/router';
import { CustomerLayoutComponent } from '../layouts/customer-layout/customer-layout.component';
import { ListCustomersComponent } from '../containers/list-customers/list-customers.component';

export const customerRoutes: Routes = [
  {
    path: '',
    component: CustomerLayoutComponent,
    children: [{ path: '', component: ListCustomersComponent }],
  },
];
