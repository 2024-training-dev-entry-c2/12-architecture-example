import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { HeaderComponent } from "../../../../../../shared/src/infrastructure/ui/components/header/header.component";
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
  @ViewChild(OrderFormComponent) menuForm!: OrderFormComponent;

  submitOrder(): void {
    // if (this.menuForm && this.menuForm.form.valid) {
    //   const menu = this.menuForm.getFormData();
    //   if (menu) {
    //     console.log('Sending menu data:', menu);
    //     this.onSubmitMenu.emit(menu);
    //     this.menuForm.resetForm();
    //   }
    // }
  }
}
