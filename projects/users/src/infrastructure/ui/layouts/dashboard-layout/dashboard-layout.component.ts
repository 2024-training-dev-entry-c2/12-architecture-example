import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  FooterComponent,
  HeaderContainerComponent,
  LoaderContainerComponent,
  SidebarContainerComponent,
  ToastContainerComponent,
} from 'shared';

@Component({
  selector: 'lib-dashboard-layout',
  imports: [
    HeaderContainerComponent,
    FooterComponent,
    RouterOutlet,
    LoaderContainerComponent,
    ToastContainerComponent,
    SidebarContainerComponent,

  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss',
})
export class DashboardLayoutComponent {}
