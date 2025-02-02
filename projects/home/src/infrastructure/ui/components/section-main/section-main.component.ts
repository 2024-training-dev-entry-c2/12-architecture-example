import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";


interface DashboardData {
  orders: any[];
  menus: any[];
  clients: any[];
  dishes: any[];
}

@Component({
  selector: 'lib-section-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-main.component.html',
  styleUrl: './section-main.component.scss'
})
export class SectionMainComponent {
  @Input() dashboardData: DashboardData = {
    orders: [],
    menus: [],
    clients: [],
    dishes: []
  };
}