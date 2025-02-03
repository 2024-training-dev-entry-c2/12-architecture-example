import { Routes } from '@angular/router';
import { FooterSharedComponent, HeaderSharedComponent, MainLayoutSharedComponent } from 'shared';
import { ClientContainerComponent } from '../containers/client-container/client-container.component';

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
            component: ClientContainerComponent
        },
        {
            path:'',
            component: FooterSharedComponent,
            outlet: 'footer',
        }
    ]
}];
