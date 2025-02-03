import { Component } from '@angular/core';
import { SidebarHeaderComponent } from "../../components/sidebar-header/sidebar-header.component";
import { SidebarMainComponent } from "../../components/sidebar-main/sidebar-main.component";
import { SidebarFooterComponent } from "../../components/sidebar-footer/sidebar-footer.component";
@Component({
  selector: 'lib-sidebar',
  imports: [SidebarHeaderComponent, SidebarMainComponent, SidebarFooterComponent],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {

}
