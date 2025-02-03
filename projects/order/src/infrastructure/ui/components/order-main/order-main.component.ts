import { Component, EventEmitter, inject, input, Output, signal } from '@angular/core';
import { IOrder, IOrderItem } from '../../../../domain/model/orders.model';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { CreateOrderItemUseCase } from '../../../../application/orders/create-order-item.usecase';
import { UpdateOrderItemUseCase } from '../../../../application/orders/update-order-item.usecase';
import { DeleteOrderItemUseCase } from '../../../../application/orders/delete-order-item.usecase';
import { ItemModalComponent } from '../item-modal/item-modal.component';
import { Observable } from 'rxjs';
import { ListOrdersUseCase } from '../../../../application/orders/list-orders.usecase';

@Component({
  selector: 'lib-order-main',
  imports: [CurrencyPipe, TitleCasePipe, ItemModalComponent],
  templateUrl: './order-main.component.html',
  styleUrl: './order-main.component.scss'
})
export class OrderMainComponent {
  private readonly createOrderItemUseCase = inject(CreateOrderItemUseCase);
  private readonly updateOrderItemUseCase = inject(UpdateOrderItemUseCase);
  private readonly deleteOrderItemUseCase = inject(DeleteOrderItemUseCase);
  private readonly listOrdersUsecase = inject(ListOrdersUseCase);

  public orders = input<IOrder[]>();
  @Output() deleteOrderEvent = new EventEmitter<number>();
  @Output() editOrderEvent = new EventEmitter<IOrder>();
  public selectedOrderId = signal<number | null>(null);

  isModalVisible = false;
  isEditMode = false;
  modalTitle = 'Agregar Item';
  modalButton = 'Agregar';
  currentItem: IOrderItem | null = null;

  onInit(): void {
    this.createOrderItemUseCase.initSubscriptions();
    this.updateOrderItemUseCase.initSubscriptions();
    this.deleteOrderItemUseCase.initSubscriptions();
    this.listOrdersUsecase.initSubscriptions();
  }
  onDestroy(): void {
    this.createOrderItemUseCase.destroySubscriptions();
    this.updateOrderItemUseCase.destroySubscriptions();
    this.deleteOrderItemUseCase.destroySubscriptions();
    this.listOrdersUsecase.destroySubscriptions();
  }

  actions = [
    { label: 'Editar', type: 'edit', icon: 'svg/edit.svg#edit' },
    { label: 'Eliminar', type: 'delete', icon: 'svg/delete.svg#delete' }
  ];

  getHeaders() {
    return [
      { label: 'Order ID' },
      { label: 'Customer Name' },
      { label: 'Precio total' },
      { label: 'Detalles' },
      { label: 'Acciones' }
    ];
  }

  getActions() {
    return this.actions;
  }

  loadOrders(): void {
    this.listOrdersUsecase.loadOrders();
  }

  toggleAccordion(event: Event): void {
    const button = event.target as HTMLElement;
    button.classList.toggle('active');
    const panel = button.nextElementSibling as HTMLElement;

    if (panel.style.maxHeight) {
      panel.style.maxHeight = '';
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  }

  openDeleteModal(idOrder: number): void {
    this.deleteOrderEvent.emit(idOrder);
  }

  openEditModal(order: IOrder): void {
    this.editOrderEvent.emit(order);
  }

  openModal(mode: 'add' | 'edit',idOrder: number, orderItem?: IOrderItem): void {
    this.isModalVisible = true;
    this.isEditMode = mode === 'edit';
    this.modalTitle = this.isEditMode ? 'Editar Item' : 'Agregar Item';
    this.modalButton = this.isEditMode ? 'Actualizar' : 'Agregar';
    this.currentItem = orderItem ? { ...orderItem } : null;
    this.selectedOrderId.set(idOrder);
  }

  closeModal(): void {
    this.isModalVisible = false;
    this.currentItem = null;
  }

  addOrderItem(orderId: number): void {
    this.openModal('add', orderId);

  }

  editOrderItem(orderId: number, orderItem: IOrderItem): void {
    this.openModal('edit', orderId, orderItem);
    // this.updateOrderItemUseCase.updateOrderItem(orderId, orderItem.idOrderItem, orderItem);

  }

  submitOrderItem(orderItem: IOrderItem): void {
    if (this.isEditMode && this.currentItem) {
      this.updateOrderItemUseCase.updateOrderItem(this.selectedOrderId(), this.currentItem.idOrderItem, orderItem);
      this.loadOrders();
    } else {
      this.createOrderItemUseCase.addOrderItem(this.selectedOrderId(), orderItem);
      this.loadOrders();
    }
    
    this.closeModal();
  }

  deleteOrderItem(orderId: number, orderItemId: number): void {
    this.deleteOrderItemUseCase.deleteOrderItem(orderId, orderItemId);
    console.log('Order item deleted' + orderItemId);
  }
}
