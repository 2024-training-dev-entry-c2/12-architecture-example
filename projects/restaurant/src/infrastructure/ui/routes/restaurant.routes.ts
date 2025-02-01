import { Routes } from '@angular/router';
import { RestaurantLayoutComponent } from '../layouts/restaurant-layout/restaurant-layout.component';
import { RestaurantContainerComponent } from '../containers/restaurant/restaurant-container.component';


export const restaurantRoutes: Routes = [
  {
    path: '',
    component: RestaurantLayoutComponent,
    children: [
      {
        path: '',
        component: RestaurantContainerComponent,
      },
    ],
  },
];
