import { Routes } from '@angular/router';
import { CreateDishComponent } from '../../containers/create-dish/create-dish.component';
export const dishesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':menuId',
        component: CreateDishComponent,
      },

      {
        path: 'update/:id',
        component: CreateDishComponent,
      },
    ],
  },
];
