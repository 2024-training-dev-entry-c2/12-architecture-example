/*
 * Public API Surface of shared
 */

export { StateFactory } from './domain/state/state.factory';
export type { IState } from './domain/model/state.model';
export { SidebarContainerComponent } from './infrastructure/ui/container/sidebar-container/sidebar-container.component'
export { FooterContainerComponent } from './infrastructure/ui/container/footer-container/footer-container.component';
export { environment } from './infrastructure/environments/environments.development';
export { urlResources } from './infrastructure/environments/environments.development';
export { DashboardLayoutComponent} from './infrastructure/ui/layouts/dashboard-layout/dashboard-layout.component';
export { BoxComponent} from './infrastructure/ui/components/box/box.component';

