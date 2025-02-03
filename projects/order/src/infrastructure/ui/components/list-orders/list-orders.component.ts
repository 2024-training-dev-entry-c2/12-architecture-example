import { DatePipe, NgFor } from '@angular/common';
import { Component, input, output, viewChild } from '@angular/core';
import { ModalComponent, SelectOption } from 'shared';
import { IOrder, IOrderForm } from '../../../../domain/models/order.model';
import { OrderFormComponent } from '../../forms/order-form/order-form.component';

@Component({
  selector: 'lib-list-orders',
  standalone: true,
  imports: [ModalComponent, OrderFormComponent, NgFor, DatePipe],
  templateUrl: './list-orders.component.html',
  styleUrl: './list-orders.component.scss',
})
export class ListOrdersComponent {
  public modal = viewChild<ModalComponent>('modal');
  public orders = input.required<IOrder[]>();
  public customerOptions = input.required<SelectOption<number>[]>();
  public dishOptions = input.required<SelectOption<number>[]>();
  public onCreateOrder = output<{
    order: IOrderForm;
    modal: ModalComponent;
  }>();

  handleSubmit(orderForm: IOrderForm) {
    this.onCreateOrder.emit({ order: orderForm, modal: this.modal() });
  }
}
