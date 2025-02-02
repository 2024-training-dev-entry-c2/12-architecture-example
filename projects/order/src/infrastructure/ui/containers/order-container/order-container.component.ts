import { Component, inject, signal, ViewChild } from '@angular/core';
import { IOrder } from '../../../../domain/model/orders.model';
import { OrderFormComponent } from '../../forms/order-form/order-form.component';
import { Observable } from 'rxjs';
import { ListOrdersUseCase } from '../../../../application/orders/list-orders.usecase';
import { CreateOrderUseCase } from '../../../../application/orders/create-order.usecase';
import { UpdateOrderUseCase } from '../../../../application/orders/update-order.usecase';
import { DeleteOrderUseCase } from '../../../../application/orders/delete-order.usecase';
import { SearchOrdersUseCase } from '../../../../application/orders/search-order.usecase';
import { OrderHeaderComponent } from "../../components/order-header/order-header.component";
import { ShareComponent } from "shared";
import { OrderMainComponent } from "../../components/order-main/order-main.component";
import { ModalComponent } from "shared";
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'lib-order-container',
  imports: [OrderHeaderComponent, ShareComponent, OrderMainComponent, ModalComponent, OrderFormComponent, AsyncPipe, CommonModule],
  templateUrl: './order-container.component.html',
  styleUrl: './order-container.component.scss'
})
export class OrderContainerComponent {
  private readonly _listUsecase = inject(ListOrdersUseCase);
  private readonly _createUsecase = inject(CreateOrderUseCase);
  private readonly _searchUsecase = inject(SearchOrdersUseCase);
  private readonly _deleteUsecase = inject(DeleteOrderUseCase);
  private readonly _updateUsecase = inject(UpdateOrderUseCase);

  public order$: Observable<IOrder[]>;

  public isModalOpen = signal<boolean>(false);
  public selectedOrderId = signal<number | null>(null);

  public modalTitle: string = '';
  public modalContent: string = '';
  public modalButton: string = '';

  public currentClientName = '';
  public currentOrderItems = [];
  public modalType: string = '';

  @ViewChild(OrderFormComponent) orderEditForm!: OrderFormComponent;

  ngOnInit(): void {
    this._listUsecase.initSubscriptions();
    this._createUsecase.initSubscriptions();
    this.loadOrders();
    this.order$ = this._searchUsecase.filteredOrders$();
  }

  ngOnDestroy(): void {
    this._listUsecase.destroySubscriptions();
    this._createUsecase.destroySubscriptions();
  }

  loadOrders(): void {
    this._listUsecase.loadOrders();
  }

  addOrder(order: IOrder): void {
    this._createUsecase.addOrder(order, order.clientName);
  }

  updateSearchQuery(query: string): void {
    this._searchUsecase.setSearchQuery(query);
  }

  openDeleteModal(idOrder: number): void {
    this.selectedOrderId.set(idOrder);
    this.modalTitle = 'Confirmar Eliminacion';
    this.modalButton = 'Confirmar';
    this.modalType = 'delete';
    this.isModalOpen.set(true);
  }

  openEditModal(order: IOrder): void {
    this.selectedOrderId.set(order.idOrder);
    this.modalTitle = 'Editar Orden';
    this.modalButton = 'Actualizar';
    this.currentClientName = order.clientName;
    this.currentOrderItems = order.orderItems;
    this.modalType = 'edit';
    this.isModalOpen.set(true);
  }

  confirmModal(): void {
    if (this.modalType === 'delete') {
      this.deleteOrder();
    } else if (this.modalType === 'edit' && this.orderEditForm) {
      const updatedOrder = this.orderEditForm.getFormData();
      if (updatedOrder) {
        this.updateOrder(updatedOrder);
      }
    }
    this.isModalOpen.set(false);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }

  private deleteOrder(): void {
    const orderId = this.selectedOrderId();
    if (orderId) {
      this._deleteUsecase.deleteOrder(orderId).subscribe(() => {
        this.loadOrders();
      });
    }
  }

  private updateOrder(updatedOrder: IOrder): void {
    const orderId = this.selectedOrderId();
    if (orderId) {
      this._updateUsecase.updateOrder(orderId, updatedOrder, this.order$).subscribe(() => {
        this.loadOrders();
      });
    }
  }
}
