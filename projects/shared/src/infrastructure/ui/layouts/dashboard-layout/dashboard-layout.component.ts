import { Component } from '@angular/core';
import { FooterContainerComponent } from "../../container/footer-container/footer-container.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'lib-dashboard-layout',
  imports: [FooterContainerComponent, RouterOutlet],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent {

}
