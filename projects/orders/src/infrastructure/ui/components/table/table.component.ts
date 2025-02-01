import {
  Component,
  EventEmitter,
  input,
  Input,
  output,
  Output,
} from '@angular/core';
import { IOrder, IOrderRequest } from '../../../../domain/model/order.model';
import { Router } from '@angular/router';
import { PaginationComponent, TableComponent } from 'shared';
import { UpdateOrderFormComponent } from '../../forms/update-order-form/update-order-form.component';
import { IMenu } from 'menus';
import { IClient } from 'client';
import { CreateOrderFormComponent } from '../../forms/create-order-form/create-order-form.component';

@Component({
  selector: 'lib-orders-table',
  imports: [PaginationComponent, TableComponent, UpdateOrderFormComponent, CreateOrderFormComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableOrdersComponent {
  public menu = input.required<IMenu[]>();
  public client = input.required<IClient[]>();
  public dataOrders = input.required<IOrder[]>();
  public currentOrder = input<IOrder>();
  public updateOrderData = output<{ order: IOrderRequest; id: number }>();
  public onSelectOrder = output<number>();
  public createOrderData = output<IOrderRequest>();
  public orderId: number = 0;
  public order: any[] = [];
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
    this.orderId = id;
    this.onSelectOrder.emit(id);
    this.showModal = true;
    console.log(this.currentOrder());
  }
  showModal = false;

  closeModal() {
    this.showModal = false;
  }
 createOrder(order: IOrderRequest){
  console.log(order);
   this.createOrderData.emit(order);
 }
  UpdateOrder(order: any) {
    console.log(order);
    this.updateOrderData.emit({ order: order, id: this.orderId });
  }
  setValue(): any {
   return this.order = this.dataOrders().map((order) => ({
      id: order.id,
      client: order.client.name,
      localDate: String(order.localDate),
      dishfoodIds: order.dishfoodIds,
      price: order.totalPrice,
    }));
  }
}
