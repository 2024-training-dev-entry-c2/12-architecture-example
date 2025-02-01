import { Routes } from '@angular/router';
import { ListCustomersContainerComponent } from '../containers/list-customers-container/list-customers-container.component';

export const customerRoutes: Routes = [
  {
    path: '',
    component: ListCustomersContainerComponent,
  },
];
