import { Routes } from "@angular/router";
import { HomeComponent } from "../components/home/home.component";
import { SubLayoutComponent } from "../layouts/sub-layout/sub-layout.component";

export const sharedRoutes: Routes = [
    {
        path: '',
        component: SubLayoutComponent,
        children: [
            {
                path: '',
                component: HomeComponent
            },
        ]
    }
];