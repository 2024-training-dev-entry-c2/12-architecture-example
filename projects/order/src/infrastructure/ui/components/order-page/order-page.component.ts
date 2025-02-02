import { CommonModule } from '@angular/common';
import { Component, input, output, viewChild } from '@angular/core';
import { ModalComponent } from 'shared';
import { IClient, IDish, IOrder } from '../../../../domain/model/order.model';
import { OrderFormComponent } from '../../forms/order-form/order-form.component';

@Component({
  selector: 'lib-order-page',
  imports: [ModalComponent, OrderFormComponent,CommonModule],
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.scss'
})
export class OrderPageComponent {
  public modal = viewChild<ModalComponent>('modal');
  public orders = input<IOrder[]>();
  public dishes = input<IDish[]>();
  public clients = input<IClient[]>();
  public currentOrder = input<IOrder>();
  public onCreateOrder = output<{order: IOrder; modal: ModalComponent}>();
  public onSelectOrder = output<number>();
  public onDelete = output<number>();

  handleSubmit(order: IOrder) {
    this.onCreateOrder.emit({order, modal: this.modal()});
    this.modal().toggle();
  }

  selectOrder(id: number) {
    this.onSelectOrder.emit(id);
    this.modal().toggle();
  }

  deleteOrder(orderId: number): void {
    this.onDelete.emit(orderId);
  }
}