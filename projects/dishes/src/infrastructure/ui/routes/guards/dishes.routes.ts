import { Routes } from '@angular/router';
import { CreateDishComponent } from '../../containers/create-dish/create-dish.component';
import { UpdateDishComponent } from '../../containers/update-dish/update-dish.component';
export const dishesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':menuId',
        component: CreateDishComponent,
      },

      {
        path: ':menuId/:id',
        component: UpdateDishComponent,
      },
    ],
  },
];
