import { Routes } from '@angular/router';
import { MainLayoutComponent } from 'shared';
import { TestComponent } from './test.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                component: TestComponent,
            }
        ]
    }
];