import { Routes } from '@angular/router';
import { DashboardComponent } from '../../containers/dashboard/dashboard.component';

export const dashboardRoutes: Routes = [
  {
    path: '',

    children: [
      {
        path: '',
        component: DashboardComponent,
      },
    ],
  },
];
