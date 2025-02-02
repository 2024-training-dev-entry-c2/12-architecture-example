import { Component, EventEmitter, input, Output } from '@angular/core';
import { IOrder, IOrderItem } from '../../../../domain/model/orders.model';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { CreateOrderItemUseCase } from '../../../../application/orders/create-order-item.usecase';
import { UpdateOrderItemUseCase } from '../../../../application/orders/update-order-item.usecase';
import { DeleteOrderItemUseCase } from '../../../../application/orders/delete-order-item.usecase';
import { ItemModalComponent } from '../item-modal/item-modal.component';

@Component({
  selector: 'lib-order-main',
  imports: [CurrencyPipe, TitleCasePipe, ItemModalComponent],
  templateUrl: './order-main.component.html',
  styleUrl: './order-main.component.scss'
})
export class OrderMainComponent {
  public orders = input<IOrder[]>();
  @Output() deleteOrderEvent = new EventEmitter<number>();
  @Output() editOrderEvent = new EventEmitter<IOrder>();

  isModalVisible = false;
  isEditMode = false;
  modalTitle = 'Agregar Item';
  modalButton = 'Agregar';
  currentItem: IOrderItem | null = null;

  constructor(
    private createOrderItemUseCase: CreateOrderItemUseCase,
    private updateOrderItemUseCase: UpdateOrderItemUseCase,
    private deleteOrderItemUseCase: DeleteOrderItemUseCase
  ) { }

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

  openModal(mode: 'add' | 'edit', orderItem?: IOrderItem): void {
    this.isModalVisible = true;
    this.isEditMode = mode === 'edit';
    this.modalTitle = this.isEditMode ? 'Editar Item' : 'Agregar Item';
    this.modalButton = this.isEditMode ? 'Actualizar' : 'Agregar';
    this.currentItem = orderItem ? { ...orderItem } : null;
  }

  closeModal(): void {
    this.isModalVisible = false;
    this.currentItem = null;
  }

  addOrderItem(orderId: number): void {
    this.openModal('add');
  }

  editOrderItem(orderId: number, orderItem: IOrderItem): void {
    this.openModal('edit', orderItem);
  }

  submitOrderItem(orderItem: IOrderItem): void {
    if (this.isEditMode && this.currentItem) {
      this.updateOrderItemUseCase.updateOrderItem(orderItem.idItem, this.currentItem.idItem, orderItem);
    } else {
      this.createOrderItemUseCase.addOrderItem(orderItem.idItem, orderItem);
    }
    this.closeModal();
  }

  deleteOrderItem(orderId: number, orderItemId: number): void {
    this.deleteOrderItemUseCase.deleteOrderItem(orderId, orderItemId);
  }
}
