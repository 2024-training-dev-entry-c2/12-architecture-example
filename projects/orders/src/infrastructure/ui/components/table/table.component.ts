import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IOrder } from '../../../../domain/model/order.model';
import { Router } from '@angular/router';
import { PaginationComponent, TableComponent } from 'shared';

@Component({
  selector: 'lib-orders-table',
  imports: [PaginationComponent, TableComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableOrdersComponent {
  @Input() dataOrders: any[] = [];
  @Output() deleteId = new EventEmitter<number>();
  tabsList = [
    {
      title: 'Add Order',
      tabContent: '"assets/icons/form-svgrepo-com.svg#icon-twitter"',
      link: '/orders/add',
    },
    {
      title: 'List',
      tabContent: '"assets/icons/form-svgrepo-com.svg#icon-list"',
      link: '/orders',
    },
  ];

  sendToDelete(id: number) {
    console.log(id);
    this.deleteId.emit(id);
  }

  constructor(private router: Router) {}
  redirectToOrder(id: number): void {
    this.router.navigate(['/orders', id]);
  }
}
