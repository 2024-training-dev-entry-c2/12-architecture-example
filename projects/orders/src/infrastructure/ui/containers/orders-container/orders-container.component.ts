import { Component, inject } from '@angular/core';
import { OrdersSectionComponent } from '../../components/orders-section/orders-section.component';
import { Observable } from 'rxjs';
import { IClient, ListClientsUsecase } from 'clients';
import { IOrder } from '../../../../domain/model/order.model';
import { IDish, ListDishesUsecase } from 'dishes';
import { ListOrdersUsecase } from '../../../../application/orders/list-orders.usecase';
import { CreateOrderUsecase } from '../../../../application/orders/create-order.usecase';
import { UpdateOrderUsecase } from '../../../../application/orders/update-order.usecase';
import { DeleteOrderUsecase } from '../../../../application/orders/delete-order.usecase';
import { ModalComponent } from 'shared';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'lib-orders-container',
  imports: [OrdersSectionComponent, AsyncPipe],
  templateUrl: './orders-container.component.html',
  styleUrl: './orders-container.component.scss'
})
export class OrdersContainerComponent {
  public orders$: Observable<IOrder[]>;
  public dishes$: Observable<IDish[]>;
  public clients$: Observable<IClient[]>;
  public currentOrder$: Observable<IOrder>;
  private _listUsecase = inject(ListOrdersUsecase);
  private _listDishesUsecase = inject(ListDishesUsecase);
  private _listClientsUsecase = inject(ListClientsUsecase);
  private _createUsecase = inject(CreateOrderUsecase);
  private _updateUsecase = inject(UpdateOrderUsecase);
  private _deleteUsecase = inject(DeleteOrderUsecase);

  ngOnInit(): void {
    this.initSubscriptions();    

    this._listUsecase.execute();
    this._listDishesUsecase.execute();
    this._listClientsUsecase.execute();

    this.dishes$ = this._listDishesUsecase.dishes$();
    this.clients$ = this._listClientsUsecase.clients$();
    this.orders$ = this._listUsecase.orders$();
    this.currentOrder$ = this._updateUsecase.currentOrder$();
  }

  ngOnDestroy(): void {
    this.destroySubscriptions();
  }

  handlePatchOrder({order, modal}:{order: IOrder; modal: ModalComponent}){
    const usecase= order.id ? this._updateUsecase : this._createUsecase;
    usecase.execute(order, modal);
  }

  handleSelectUpdateOrder(id : number){
    this._updateUsecase.selectOrder(id);
  }

  handleDeleteOrder(id: number){
    this._deleteUsecase.execute(id);
  }

  initSubscriptions(){
    this._listUsecase.initSubscriptions();
    this._listDishesUsecase.initSubscriptions();
    this._listClientsUsecase.initSubscriptions();
    this._createUsecase.initSubscriptions();    
    this._updateUsecase.initSubscriptions();    
    this._deleteUsecase.initSubscriptions();    
  }

  destroySubscriptions(){
    this._listUsecase.destroySubscriptions();
    this._listDishesUsecase.destroySubscriptions();
    this._listClientsUsecase.destroySubscriptions();
    this._createUsecase.destroySubscriptions();
    this._updateUsecase.destroySubscriptions();    
    this._deleteUsecase.destroySubscriptions(); 
  }
}
