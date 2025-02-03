import { Component } from '@angular/core';
import { AsideComponent } from "../../components/aside/aside.component";
import { SectionComponent } from '../../components/section/section.component';

@Component({
  selector: 'lib-dashboard',
  imports: [AsideComponent, SectionComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
