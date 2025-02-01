import { AsyncPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ModalComponent, TableComponent } from 'shared';
import { ModalUsecase } from '../../../../application/modal.usecase';
import { CreateOrderUsecase } from '../../../../application/order/create-order.usecase';
import { DeleteOrderUsecase } from '../../../../application/order/delete-order.usecase';
import { GetOrdersUsecase } from '../../../../application/order/get-orders.usecase';
import { UpdateOrderUsecase } from '../../../../application/order/update-order.usecase';
import { IOrder } from '../../../../domain/model/order.model';
import { OrderFormComponent } from '../../forms/order-form/order-form.component';
import { ViewDetailsComponent } from "../../components/view-details/view-details.component";

@Component({
  selector: 'lib-order',
  imports: [TableComponent, ModalComponent, OrderFormComponent, AsyncPipe, ViewDetailsComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit, OnDestroy {
  private readonly _useCaseCreate = inject(CreateOrderUsecase);
  private readonly _useCaseGet = inject(GetOrdersUsecase);
  private readonly _useCaseDelete = inject(DeleteOrderUsecase);
  private readonly _useCaseUpdate = inject(UpdateOrderUsecase);
  public readonly _useCaseModal = inject(ModalUsecase);

  public orders$: Observable<IOrder[]>;
  public order$: Observable<IOrder>;
  public message$: Observable<string>;
  public isOpen$: Observable<boolean>;
  public isOpenDetails$: Observable<boolean>;

  public currentOrder$: Observable<IOrder>;

  public columns = [
    { field: 'date', header: 'Fecha' },
    { field: 'totalPrice', header: 'Precio Total' },
    { field: 'dishesQuantity', header: 'Cantidad de Platos' },
    { field: 'clientName', header: 'Cliente' }
  ];

  ngOnInit(): void {
    this._useCaseCreate.initSubscriptions();
    this._useCaseGet.initSubscriptions();
    this._useCaseUpdate.initSubscriptions();
    this._useCaseDelete.initSubscriptions();
    this._useCaseModal.initSubscriptions();

    this._useCaseGet.execute();
    this.orders$ = this._useCaseGet.orders$();

    this.currentOrder$ = this._useCaseUpdate.currentOrder$();
    this.message$ = this._useCaseCreate.message$();
    this.isOpen$ = this._useCaseModal.open$();
    this.isOpenDetails$ = this._useCaseModal.openDetails$();
  }

  ngOnDestroy(): void {
    this._useCaseCreate.destroySubscriptions();
    this._useCaseGet.destroySubscriptions();
    this._useCaseDelete.destroySubscriptions();
    this._useCaseUpdate.destroySubscriptions();
    this._useCaseModal.destroySubscriptions();
  }

  openModal(event: boolean) {
    this._useCaseModal.execute(event);
  }

  public closeDetailsModal(event: boolean) {
    this._useCaseModal.executeDetails(event);
  }

  public openDetailsModal(id: number) {
    this._useCaseModal.executeDetails(true);
    this.order$ = this.getDetails(id) as Observable<IOrder>;
    console.log(this.order$);
  }

  public getDetails(orderId: number): Observable<IOrder> | undefined {
    return this.orders$.pipe(map(orders => orders.find((_, i) => i === orderId)));
  }

  public deleteOrder(orderId: number): void {
    this._useCaseDelete.execute(orderId);
  }

  public updateById(orderId: number): void {
    this._useCaseUpdate.selectOrder(orderId);
  }

  public submit(dish: IOrder) {
    const usecase = dish.id ? this._useCaseUpdate : this._useCaseCreate;
    usecase.execute(dish);
  }
}