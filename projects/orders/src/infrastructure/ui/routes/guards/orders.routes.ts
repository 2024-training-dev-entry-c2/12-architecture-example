import { Routes } from '@angular/router';
import { ListOrderComponent } from '../../containers/list-order/list-order.component';

export const OrderRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListOrderComponent,
      },
    ],
  },
];
