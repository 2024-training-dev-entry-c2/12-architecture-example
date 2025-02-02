import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { HeaderComponent } from "shared";
import { OrderFormComponent } from "../../forms/order-form/order-form.component";
import { IOrder } from '../../../../domain/model/orders.model';

@Component({
  selector: 'lib-order-header',
  imports: [HeaderComponent, OrderFormComponent],
  templateUrl: './order-header.component.html',
  styleUrl: './order-header.component.scss'
})
export class OrderHeaderComponent {
  @Output() onSubmitOrder = new EventEmitter<IOrder>();
  @ViewChild(OrderFormComponent) orderForm!: OrderFormComponent;

  submitOrder(): void {
    if (this.orderForm && this.orderForm.form.valid) {
      const order = this.orderForm.getFormData();
      if (order) {
        console.log('Sending order data:', order);
        this.onSubmitOrder.emit(order);
        this.orderForm.resetForm();
      }
    }
  }
}
