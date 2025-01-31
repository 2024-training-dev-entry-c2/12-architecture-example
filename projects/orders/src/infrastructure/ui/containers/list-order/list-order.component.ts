import { Component, inject } from '@angular/core';
import { ListOrdersUseCase } from '../../../../application/list-orders.usecase';
import { RemoveOrderUsecase } from '../../../../application/remove-orders.usecase';
import { IOrder, IOrderRequest } from '../../../../domain/model/order.model';
import { TableOrdersComponent } from '../../components/table/table.component';
import { GetUsersListUsecase, IClient } from 'client';
import { GetMenusListUseCase, IMenu } from 'menus';
import { Observable } from 'rxjs';
import { UpdateOrderUsecase } from '../../../../application/update-order.usecase';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'lib-list-order',
  imports: [TableOrdersComponent, AsyncPipe],
  templateUrl: './list-order.component.html',
  styleUrl: './list-order.component.css',
})
export class ListOrderComponent {
  private readonly __useCaseList = inject(ListOrdersUseCase);
  private readonly __useCaseRemoveOrder = inject(RemoveOrderUsecase);
  private readonly _useCaseClients = inject(GetUsersListUsecase);
  private readonly _useCasemenus = inject(GetMenusListUseCase);
  private readonly __useCaseUpdate = inject(UpdateOrderUsecase);
  public orders$: Observable<IOrder[]>;
  public menu$: Observable<IMenu[]>;
  public client$: Observable<IClient[]>;    
  public currentOrder$: Observable<IOrder>;

  ngOnInit(): void {
    this.__useCaseList.initSubscriptions();
    this._useCaseClients.initSubscriptions();
    this._useCasemenus.initSubscriptions();
    this.__useCaseUpdate.initSubscriptions();
    this.__useCaseList.execute();
    this.orders$ = this.__useCaseList.orders$();
    this._useCasemenus.execute();
    this.menu$ = this._useCasemenus.menus$();
    this._useCaseClients.execute();
    this.client$ = this._useCaseClients.clients$();
    this.currentOrder$ = this.__useCaseUpdate.currentOrder$();
  }
  
  ngOnDestroy(): void {
    this.__useCaseList.destroySubscriptions();
    this._useCaseClients.destroySubscriptions();
    this._useCasemenus.destroySubscriptions();
  }
  handleUpdateOrder({ order, id }: { order: IOrderRequest; id: number }) {
    this.__useCaseUpdate.execute(order,id);
  }

  removeOrder(id: number) {
    this.__useCaseRemoveOrder.execute(id);
  }
  selectOrder(id: number) {
    this.__useCaseUpdate.selectOrder(id);
  }
}
