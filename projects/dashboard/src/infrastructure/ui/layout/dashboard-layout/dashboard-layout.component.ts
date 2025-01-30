import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterContainerComponent } from 'shared';

@Component({
  selector: 'lib-dashboard-layout',
  imports: [RouterOutlet, FooterContainerComponent],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent {

}
