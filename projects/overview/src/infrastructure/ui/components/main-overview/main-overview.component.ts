import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'lib-main-overview',
  imports: [CommonModule],
  templateUrl: './main-overview.component.html',
  styleUrl: './main-overview.component.scss'
})
export class MainOverviewComponent {
  bentoItems = [
    { title: 'Ordenes totales', icon: 'svg/order.svg#order', count: '27 ordenes' },
    { title: 'Menus agregados', icon: 'svg/menu.svg#menu', count: '4 Menus' },
    { title: 'Platos agregados', icon: 'svg/dish.svg#dish', count: '30 Platos' }
  ];

  trackByFn(index: number, item: any): string {
    return item.title; 
  }
}
