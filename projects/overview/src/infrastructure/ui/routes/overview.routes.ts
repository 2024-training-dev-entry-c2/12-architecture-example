import { OverviewContainerComponent } from "../containers/overview-container/overview-container.component";
import { OverviewMainLayoutComponent } from "../layouts/overview-main-layout/overview-main-layout.component";


export const overviewRoutes = [
    {
        path: '',
        component: OverviewMainLayoutComponent,
        children: [
            {
                path: '',
                component: OverviewContainerComponent 
            }
        ]
    }
];