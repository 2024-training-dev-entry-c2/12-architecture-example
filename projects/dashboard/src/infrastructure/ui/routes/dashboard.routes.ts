import {SidebarContainerComponent} from 'shared';
import { DashboardLayoutComponent } from 'shared';

export const dashboardRoutes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        component: SidebarContainerComponent,
        outlet: 'secondary',
      }

    ]
  }
]
