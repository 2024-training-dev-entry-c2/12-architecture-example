import { Routes } from '@angular/router';
// import { MainLayoutComponent } from '../../../shared/src/infrastructure/ui/layouts/main-layout/main-layout.component';
import { MainLayoutComponent } from '../../../shared/src/public-api'; 

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children:[
      {
        path: '', 
        redirectTo: 'menus', 
        pathMatch: 'full' 
      },
      {
        path: 'clientes',
        loadChildren: () => import('../../../client/src/infrastructure/ui/routes/clients.routes').then((ClientstRoutes)=>ClientstRoutes.routes)
      },
      {
        path: 'platos',
        loadChildren: () => import('../../../dish/src/infrastructure/ui/routes/dishes.routes').then((DishestRoutes)=>DishestRoutes.routes)
      },
      {
        path: 'menus',
        loadChildren: () => import('../../../menu/src/infrastructure/ui/routers/menu.routes').then((MenusRoutes)=>MenusRoutes.routes)
      },
      {
        path: 'pedidos',
        loadChildren: () => import('../../../order/src/infrastructure/ui/routes/order.routes').then((OrdersRoutes)=>OrdersRoutes.routes)
      }
    ]
  }
];
