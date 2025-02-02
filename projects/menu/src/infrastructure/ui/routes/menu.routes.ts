import { Routes } from '@angular/router';
import { MenuContainerComponent } from '../containers/menu-container/menu-container.component';
import { FooterSharedComponent, HeaderSharedComponent, MainLayoutSharedComponent } from 'shared';

export const menuRoutes: Routes = [{
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
            component: MenuContainerComponent
        },
        {
            path:'',
            component: FooterSharedComponent,
            outlet: 'footer',
        }
    ]
}];
