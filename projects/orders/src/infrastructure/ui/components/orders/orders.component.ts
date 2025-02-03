import { ChangeDetectionStrategy, Component, input, output, viewChild } from '@angular/core';
import { ModalComponent } from 'shared';
import { IOrder } from '../../../../domain/models/orders.model';
import { OrdersFormComponent } from "../../forms/orders-form/orders-form.component";
import { CurrencyPipe, DatePipe, NgFor } from '@angular/common';

@Component({
  selector: 'lib-orders',
  imports: [ModalComponent, OrdersFormComponent, CurrencyPipe, DatePipe, NgFor ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent {
  public modal = viewChild<ModalComponent>('modal');
  
    public orders = input.required<IOrder[]>();
    public onCreateOrder = output<{order: IOrder; modal: ModalComponent}>(); 
    public onSelectOrder = output<string>();
    public currentOrder = input<IOrder>();
    public onDeleteOrder = output<string>();
  
    handleSubmit(order: IOrder) {
      this.onCreateOrder.emit({order, modal: this.modal()});
    }
  
    selectOrder(id: string){
      this.onSelectOrder.emit(id);
      this.modal().toggle();
    }
  
    deleteOrder(id: string){
        this.onDeleteOrder.emit(id);
    }
}
