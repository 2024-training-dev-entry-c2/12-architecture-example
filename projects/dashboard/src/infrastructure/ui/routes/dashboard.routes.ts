import {SidebarContainerComponent} from 'shared';
import { DashboardLayoutComponent } from '../layout/dashboard-layout/dashboard-layout.component';

export const dashboardRoutes = [
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
        path: 'home',
        loadChildren: () => import('home').then(m => m.homeRoutes)
      },

      {
        path: 'customer',
        loadChildren: () => import('customers').then(m => m.customersRoutes)
      }
    ]
  }
]
