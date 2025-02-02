import { Component,input,output } from '@angular/core';
import { IOrder } from '../../../../domain/model/order.model';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'lib-get-all-order-comp',
  imports: [CurrencyPipe],
  templateUrl: './get-all-order-comp.component.html',
  styleUrl: './get-all-order-comp.component.scss'
})
export class GetAllOrderCompComponent {
  orders = input<IOrder[]>();

  public onDeleteOrder = output<number>();
  public onUpdateOrder = output<number>();

  // private router = inject(Router);

  deleteOrder(id: number) {
    this.onDeleteOrder.emit(id);
  }

  updateOrder(id: number) {
    this.onUpdateOrder.emit(id);
  }
}
