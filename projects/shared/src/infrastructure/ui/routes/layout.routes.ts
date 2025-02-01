import { Routes } from '@angular/router';
import { MainLayoutComponent } from '../layouts/main-layout/main-layout.component';
// import { adminGuard } from './admin.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    // children: [
    //   { 
    //     // path: 'clientes',
    //     // loadChildren: () => import('../../../../../client/src/infrastructure/ui/routes/clients.routes')
    //     //     .then((m) => m.default),
    //     // outlet: "primary"
        
    //     path: 'clientes',
    //     component: LayoutClientComponent,
    //     outlet: "primary"
    //   }
    // ]
  },
  
];