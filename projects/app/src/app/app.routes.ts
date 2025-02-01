import { Routes } from '@angular/router';
// import { MainLayoutComponent } from '../../../shared/src/infrastructure/ui/layouts/main-layout/main-layout.component';
import { MainLayoutComponent } from '../../../shared/src/public-api'; 

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children:[
      {
        path: 'clientes',
        loadChildren: () => import('../../../client/src/infrastructure/ui/routes/clients.routes').then((ClientstRoutes)=>ClientstRoutes.routes)
      }
    ]
    // loadChildren: () => import('../../../shared/src/infrastructure/ui/routes/layout.routes').then((LayoutRoutes)=>LayoutRoutes.routes)
  }

  // {
  //   path: '',
  //   loadChildren: () => import('home').then(m => m.homeRoutes)
  // }
];
