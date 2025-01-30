import { Component, inject } from '@angular/core';
import { ListOrdersUseCase } from '../../../../application/list-orders.usecase';
import { RemoveOrderUsecase } from '../../../../application/remove-orders.usecase';
import { IOrder } from '../../../../domain/model/order.model';
import { TableOrdersComponent } from '../../components/table/table.component';

@Component({
  selector: 'lib-list-order',
  imports: [TableOrdersComponent],
  templateUrl: './list-order.component.html',
  styleUrl: './list-order.component.css',
})
export class ListOrderComponent {
  private readonly __useCaseList = inject(ListOrdersUseCase);
  private readonly __useCaseRemoveOrder = inject(RemoveOrderUsecase);
  orderList: {
    id: number;
    client: string;
    localDate: Date;
    dishfoodIds: number[];
    price: number;
  }[] = [];
  ngOnInit(): void {
    this.__useCaseList.initSubscriptions();
    this.getOrders();
  }
  getOrders() {
    this.__useCaseList.execute();
    this.__useCaseList.order$().subscribe({
      next: (orders: IOrder[]) => {
        this.orderList = orders.map((order) => ({
          id: order.id,
          client: order.client.name,
          localDate: order.localDate,
          dishfoodIds: order.dishfoodIds,
          price: order.totalPrice,
        }));
      },
      error: (err) => {
        console.error('Error al obtener orders:', err);
      },
    });
  }

  removeOrder(id: number) {
    this.__useCaseRemoveOrder.execute(id);
    this.getOrders()
  }
}
