import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DialogContainerComponent, LoadingComponent } from 'shared';
import { HeaderContainerComponent } from '../../containers/header-container/header-container.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'lib-main-layout',
  imports: [
    DialogContainerComponent,
    HeaderContainerComponent,
    RouterOutlet,
    LoadingComponent,
    SidebarComponent,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {}
