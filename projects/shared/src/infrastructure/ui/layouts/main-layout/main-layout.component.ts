import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsideComponent } from '../aside/aside.component';
import { NavComponent } from '../nav/nav.component';
import { NavContainerComponent } from "../../containers/nav-container/nav-container.component";

@Component({
  selector: 'lib-main-layout',
  imports: [RouterOutlet, AsideComponent, NavContainerComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  isSidebarCollapsed: boolean = false;
  constructor(
  ) { }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

}
