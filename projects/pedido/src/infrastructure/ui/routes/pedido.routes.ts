import { Routes } from '@angular/router';
import { FooterSharedComponent, HeaderSharedComponent, MainLayoutSharedComponent } from 'shared';
import { PedidoContainerComponent } from '../containers/pedido-container/pedido-container.component';

export const LibRoutes: Routes = [{
    path:'',
    component:MainLayoutSharedComponent,
    children:[
        {
            path:'',
            component: HeaderSharedComponent,
            outlet: 'header',
        },
        {
            path:'',
            component: PedidoContainerComponent
        },
        {
            path:'',
            component: FooterSharedComponent,
            outlet: 'footer',
        }
    ]
}];
