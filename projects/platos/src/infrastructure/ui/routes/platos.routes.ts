import { Routes } from '@angular/router';
import { FooterSharedComponent, HeaderSharedComponent, MainLayoutSharedComponent } from 'shared';
import { PlatoContainerComponent } from '../containers/plato-container/plato-container.component';

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
            component: PlatoContainerComponent
        },
        {
            path:'',
            component: FooterSharedComponent,
            outlet: 'footer',
        }
    ]
}];
